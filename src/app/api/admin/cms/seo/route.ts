import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/require-admin';
import { ensureCmsTables } from '@/lib/db/cms';
import { query } from '@/lib/db/postgres';

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  await ensureCmsTables();
  const result = await query('SELECT * FROM seo_settings ORDER BY created_at ASC LIMIT 1');
  return NextResponse.json({ item: result.rows[0] || null });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;
  await ensureCmsTables();
  const body = await request.json();
  const { site_title, site_description, og_image, schema_json, sitemap_enabled } = body;
  const result = await query(
    `UPDATE seo_settings SET
      site_title = COALESCE($1, site_title),
      site_description = COALESCE($2, site_description),
      og_image = COALESCE($3, og_image),
      schema_json = COALESCE($4, schema_json),
      sitemap_enabled = COALESCE($5, sitemap_enabled),
      updated_at = CURRENT_TIMESTAMP
     WHERE id = (SELECT id FROM seo_settings ORDER BY created_at ASC LIMIT 1)
     RETURNING *`,
    [site_title || null, site_description || null, og_image || null, schema_json || null, sitemap_enabled ?? null]
  );
  return NextResponse.json({ item: result.rows[0] });
}

