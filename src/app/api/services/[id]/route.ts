import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/postgres';
import { requireAdmin } from '@/lib/auth/require-admin';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const { active } = body;
    const result = await query(
      'UPDATE services_rdv SET active = $1 WHERE id = $2 RETURNING *',
      [Boolean(active), params.id]
    );

    if (!result.rows[0]) {
      return NextResponse.json({ error: 'Service introuvable' }, { status: 404 });
    }

    return NextResponse.json({ service: result.rows[0] });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

