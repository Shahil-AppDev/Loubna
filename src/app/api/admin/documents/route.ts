import { requireAdmin } from '@/lib/auth/require-admin';
import { query } from '@/lib/db/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || '';

  try {
    let sql = `
      SELECT dp.id, dp.slug, dp.name, dp.subtitle, dp.status, dp.is_active,
             dp.is_featured, dp.is_popular, dp.price_amount, dp.currency,
             dp.format, dp.page_count, dp.product_type, dp.target_audience,
             dp.category_id, dc.name as category_name, dc.slug as category_slug,
             dp.created_at, dp.updated_at, dp.published_at,
             COUNT(do.id) as order_count,
             COALESCE(SUM(CASE WHEN do.status IN ('paid','fulfilled') THEN 1 ELSE 0 END), 0) as paid_count,
             COALESCE(SUM(CASE WHEN do.status IN ('paid','fulfilled') THEN do.amount ELSE 0 END), 0) as revenue
      FROM digital_products dp
      LEFT JOIN document_categories dc ON dp.category_id = dc.id
      LEFT JOIN digital_orders do ON dp.id = do.product_id
    `;
    const params: string[] = [];

    if (status) {
      sql += ` WHERE dp.status = $1`;
      params.push(status);
    }

    sql += ` GROUP BY dp.id, dc.name, dc.slug ORDER BY dp.is_featured DESC, dp.name ASC`;

    const result = await query(sql, params);
    return NextResponse.json({ documents: result.rows });
  } catch (err) {
    console.error('Admin documents API error:', err);
    return NextResponse.json({ documents: [] }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();
    const {
      id, status, is_active, is_featured, is_popular,
      price_amount, category_id, seo_title, seo_description,
      subtitle, description, usage_description, disclaimer,
      tags, synonyms
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID requis.' }, { status: 400 });
    }

    const result = await query(
      `UPDATE digital_products SET
        status            = COALESCE($1, status),
        is_active         = COALESCE($2, is_active),
        is_featured       = COALESCE($3, is_featured),
        is_popular        = COALESCE($4, is_popular),
        price_amount      = COALESCE($5, price_amount),
        category_id       = COALESCE($6::uuid, category_id),
        seo_title         = COALESCE($7, seo_title),
        seo_description   = COALESCE($8, seo_description),
        subtitle          = COALESCE($9, subtitle),
        description       = COALESCE($10, description),
        usage_description = COALESCE($11, usage_description),
        disclaimer        = COALESCE($12, disclaimer),
        tags              = COALESCE($13, tags),
        synonyms          = COALESCE($14, synonyms),
        published_at      = CASE WHEN $1 = 'published' AND published_at IS NULL THEN NOW() ELSE published_at END,
        updated_at        = NOW()
      WHERE id = $15::uuid
      RETURNING *`,
      [
        status || null,
        is_active ?? null,
        is_featured ?? null,
        is_popular ?? null,
        price_amount ?? null,
        category_id || null,
        seo_title || null,
        seo_description || null,
        subtitle || null,
        description || null,
        usage_description || null,
        disclaimer || null,
        tags || null,
        synonyms || null,
        id,
      ]
    );

    return NextResponse.json({ document: result.rows[0] });
  } catch (err) {
    console.error('Admin documents PATCH error:', err);
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
