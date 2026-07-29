import { query, getClient } from "@/lib/db/postgres";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { readFile } from "fs/promises";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Token de téléchargement requis." },
      { status: 400 }
    );
  }

  // ─── Hash the token and look it up ────────────────────────
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  let tokenRow;
  try {
    const result = await query(
      `SELECT t.*, o.status as order_status, o.product_id,
              p.private_file_path, p.file_key, p.name as product_name
       FROM download_tokens t
       JOIN digital_orders o ON t.order_id = o.id
       JOIN digital_products p ON o.product_id = p.id
       WHERE t.token_hash = $1`,
      [tokenHash]
    );
    tokenRow = result.rows[0];
  } catch (dbErr) {
    console.error("Download — DB error:", dbErr);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }

  // ─── Validate token ───────────────────────────────────────
  if (!tokenRow) {
    return NextResponse.json({ error: "Token invalide." }, { status: 403 });
  }

  if (tokenRow.revoked_at) {
    return NextResponse.json({ error: "Token révoqué." }, { status: 403 });
  }

  if (new Date(tokenRow.expires_at) < new Date()) {
    return NextResponse.json({ error: "Token expiré." }, { status: 403 });
  }

  if (tokenRow.download_count >= tokenRow.max_downloads) {
    return NextResponse.json(
      { error: "Nombre maximum de téléchargements atteint." },
      { status: 403 }
    );
  }

  if (tokenRow.order_status !== "paid" && tokenRow.order_status !== "fulfilled") {
    return NextResponse.json(
      { error: "Commande non payée." },
      { status: 403 }
    );
  }

  // ─── Determine file path ──────────────────────────────────
  const filePath =
    tokenRow.private_file_path ||
    process.env.DUERP_PDF_PRIVATE_PATH ||
    "/var/www/projects/juriste-droit-du-travail/private-products/duerp-modele.pdf";

  // Prevent path traversal
  if (!filePath.startsWith("/var/www/projects/juriste-droit-du-travail/private-products/")) {
    return NextResponse.json({ error: "Chemin invalide." }, { status: 500 });
  }

  // ─── Atomically increment download count ──────────────────
  const client = await getClient();
  try {
    await client.query("BEGIN");

    const updateResult = await client.query(
      `UPDATE download_tokens
       SET download_count = download_count + 1,
           last_downloaded_at = NOW()
       WHERE id = $1
         AND revoked_at IS NULL
         AND download_count < max_downloads
         AND expires_at > NOW()
       RETURNING id`,
      [tokenRow.id]
    );

    if (updateResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return NextResponse.json(
        { error: "Téléchargement non autorisé." },
        { status: 403 }
      );
    }

    // Audit log
    await client.query(
      `INSERT INTO digital_audit_log (order_id, action, details)
       VALUES ($1, 'download', $2::jsonb)`,
      [tokenRow.order_id, JSON.stringify({ token_id: tokenRow.id })]
    );

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Download — increment error:", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  } finally {
    client.release();
  }

  // ─── Stream the PDF ───────────────────────────────────────
  try {
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="modele-duerp-a-completer.pdf"',
        "Cache-Control": "private, no-store, max-age=0",
        "Pragma": "no-cache",
        "X-Content-Type-Options": "nosniff",
        "Content-Length": String(fileBuffer.length),
      },
    });
  } catch (fileErr) {
    console.error("Download — file read error:", fileErr);
    return NextResponse.json(
      { error: "Fichier introuvable sur le serveur." },
      { status: 500 }
    );
  }
}
