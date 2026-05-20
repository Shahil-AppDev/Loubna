import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { ensureCmsTables, containsRiskyWording, editorialHint } from '@/lib/db/cms';
import { query } from '@/lib/db/postgres';

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  await ensureCmsTables();
  const result = await query('SELECT * FROM cms_pages ORDER BY slug ASC');
  return NextResponse.json({ items: result.rows });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  await ensureCmsTables();
  const body = await request.json();
  const { slug, title, content, meta_title, meta_description, status } = body;
  if (!slug || !title) {
    return NextResponse.json({ error: 'slug et titre requis' }, { status: 400 });
  }
  if (containsRiskyWording(`${title} ${content || ''}`)) {
    return NextResponse.json({ error: editorialHint() }, { status: 422 });
  }
  const result = await query(
    `INSERT INTO cms_pages (slug, title, content, meta_title, meta_description, status)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [slug, title, content || '', meta_title || null, meta_description || null, status || 'draft']
  );
  return NextResponse.json({ item: result.rows[0] }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  await ensureCmsTables();
  const body = await request.json();
  const { id, slug, title, content, meta_title, meta_description, status } = body;
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });
  if (containsRiskyWording(`${title || ''} ${content || ''}`)) {
    return NextResponse.json({ error: editorialHint() }, { status: 422 });
  }
  const result = await query(
    `UPDATE cms_pages
     SET slug = COALESCE($2, slug),
         title = COALESCE($3, title),
         content = COALESCE($4, content),
         meta_title = COALESCE($5, meta_title),
         meta_description = COALESCE($6, meta_description),
         status = COALESCE($7, status),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $1 RETURNING *`,
    [id, slug || null, title || null, content ?? null, meta_title || null, meta_description || null, status || null]
  );
  return NextResponse.json({ item: result.rows[0] });
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });
  await query('DELETE FROM cms_pages WHERE id = $1', [id]);
  return NextResponse.json({ success: true });
}

