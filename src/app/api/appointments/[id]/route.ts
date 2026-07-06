import { query } from '@/lib/db/postgres';
import { requireAdmin } from '@/lib/auth/require-admin';
import { NextRequest, NextResponse } from 'next/server';

// GET - Récupérer un rendez-vous par ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await requireAdmin();
    if (!auth.authorized) return auth.response;

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
    const auth = await requireAdmin();
    if (!auth.authorized) return auth.response;

    const body = await request.json();
    const allowedFields = ['status', 'payment_status', 'admin_notes', 'notes'];

    // Sécurité : empêcher la confirmation sans paiement
    if (body.status === 'confirmed' || body.status === 'paid') {
      // Vérifier le payment_status actuel
      const currentResult = await query(
        'SELECT payment_status FROM appointments WHERE id = $1',
        [params.id]
      );
      const current = currentResult.rows[0];

      if (!current) {
        return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
      }

      // Si payment_status n'est pas 'paid' et l'admin ne le change pas simultanément
      const newPaymentStatus = body.payment_status || current.payment_status;
      if (newPaymentStatus !== 'paid') {
        return NextResponse.json(
          {
            error:
              "Un rendez-vous ne peut pas être confirmé sans paiement confirmé. " +
              "Pour forcer la confirmation, définissez payment_status sur 'paid' simultanément.",
          },
          { status: 422 }
        );
      }
    }

    const updates: any = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    // Si on confirme, mettre confirmed_at si pas déjà fait
    if (updates.status === 'confirmed' || updates.status === 'paid') {
      updates.confirmed_at = new Date().toISOString();
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
    const auth = await requireAdmin();
    if (!auth.authorized) return auth.response;

    await query('DELETE FROM appointments WHERE id = $1', [params.id]);
    return NextResponse.json({ message: 'Appointment deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
