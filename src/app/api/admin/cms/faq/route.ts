import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { ensureCmsTables, containsRiskyWording, editorialHint } from '@/lib/db/cms';
import { query } from '@/lib/db/postgres';

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  await ensureCmsTables();
  const result = await query('SELECT * FROM faq_items ORDER BY sort_order ASC, created_at DESC');
  return NextResponse.json({ items: result.rows });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  await ensureCmsTables();
  const body = await request.json();
  const { category, question, answer, sort_order, is_published } = body;
  if (!question || !answer) return NextResponse.json({ error: 'question et answer requis' }, { status: 400 });
  if (containsRiskyWording(`${question} ${answer}`)) {
    return NextResponse.json({ error: editorialHint() }, { status: 422 });
  }
  const result = await query(
    `INSERT INTO faq_items (category, question, answer, sort_order, is_published)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [category || 'general', question, answer, sort_order || 0, is_published ?? true]
  );
  return NextResponse.json({ item: result.rows[0] }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const body = await request.json();
  const { id, category, question, answer, sort_order, is_published } = body;
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });
  if (containsRiskyWording(`${question || ''} ${answer || ''}`)) {
    return NextResponse.json({ error: editorialHint() }, { status: 422 });
  }
  const result = await query(
    `UPDATE faq_items SET
      category = COALESCE($2, category),
      question = COALESCE($3, question),
      answer = COALESCE($4, answer),
      sort_order = COALESCE($5, sort_order),
      is_published = COALESCE($6, is_published),
      updated_at = CURRENT_TIMESTAMP
     WHERE id = $1 RETURNING *`,
    [id, category || null, question || null, answer || null, sort_order ?? null, is_published ?? null]
  );
  return NextResponse.json({ item: result.rows[0] });
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });
  await query('DELETE FROM faq_items WHERE id = $1', [id]);
  return NextResponse.json({ success: true });
}

