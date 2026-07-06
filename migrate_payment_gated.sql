-- Migration: payment-gated appointments
-- Add new appointment statuses
ALTER TYPE appointment_status ADD VALUE IF NOT EXISTS 'pending_payment';
ALTER TYPE appointment_status ADD VALUE IF NOT EXISTS 'expired';
ALTER TYPE appointment_status ADD VALUE IF NOT EXISTS 'failed';

-- Add new payment statuses
ALTER TYPE payment_status ADD VALUE IF NOT EXISTS 'pending';
ALTER TYPE payment_status ADD VALUE IF NOT EXISTS 'failed';
ALTER TYPE payment_status ADD VALUE IF NOT EXISTS 'cancelled';

-- Add expires_at and confirmed_at columns
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMPTZ;

-- Migrate old 'pending' appointments to 'pending_payment'
UPDATE appointments SET status = 'pending_payment' WHERE status = 'pending';

-- Migrate old 'unpaid' payment_status to 'pending'
UPDATE appointments SET payment_status = 'pending' WHERE payment_status = 'unpaid';
