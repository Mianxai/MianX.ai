import { cookies } from 'next/headers';
import { db } from './db';
import { createHash, randomBytes, timingSafeEqual } from 'crypto';
import bcrypt from 'bcryptjs';

// Hash versioning: $v1$ = legacy SHA-256, $v2$ = bcrypt
const HASH_V1_PREFIX = '$v1$';
const HASH_V2_PREFIX = '$v2$';
const BCRYPT_ROUNDS = 12;
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// ─── Password hashing ───

/** Hash a password with bcrypt (v2). */
export async function hashPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  return `${HASH_V2_PREFIX}${hash}`;
}

/**
 * Verify a password against a stored hash.
 * Supports v1 (SHA-256 legacy) with transparent upgrade.
 * Returns { valid, needsUpgrade } so the caller can re-hash if needed.
 */
export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<{ valid: boolean; needsUpgrade: boolean }> {
  // v2 — bcrypt
  if (storedHash.startsWith(HASH_V2_PREFIX)) {
    const bcryptHash = storedHash.slice(HASH_V2_PREFIX.length);
    const valid = await bcrypt.compare(password, bcryptHash);
    return { valid, needsUpgrade: false };
  }

  // v1 — legacy SHA-256 (static salt, no key-stretching)
  if (storedHash.startsWith(HASH_V1_PREFIX)) {
    const legacyHash = storedHash.slice(HASH_V1_PREFIX.length);
    const salt = process.env.AUTH_SALT;
    if (!salt) {
      console.warn('[AUTH] AUTH_SALT not set — legacy v1 password verification will fail. Set AUTH_SALT to enable v1 migration.');
      return { valid: false, needsUpgrade: true };
    }
    const inputHash = createHash('sha256').update(password + salt).digest('hex');
    try {
      const valid = timingSafeEqual(Buffer.from(inputHash), Buffer.from(legacyHash));
      return { valid, needsUpgrade: true }; // Signal that password should be re-hashed
    } catch {
      return { valid: false, needsUpgrade: true };
    }
  }

  // Unknown format — try direct bcrypt compare as fallback
  try {
    const valid = await bcrypt.compare(password, storedHash);
    return { valid, needsUpgrade: true };
  } catch {
    return { valid: false, needsUpgrade: true };
  }
}

/** Hash a session token for database storage (one-way). */
export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

// ─── Session management ───

/** Create a new session. Stores the HASHED token in the database. */
export async function createSession(userId: string, ipAddress?: string, userAgent?: string) {
  const token = randomBytes(32).toString('hex');
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await db.session.create({
    data: {
      userId,
      token: tokenHash,
      ipAddress,
      userAgent,
      expiresAt,
      lastActivityAt: new Date(),
    },
  });

  return { token, expiresAt }; // Return RAW token for cookie only
}

/** Validate a raw session token by hashing and looking up the hash. */
export async function validateSession(token: string) {
  if (!token) return null;

  const tokenHash = hashToken(token);

  const session = await db.session.findUnique({
    where: { token: tokenHash },
    include: {
      user: {
        include: {
          memberships: {
            include: {
              organization: true,
              role: true,
            },
          },
        },
      },
    },
  });

  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await db.session.delete({ where: { id: session.id } });
    return null;
  }
  if (session.user.status !== 'active') return null;

  // Update last activity
  await db.session.update({
    where: { id: session.id },
    data: { lastActivityAt: new Date() },
  });

  return session;
}

/** Destroy a session by its raw token. */
export async function destroySession(token: string) {
  try {
    const tokenHash = hashToken(token);
    await db.session.delete({ where: { token: tokenHash } });
  } catch {
    // Session may already be deleted
  }
}

/** Extract and validate session from the current request's cookies. */
export async function getSessionFromRequest() {
  const cookieStore = await cookies();
  const token = cookieStore.get('mianx_session')?.value;
  return validateSession(token || '');
}

/** Check if a permission string satisfies a required permission. */
export function hasPermission(permissions: string[], required: string): boolean {
  if (permissions.includes('*')) return true;
  return permissions.includes(required);
}
