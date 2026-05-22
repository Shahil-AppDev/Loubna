/**
 * SumUp Online Payments — service layer
 * API reference: https://developer.sumup.com/api/checkouts
 */

const SUMUP_BASE_URL = process.env.SUMUP_BASE_URL?.replace(/\/$/, "") || "https://api.sumup.com";
const SUMUP_CURRENCY = process.env.SUMUP_CURRENCY || "EUR";

export type SumUpCheckoutStatus =
  | "PENDING"
  | "FAILED"
  | "PAID"
  | "EXPIRED";

export type SumUpCheckout = {
  id: string;
  checkout_reference: string;
  amount: number;
  currency: string;
  status: SumUpCheckoutStatus;
  merchant_code: string;
  description: string;
  return_url: string | null;
  redirect_url: string | null;
  hosted_checkout_url?: string;
  valid_until: string | null;
  date: string;
  transactions?: Array<{
    id: string;
    status: string;
    transaction_code: string;
    amount: number;
  }>;
};

export type CreateSumUpCheckoutInput = {
  checkoutReference: string;
  /** Amount in major units, e.g. 49.90 */
  amount: number;
  currency?: string;
  description: string;
  /** URL the user is returned to after payment */
  returnUrl: string;
};

function getSumUpApiKey(): string {
  const key = process.env.SUMUP_API_KEY?.trim();
  if (!key) {
    throw new Error("SUMUP_API_KEY is not configured on this server.");
  }
  return key;
}

function getSumUpMerchantCode(): string {
  const code = process.env.SUMUP_MERCHANT_CODE?.trim();
  if (!code) {
    throw new Error("SUMUP_MERCHANT_CODE is not configured on this server.");
  }
  return code;
}

async function sumupFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const apiKey = getSumUpApiKey();
  const url = `${SUMUP_BASE_URL}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...(options.headers ?? {}),
    },
  });

  let data: unknown;
  const text = await res.text();
  try {
    data = JSON.parse(text);
  } catch {
    data = { message: text };
  }

  if (!res.ok) {
    const msg =
      (data as { message?: string; error_message?: string })?.message ||
      (data as { error_message?: string })?.error_message ||
      `SumUp API error ${res.status}`;
    throw new Error(msg);
  }

  return data as T;
}

/**
 * Create a hosted SumUp checkout.
 * Returns the full checkout object; redirect the user to
 * `https://pay.sumup.com/b2c/${checkout.id}` for hosted payment.
 */
export async function createSumUpCheckout(
  input: CreateSumUpCheckoutInput
): Promise<SumUpCheckout> {
  const merchantCode = getSumUpMerchantCode();

  const payload = {
    checkout_reference: input.checkoutReference,
    amount: Number(input.amount.toFixed(2)),
    currency: input.currency || SUMUP_CURRENCY,
    merchant_code: merchantCode,
    description: input.description,
    return_url: input.returnUrl,
  };

  const checkout = await sumupFetch<SumUpCheckout>("/v0.1/checkouts", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return checkout;
}

/**
 * Retrieve a checkout by its reference (not the ID).
 */
export async function getSumUpCheckoutByReference(
  checkoutReference: string
): Promise<SumUpCheckout | null> {
  try {
    const result = await sumupFetch<SumUpCheckout[]>(
      `/v0.1/checkouts?checkout_reference=${encodeURIComponent(checkoutReference)}`
    );
    return Array.isArray(result) && result.length > 0 ? result[0] : null;
  } catch {
    return null;
  }
}

/**
 * Retrieve a checkout by its ID.
 */
export async function getSumUpCheckoutById(
  checkoutId: string
): Promise<SumUpCheckout | null> {
  try {
    return await sumupFetch<SumUpCheckout>(`/v0.1/checkouts/${checkoutId}`);
  } catch {
    return null;
  }
}

/**
 * Map SumUp checkout status to the internal payment status.
 */
export function mapSumUpStatusToPaymentStatus(
  sumupStatus: SumUpCheckoutStatus | string
): "paid" | "unpaid" | "refunded" {
  switch (sumupStatus) {
    case "PAID":
      return "paid";
    case "REFUNDED":
      return "refunded";
    default:
      return "unpaid";
  }
}

/**
 * Map SumUp checkout status to the internal appointment status.
 */
export function mapSumUpStatusToAppointmentStatus(
  sumupStatus: SumUpCheckoutStatus | string
): "paid" | "pending" | "cancelled" {
  switch (sumupStatus) {
    case "PAID":
      return "paid";
    case "FAILED":
    case "EXPIRED":
      return "cancelled";
    default:
      return "pending";
  }
}

/**
 * Build the hosted checkout redirect URL from a checkout ID.
 */
export function getSumUpHostedCheckoutUrl(checkoutId: string): string {
  return `https://pay.sumup.com/b2c/${checkoutId}`;
}

/**
 * Generate a unique checkout reference for an appointment.
 */
export function buildCheckoutReference(appointmentId: string): string {
  const short = appointmentId.replace(/-/g, "").slice(0, 12).toUpperCase();
  const ts = Date.now().toString(36).toUpperCase();
  return `LOUBNA-${short}-${ts}`;
}
