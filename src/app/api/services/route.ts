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

    sql += ' ORDER BY sort_order ASC';

    const result = await query(sql, params);

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
    const { name, description, duration_minutes, price_cents, active } = body;

    if (!name || !duration_minutes || price_cents === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO services_rdv (name, description, duration_minutes, price_cents, active)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, description, duration_minutes, price_cents, active !== undefined ? active : true]
    );

    return NextResponse.json({ service: result.rows[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
