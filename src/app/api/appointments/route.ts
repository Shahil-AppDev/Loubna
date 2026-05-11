import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

// GET - Récupérer tous les rendez-vous (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const paymentStatus = searchParams.get('payment_status');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    let query = supabaseAdmin
      .from('appointments')
      .select(`
        *,
        service:services_rdv(*)
      `)
      .order('appointment_date', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    if (paymentStatus) {
      query = query.eq('payment_status', paymentStatus);
    }

    if (startDate) {
      query = query.gte('appointment_date', startDate);
    }

    if (endDate) {
      query = query.lte('appointment_date', endDate);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ appointments: data });
  } catch (error) {
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
    const { data: existingAppointments } = await supabaseAdmin
      .from('appointments')
      .select('*')
      .eq('appointment_date', appointment_date)
      .neq('status', 'cancelled');

    if (existingAppointments && existingAppointments.length > 0) {
      return NextResponse.json(
        { error: 'Ce créneau est déjà réservé' },
        { status: 409 }
      );
    }

    // Créer le rendez-vous
    const { data, error } = await supabaseAdmin
      .from('appointments')
      .insert({
        client_name,
        client_email,
        client_phone,
        service_id,
        appointment_date,
        duration_minutes,
        notes,
        status: 'pending',
        payment_status: 'unpaid'
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ appointment: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
