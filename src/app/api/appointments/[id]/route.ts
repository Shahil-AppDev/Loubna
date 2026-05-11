import { query } from '@/lib/db/postgres';
import { NextRequest, NextResponse } from 'next/server';

// GET - Récupérer un rendez-vous par ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await query(
      `SELECT 
        a.*,
        row_to_json(s.*) as service
      FROM appointments a
      LEFT JOIN services_rdv s ON a.service_id = s.id
      WHERE a.id = $1`,
      [params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    return NextResponse.json({ appointment: result.rows[0] });
  } catch (error: any) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH - Mettre à jour un rendez-vous
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const allowedFields = ['status', 'payment_status', 'admin_notes', 'notes'];
    
    const updates: any = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const setClauses = Object.keys(updates).map((key, index) => `${key} = $${index + 2}`).join(', ');
    const values = [params.id, ...Object.values(updates)];

    const result = await query(
      `UPDATE appointments SET ${setClauses} WHERE id = $1 RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    return NextResponse.json({ appointment: result.rows[0] });
  } catch (error: any) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Supprimer un rendez-vous
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await query('DELETE FROM appointments WHERE id = $1', [params.id]);
    return NextResponse.json({ message: 'Appointment deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
