import { query } from '@/lib/db/postgres';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2026-04-22.dahlia',
  });
  try {
    const body = await request.json();
    const { appointment_id, service_id } = body;

    if (!appointment_id || !service_id) {
      return NextResponse.json(
        { error: 'Missing appointment_id or service_id' },
        { status: 400 }
      );
    }

    // Récupérer le rendez-vous et le service
    const result = await query(
      `SELECT 
        a.*,
        row_to_json(s.*) as service
      FROM appointments a
      LEFT JOIN services_rdv s ON a.service_id = s.id
      WHERE a.id = $1`,
      [appointment_id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    const appointment = result.rows[0];
    const service = appointment.service;
    
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // Créer une session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: service.name,
              description: service.description || undefined,
            },
            unit_amount: service.price_cents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/rendez-vous/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/rendez-vous?cancelled=true`,
      metadata: {
        appointment_id,
        service_id,
        client_email: appointment.client_email,
        client_name: appointment.client_name,
      },
      customer_email: appointment.client_email,
    });

    // Mettre à jour le rendez-vous avec le session_id
    await query(
      'UPDATE appointments SET stripe_session_id = $1 WHERE id = $2',
      [session.id, appointment_id]
    );

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
