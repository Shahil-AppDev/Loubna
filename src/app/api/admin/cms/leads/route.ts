import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { ensureCmsTables } from '@/lib/db/cms';
import { query } from '@/lib/db/postgres';

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  await ensureCmsTables();
  const result = await query('SELECT * FROM leads ORDER BY created_at DESC');
  return NextResponse.json({ items: result.rows });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const body = await request.json();
  const { id, status, admin_notes } = body;
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });
  const result = await query(
    `UPDATE leads SET
      status = COALESCE($2, status),
      admin_notes = COALESCE($3, admin_notes),
      updated_at = CURRENT_TIMESTAMP
     WHERE id = $1 RETURNING *`,
    [id, status || null, admin_notes ?? null]
  );
  return NextResponse.json({ item: result.rows[0] });
}

