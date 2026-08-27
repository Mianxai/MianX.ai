import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyPassword, hashPassword, createSession, destroySession } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';
import { z } from 'zod/v4';

const loginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

// POST /api/auth (login)
export async function POST(request: NextRequest) {
  // Rate limit: 20 attempts per 15 minutes per IP
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const rateCheck = rateLimit(ip, 15 * 60 * 1000, 20);
  if (!rateCheck.success) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rateCheck.resetAt - Date.now()) / 1000)),
          'X-RateLimit-Remaining': '0',
        },
      },
    );
  }

  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { email, password } = parsed.data;

    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { credential: true },
    });

    if (!user || !user.credential) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (user.status === 'suspended') {
      return NextResponse.json({ error: 'Account suspended' }, { status: 403 });
    }

    if (user.credential.lockedUntil && user.credential.lockedUntil > new Date()) {
      return NextResponse.json({ error: 'Account locked. Try again later.' }, { status: 423 });
    }

    const { valid, needsUpgrade } = await verifyPassword(password, user.credential.passwordHash);

    if (!valid) {
      const newFailedAttempts = user.credential.failedAttempts + 1;
      const lockedUntil = newFailedAttempts >= 5
        ? new Date(Date.now() + 15 * 60 * 1000)
        : null;

      await db.credential.update({
        where: { userId: user.id },
        data: { failedAttempts: newFailedAttempts, lockedUntil },
      });

      await db.userAudit.create({
        data: {
          userId: user.id,
          eventType: 'login_failure',
          ipAddress: ip,
        },
      });

      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Transparent hash upgrade: if legacy SHA-256, re-hash with bcrypt
    if (needsUpgrade) {
      const newHash = await hashPassword(password);
      await db.credential.update({
        where: { userId: user.id },
        data: { passwordHash: newHash },
      });
      // Also update User.passwordHash to keep in sync
      await db.user.update({
        where: { id: user.id },
        data: { passwordHash: newHash },
      });
    }

    // Reset failed attempts on success
    await db.credential.update({
      where: { userId: user.id },
      data: { failedAttempts: 0, lockedUntil: null },
    });

    await db.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const session = await createSession(
      user.id,
      ip,
      request.headers.get('user-agent') || undefined,
    );

    await db.userAudit.create({
      data: {
        userId: user.id,
        eventType: 'login_success',
        ipAddress: ip,
      },
    });

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
      },
      session: { expiresAt: session.expiresAt },
    });

    response.cookies.set('mianx_session', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/auth (logout)
export async function DELETE(request: NextRequest) {
  const token = request.cookies.get('mianx_session')?.value;
  if (token) await destroySession(token);

  const response = NextResponse.json({ success: true });
  response.cookies.delete('mianx_session');
  return response;
}
