import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, createSession } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';
import { z } from 'zod/v4';

// ─── Validation schema ────────────────────────────────────────

const registerSchema = z.object({
  email: z.email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

// ─── Helper: resolve the owner role ───────────────────────────

async function getOrCreateOwnerRole() {
  let role = await db.role.findUnique({ where: { name: 'owner' } });
  if (!role) {
    role = await db.role.create({
      data: {
        name: 'owner',
        description: 'Organization owner with full access',
        permissions: JSON.stringify(['*']),
        isSystem: true,
      },
    });
  }
  return role;
}

// ─── POST /api/auth/register ──────────────────────────────────

export async function POST(request: NextRequest) {
  // Rate limit: 5 registrations per hour per IP
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const rateCheck = rateLimit(ip, 60 * 60 * 1000, 5);
  if (!rateCheck.success) {
    return NextResponse.json(
      { error: 'Too many registration attempts. Please try again later.' },
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
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 },
      );
    }

    const { email, password, firstName, lastName } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 },
      );
    }

    const passwordHash = await hashPassword(password);
    const displayName = `${firstName} ${lastName}`.trim();

    // Create User + Credential
    const user = await db.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        firstName,
        lastName,
        displayName,
        credential: {
          create: {
            passwordHash,
            failedAttempts: 0,
          },
        },
      },
    });

    // Create a default organization for the new user
    const orgCode = normalizedEmail.split('@')[0] + '-' + Date.now().toString(36);
    const organization = await db.organization.create({
      data: {
        code: orgCode,
        legalName: `${displayName}'s Organization`,
        displayName: `${displayName}'s Organization`,
        status: 'active',
        settings: {
          create: {},
        },
      },
    });

    // Create default workspace
    await db.workspace.create({
      data: {
        organizationId: organization.id,
        name: 'Main Workspace',
        status: 'active',
        isDefault: true,
      },
    });

    // Assign owner role
    const ownerRole = await getOrCreateOwnerRole();
    await db.member.create({
      data: {
        organizationId: organization.id,
        userId: user.id,
        roleId: ownerRole.id,
        status: 'active',
        lastActiveAt: new Date(),
      },
    });

    // Audit event
    await db.userAudit.create({
      data: {
        userId: user.id,
        eventType: 'registration_success',
        ipAddress: request.headers.get('x-forwarded-for') || undefined,
      },
    });

    // Create session (auto-login after registration)
    const session = await createSession(
      user.id,
      request.headers.get('x-forwarded-for') || undefined,
      request.headers.get('user-agent') || undefined,
    );

    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          displayName: user.displayName,
          avatarUrl: user.avatarUrl,
        },
        organization: {
          id: organization.id,
          code: organization.code,
          displayName: organization.displayName,
        },
        session: { expiresAt: session.expiresAt },
      },
      { status: 201 },
    );

    response.cookies.set('mianx_session', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
