import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { ensureCmsTables, containsRiskyWording, editorialHint } from '@/lib/db/cms';
import { query } from '@/lib/db/postgres';

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  await ensureCmsTables();
  const result = await query('SELECT * FROM blog_posts ORDER BY created_at DESC');
  return NextResponse.json({ items: result.rows });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  await ensureCmsTables();
  const body = await request.json();
  const { slug, title, excerpt, content, category, cover_image, meta_title, meta_description, status } = body;
  if (!slug || !title) return NextResponse.json({ error: 'slug et titre requis' }, { status: 400 });
  if (containsRiskyWording(`${title} ${excerpt || ''} ${content || ''}`)) {
    return NextResponse.json({ error: editorialHint() }, { status: 422 });
  }
  const result = await query(
    `INSERT INTO blog_posts (slug,title,excerpt,content,category,cover_image,meta_title,meta_description,status,published_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,CASE WHEN $9='published' THEN CURRENT_TIMESTAMP ELSE NULL END)
     RETURNING *`,
    [slug, title, excerpt || null, content || '', category || 'general', cover_image || null, meta_title || null, meta_description || null, status || 'draft']
  );
  return NextResponse.json({ item: result.rows[0] }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const body = await request.json();
  const { id, slug, title, excerpt, content, category, cover_image, meta_title, meta_description, status } = body;
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });
  if (containsRiskyWording(`${title || ''} ${excerpt || ''} ${content || ''}`)) {
    return NextResponse.json({ error: editorialHint() }, { status: 422 });
  }
  const result = await query(
    `UPDATE blog_posts SET
      slug = COALESCE($2, slug),
      title = COALESCE($3, title),
      excerpt = COALESCE($4, excerpt),
      content = COALESCE($5, content),
      category = COALESCE($6, category),
      cover_image = COALESCE($7, cover_image),
      meta_title = COALESCE($8, meta_title),
      meta_description = COALESCE($9, meta_description),
      status = COALESCE($10, status),
      published_at = CASE WHEN COALESCE($10, status)='published' THEN COALESCE(published_at, CURRENT_TIMESTAMP) ELSE published_at END,
      updated_at = CURRENT_TIMESTAMP
     WHERE id = $1 RETURNING *`,
    [id, slug || null, title || null, excerpt || null, content ?? null, category || null, cover_image || null, meta_title || null, meta_description || null, status || null]
  );
  return NextResponse.json({ item: result.rows[0] });
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });
  await query('DELETE FROM blog_posts WHERE id = $1', [id]);
  return NextResponse.json({ success: true });
}

