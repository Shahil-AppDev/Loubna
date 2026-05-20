import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';

export async function requireAdmin() {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId || !session.role) {
    return {
      authorized: false as const,
      response: NextResponse.json({ error: 'Non authentifie' }, { status: 401 }),
    };
  }

  if (session.role !== 'admin' && session.role !== 'super_admin') {
    return {
      authorized: false as const,
      response: NextResponse.json({ error: 'Acces refuse' }, { status: 403 }),
    };
  }

  return { authorized: true as const, session };
}

