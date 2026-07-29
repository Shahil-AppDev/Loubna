import { query } from "@/lib/db/postgres";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const storeEnabled = process.env.DOCUMENT_STORE_ENABLED === "true";
  if (!storeEnabled) {
    return NextResponse.json({ documents: [], total: 0, disabled: true });
  }

  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim();
  const audience = searchParams.get("audience") || "";
  const category = searchParams.get("category") || "";
  const format = searchParams.get("format") || "";
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

  if (!q || q.length < 2) {
    return NextResponse.json({ documents: [], total: 0 });
  }

  try {
    const conditions: string[] = [
      "dp.status = 'published'",
      "dp.is_active = true",
    ];
    const params: (string | number)[] = [];
    let paramIdx = 1;

    // Search in title, subtitle, description, synonyms, tags
    conditions.push(`(
      dp.name ILIKE $${paramIdx} OR
      dp.subtitle ILIKE $${paramIdx} OR
      dp.description ILIKE $${paramIdx} OR
      dp.usage_description ILIKE $${paramIdx} OR
      EXISTS (SELECT 1 FROM unnest(dp.synonyms) s WHERE s ILIKE $${paramIdx}) OR
      EXISTS (SELECT 1 FROM unnest(dp.tags) t WHERE t ILIKE $${paramIdx})
    )`);
    params.push(`%${q}%`);
    paramIdx++;

    if (audience && audience !== "all") {
      conditions.push(`(dp.target_audience = $${paramIdx} OR dp.target_audience = 'all')`);
      params.push(audience);
      paramIdx++;
    }

    if (category) {
      conditions.push(`dc.slug = $${paramIdx}`);
      params.push(category);
      paramIdx++;
    }

    if (format) {
      conditions.push(`dp.format ILIKE $${paramIdx}`);
      params.push(format);
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
      LIMIT $${paramIdx}
    `;
    params.push(limit);

    const result = await query(sql, params);

    // Log search
    try {
      await query(
        `INSERT INTO search_logs (query, filters, result_count) VALUES ($1, $2::jsonb, $3)`,
        [q, JSON.stringify({ audience, category, format }), result.rows.length]
      );
    } catch {
      // Non-blocking
    }

    return NextResponse.json({ documents: result.rows, total: result.rows.length });
  } catch (err) {
    console.error("Search API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
