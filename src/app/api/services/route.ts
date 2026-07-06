import { query } from '@/lib/db/postgres';
import { requireAdmin } from '@/lib/auth/require-admin';
import { NextRequest, NextResponse } from 'next/server';

// GET - Récupérer tous les services
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';
    const adminMode = searchParams.get('admin') === 'true';

    if (adminMode) {
      const auth = await requireAdmin();
      if (!auth.authorized) return auth.response;
    }

    let sql = 'SELECT * FROM services_rdv';
    const params: any[] = [];

    if (activeOnly) {
      sql += ' WHERE active = $1';
      params.push(true);
    }

    sql += ' ORDER BY sort_order ASC, name ASC';

    let result;
    try {
      result = await query(sql, params);
    } catch (sortErr) {
      // Fallback si sort_order n'existe pas
      const fallbackSql = sql.replace('ORDER BY sort_order ASC, name ASC', 'ORDER BY name ASC');
      result = await query(fallbackSql, params);
    }

    return NextResponse.json({ services: result.rows });
  } catch (error: any) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Créer un nouveau service
export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (!auth.authorized) return auth.response;

    const body = await request.json();
    const { name, description, duration_minutes, price_cents, price_label, is_quote_only, sort_order, active } = body;

    if (!name || !duration_minutes || price_cents === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO services_rdv (name, description, duration_minutes, price_cents, price_label, is_quote_only, sort_order, active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        name,
        description,
        duration_minutes,
        price_cents,
        price_label || null,
        is_quote_only || false,
        sort_order || 0,
        active !== undefined ? active : true
      ]
    );

    return NextResponse.json({ service: result.rows[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
