import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { requireAdmin } from '@/lib/auth/require-admin';
import { query } from '@/lib/db/postgres';

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  const body = await request.json();
  const { newPassword } = body;
  if (!newPassword || String(newPassword).length < 10) {
    return NextResponse.json({ error: 'Mot de passe trop court (10 caracteres min)' }, { status: 400 });
  }

  const hashed = await bcrypt.hash(String(newPassword), 12);
  await query('UPDATE admin_users SET password_hash = $1 WHERE id = $2', [hashed, auth.session.userId]);

  return NextResponse.json({ success: true });
}

