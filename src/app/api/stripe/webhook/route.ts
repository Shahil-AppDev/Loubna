import { query } from '@/lib/db/postgres';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Gérer les événements Stripe
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSucceeded(paymentIntent);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailed(paymentIntent);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const appointmentId = session.metadata?.appointment_id;

  if (!appointmentId) {
    console.error('No appointment_id in session metadata');
    return;
  }

  // Mettre à jour le rendez-vous
  await query(
    `UPDATE appointments 
     SET status = 'paid', payment_status = 'paid', stripe_payment_intent_id = $1
     WHERE id = $2`,
    [session.payment_intent as string, appointmentId]
  );

  // Créer l'enregistrement de paiement
  await query(
    `INSERT INTO payments (appointment_id, amount_cents, stripe_payment_intent_id, stripe_session_id, status, metadata)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [appointmentId, session.amount_total || 0, session.payment_intent as string, session.id, 'succeeded', JSON.stringify(session.metadata)]
  );

  console.log(`Payment completed for appointment ${appointmentId}`);
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const appointmentId = paymentIntent.metadata?.appointment_id;

  if (!appointmentId) {
    return;
  }

  await query(
    `UPDATE appointments 
     SET status = 'paid', payment_status = 'paid', stripe_payment_intent_id = $1
     WHERE id = $2`,
    [paymentIntent.id, appointmentId]
  );

  console.log(`Payment succeeded for appointment ${appointmentId}`);
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  const appointmentId = paymentIntent.metadata?.appointment_id;

  if (!appointmentId) {
    return;
  }

  await query(
    `UPDATE appointments 
     SET status = 'pending', payment_status = 'unpaid'
     WHERE id = $1`,
    [appointmentId]
  );

  console.log(`Payment failed for appointment ${appointmentId}`);
}
