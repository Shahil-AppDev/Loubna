// Types TypeScript pour la base de données

export type AppointmentStatus =
  | 'pending_payment'
  | 'paid'
  | 'confirmed'
  | 'cancelled'
  | 'expired'
  | 'failed'
  | 'completed';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded';
export type PaymentStatusType = 'pending' | 'succeeded' | 'failed' | 'refunded';
export type PaymentProvider = 'sumup' | 'stripe';
export type AdminRole = 'admin' | 'super_admin';

export interface ServiceRdv {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price_cents: number;
  price_label: string | null;
  is_quote_only: boolean;
  sort_order: number;
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
  // SumUp
  sumup_checkout_id: string | null;
  sumup_checkout_reference: string | null;
  sumup_transaction_id: string | null;
  // Legacy Stripe (conservés pour historique)
  stripe_payment_intent_id: string | null;
  stripe_session_id: string | null;
  notes: string | null;
  admin_notes: string | null;
  expires_at: string | null;
  confirmed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  appointment_id: string | null;
  amount_cents: number;
  provider: PaymentProvider;
  checkout_reference: string | null;
  checkout_id: string | null;
  transaction_id: string | null;
  // Legacy Stripe
  stripe_payment_intent_id: string | null;
  stripe_session_id: string | null;
  status: PaymentStatusType;
  metadata: Record<string, unknown> | null;
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

// ─── Digital Products ──────────────────────────────────────
export type DigitalOrderStatus =
  | 'pending_payment'
  | 'paid'
  | 'fulfilled'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'expired';

export type DocumentStatus = 'draft' | 'published' | 'archived';
export type TargetAudience = 'salarie' | 'employeur' | 'all';
export type ProductType = 'template' | 'pack' | 'guide';

export interface DocumentCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  target_audience: TargetAudience;
  seo_title: string | null;
  seo_description: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DigitalProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  description: string | null;
  usage_description: string | null;
  target_audience: TargetAudience;
  category_id: string | null;
  subcategory: string | null;
  synonyms: string[];
  tags: string[];
  format: string;
  page_count: number | null;
  price_amount: number;
  currency: string;
  product_type: ProductType;
  file_key: string | null;
  private_file_path: string | null;
  file_sha256: string | null;
  preview_key: string | null;
  version: string;
  status: DocumentStatus;
  is_active: boolean;
  is_featured: boolean;
  is_popular: boolean;
  published_at: string | null;
  last_reviewed_at: string | null;
  author: string | null;
  reviewer: string | null;
  legal_sources: string | null;
  disclaimer: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface DocumentFaq {
  id: string;
  document_id: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
}

export interface SearchLog {
  id: string;
  query: string;
  filters: Record<string, unknown> | null;
  result_count: number;
  created_at: string;
}

export interface DigitalOrder {
  id: string;
  product_id: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  amount: number;
  currency: string;
  status: DigitalOrderStatus;
  payment_provider: string;
  provider_checkout_id: string | null;
  provider_reference: string | null;
  provider_transaction_id: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DownloadToken {
  id: string;
  order_id: string;
  token_hash: string;
  expires_at: string;
  max_downloads: number;
  download_count: number;
  last_downloaded_at: string | null;
  revoked_at: string | null;
  created_at: string;
}

export interface DigitalAuditLog {
  id: string;
  order_id: string | null;
  action: string;
  performed_by: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
}

export interface DigitalOrderWithProduct extends DigitalOrder {
  product: DigitalProduct | null;
}
