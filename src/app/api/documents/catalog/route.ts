import { query } from "@/lib/db/postgres";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "";
  const audience = searchParams.get("audience") || "";

  try {
    const conditions: string[] = [
      "dp.status = 'published'",
      "dp.is_active = true",
    ];
    const params: (string | number)[] = [];
    let paramIdx = 1;

    if (category) {
      conditions.push(`dc.slug = $${paramIdx}`);
      params.push(category);
      paramIdx++;
    }

    if (audience && audience !== "all") {
      conditions.push(`(dp.target_audience = $${paramIdx} OR dp.target_audience = 'all')`);
      params.push(audience);
      paramIdx++;
    }

    const sql = `
      SELECT dp.id, dp.slug, dp.name, dp.subtitle, dp.description, dp.target_audience,
             dp.format, dp.page_count, dp.price_amount, dp.currency, dp.product_type,
             dp.is_featured, dp.is_popular, dp.tags, dp.synonyms,
             dp.last_reviewed_at, dp.seo_title, dp.seo_description,
             dc.name as category_name, dc.slug as category_slug
      FROM digital_products dp
      LEFT JOIN document_categories dc ON dp.category_id = dc.id
      WHERE ${conditions.join(" AND ")}
      ORDER BY dp.is_featured DESC, dp.is_popular DESC, dp.name ASC
    `;

    const result = await query(sql, params);
    return NextResponse.json({ documents: result.rows });
  } catch (err) {
    console.error("Catalog API error:", err);
    return NextResponse.json({ documents: [] }, { status: 200 });
  }
}
