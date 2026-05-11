import { supabaseAdmin } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

export async function POST(request: NextRequest) {
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
    const { data: appointment, error: appointmentError } = await supabaseAdmin
      .from('appointments')
      .select('*, service:services_rdv(*)')
      .eq('id', appointment_id)
      .single();

    if (appointmentError || !appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

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
    await supabaseAdmin
      .from('appointments')
      .update({ stripe_session_id: session.id })
      .eq('id', appointment_id);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
