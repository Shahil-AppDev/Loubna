// Types TypeScript pour la base de données Supabase

export type AppointmentStatus = 'pending' | 'confirmed' | 'paid' | 'cancelled' | 'completed';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded';
export type PaymentStatusType = 'pending' | 'succeeded' | 'failed' | 'refunded';
export type AdminRole = 'admin' | 'super_admin';

export interface ServiceRdv {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price_cents: number;
  stripe_price_id: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  service_id: string | null;
  appointment_date: string;
  duration_minutes: number;
  status: AppointmentStatus;
  payment_status: PaymentStatus;
  stripe_payment_intent_id: string | null;
  stripe_session_id: string | null;
  notes: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  appointment_id: string | null;
  amount_cents: number;
  stripe_payment_intent_id: string | null;
  stripe_session_id: string | null;
  status: PaymentStatusType;
  metadata: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  created_at: string;
}

export interface AvailabilitySetting {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  active: boolean;
  created_at: string;
}

export interface BlockedDate {
  id: string;
  date: string;
  reason: string | null;
  created_at: string;
}

// Types pour les relations
export interface AppointmentWithService extends Appointment {
  service: ServiceRdv | null;
}

export interface PaymentWithAppointment extends Payment {
  appointment: Appointment | null;
}
