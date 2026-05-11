import { getIronSession, IronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  userId?: string;
  email?: string;
  role?: 'admin' | 'super_admin';
  isLoggedIn: boolean;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long',
  cookieName: 'loubna_admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  return getIronSession<SessionData>(cookies(), sessionOptions);
}

export async function createSession(userId: string, email: string, role: 'admin' | 'super_admin') {
  const session = await getSession();
  session.userId = userId;
  session.email = email;
  session.role = role;
  session.isLoggedIn = true;
  await session.save();
}

export async function destroySession() {
  const session = await getSession();
  session.destroy();
}
