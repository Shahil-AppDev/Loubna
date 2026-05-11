import { query } from '@/lib/db/postgres';
import { requireAdmin } from '@/lib/auth/require-admin';
import { NextRequest, NextResponse } from 'next/server';

// GET - Récupérer tous les rendez-vous (admin only)
export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (!auth.authorized) return auth.response;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const paymentStatus = searchParams.get('payment_status');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    let sql = `
      SELECT 
        a.*,
        row_to_json(s.*) as service
      FROM appointments a
      LEFT JOIN services_rdv s ON a.service_id = s.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramIndex = 1;

    if (status) {
      sql += ` AND a.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    if (paymentStatus) {
      sql += ` AND a.payment_status = $${paramIndex}`;
      params.push(paymentStatus);
      paramIndex++;
    }

    if (startDate) {
      sql += ` AND a.appointment_date >= $${paramIndex}`;
      params.push(startDate);
      paramIndex++;
    }

    if (endDate) {
      sql += ` AND a.appointment_date <= $${paramIndex}`;
      params.push(endDate);
      paramIndex++;
    }

    sql += ` ORDER BY a.appointment_date DESC`;

    const result = await query(sql, params);

    return NextResponse.json({ appointments: result.rows });
  } catch (error: any) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Créer un nouveau rendez-vous
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      client_name,
      client_email,
      client_phone,
      service_id,
      appointment_date,
      duration_minutes,
      notes
    } = body;

    // Validation
    if (!client_name || !client_email || !service_id || !appointment_date || !duration_minutes) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Vérifier que le créneau est disponible
    const checkResult = await query(
      `SELECT * FROM appointments 
       WHERE appointment_date = $1 AND status != 'cancelled'`,
      [appointment_date]
    );

    if (checkResult.rows.length > 0) {
      return NextResponse.json(
        { error: 'Ce créneau est déjà réservé' },
        { status: 409 }
      );
    }

    // Créer le rendez-vous
    const insertResult = await query(
      `INSERT INTO appointments 
       (client_name, client_email, client_phone, service_id, appointment_date, duration_minutes, notes, status, payment_status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending', 'unpaid')
       RETURNING *`,
      [client_name, client_email, client_phone, service_id, appointment_date, duration_minutes, notes]
    );

    return NextResponse.json({ appointment: insertResult.rows[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
