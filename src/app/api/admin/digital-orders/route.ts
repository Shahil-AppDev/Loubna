import { requireAdmin } from "@/lib/auth/require-admin";
import { query } from "@/lib/db/postgres";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (!auth.authorized) return auth.response;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let sql = `
      SELECT o.*, p.name as product_name
      FROM digital_orders o
      LEFT JOIN digital_products p ON o.product_id = p.id
      WHERE 1=1
    `;
    const params: unknown[] = [];
    let paramIndex = 1;

    if (status) {
      sql += ` AND o.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    sql += ` ORDER BY o.created_at DESC`;

    const result = await query(sql, params);

    return NextResponse.json({ orders: result.rows });
  } catch (error) {
    console.error("Admin digital orders — error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
