import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { ensureCmsTables, containsRiskyWording, editorialHint } from '@/lib/db/cms';
import { query } from '@/lib/db/postgres';

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  await ensureCmsTables();
  const result = await query('SELECT * FROM testimonials ORDER BY created_at DESC');
  return NextResponse.json({ items: result.rows });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  await ensureCmsTables();
  const body = await request.json();
  const { client_name, content, is_visible } = body;
  if (!client_name || !content) return NextResponse.json({ error: 'nom et contenu requis' }, { status: 400 });
  if (containsRiskyWording(`${content}`)) return NextResponse.json({ error: editorialHint() }, { status: 422 });
  const result = await query(
    'INSERT INTO testimonials (client_name, content, is_visible) VALUES ($1,$2,$3) RETURNING *',
    [client_name, content, is_visible ?? true]
  );
  return NextResponse.json({ item: result.rows[0] }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const body = await request.json();
  const { id, client_name, content, is_visible } = body;
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });
  if (containsRiskyWording(`${content || ''}`)) return NextResponse.json({ error: editorialHint() }, { status: 422 });
  const result = await query(
    `UPDATE testimonials SET
      client_name = COALESCE($2, client_name),
      content = COALESCE($3, content),
      is_visible = COALESCE($4, is_visible),
      updated_at = CURRENT_TIMESTAMP
     WHERE id = $1 RETURNING *`,
    [id, client_name || null, content || null, is_visible ?? null]
  );
  return NextResponse.json({ item: result.rows[0] });
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });
  await query('DELETE FROM testimonials WHERE id = $1', [id]);
  return NextResponse.json({ success: true });
}

