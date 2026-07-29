import { query } from "@/lib/db/postgres";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    const result = await query(
      `SELECT dp.*, dc.name as category_name, dc.slug as category_slug
       FROM digital_products dp
       LEFT JOIN document_categories dc ON dp.category_id = dc.id
       WHERE dp.slug = $1 AND dp.status = 'published' AND dp.is_active = true`,
      [slug]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Document introuvable" }, { status: 404 });
    }

    const document = result.rows[0];

    // Fetch FAQs
    const faqResult = await query(
      `SELECT question, answer, sort_order FROM document_faqs
       WHERE document_id = $1 ORDER BY sort_order ASC`,
      [document.id]
    );

    // Fetch related documents
    const relatedResult = await query(
      `SELECT dp2.slug, dp2.name, dp2.subtitle, dp2.price_amount, dp2.format, dp2.page_count
       FROM document_related_items dri
       JOIN digital_products dp2 ON dri.related_document_id = dp2.id
       WHERE dri.document_id = $1 AND dp2.status = 'published' AND dp2.is_active = true
       ORDER BY dri.relation_type ASC
       LIMIT 4`,
      [document.id]
    );

    return NextResponse.json({
      document: {
        ...document,
        faqs: faqResult.rows,
        related: relatedResult.rows,
      },
    });
  } catch (err) {
    console.error("Document detail API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
