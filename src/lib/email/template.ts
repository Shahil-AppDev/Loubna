// ─── Email Template System ─────────────────────────────────────
// Professional transactional email components for Loubna Abouz Manta
// Compatible Gmail / Outlook / Apple Mail — table-based, inline styles

export const EMAIL_COLORS = {
  bordeaux: "#7B1E2B",
  bordeauxLight: "#9A3B4A",
  bordeauxDark: "#5C1620",
  white: "#FFFFFF",
  background: "#F7F5F3",
  text: "#1A1A1A",
  textMuted: "#5C5550",
  border: "#E5E0DB",
  cardBg: "#FAF8F6",
  success: "#2D7A3E",
  warning: "#B8860B",
  error: "#8B1A1A",
} as const;

export const EMAIL_SIGNATURE = `Loubna Abouz Manta
Juriste en droit du travail
Prévention des risques professionnels`;

export const EMAIL_FOOTER_LEGAL =
  "Les informations fournies dans le cadre de cet échange ont une vocation informative et ne constituent pas une consultation juridique au sens de la réglementation applicable à la profession d'avocat.";

export const EMAIL_SITE_URL = "https://juriste-droit-du-travail.com";
export const EMAIL_SITE_NAME = "Loubna Abouz Manta";

// ─── Escape HTML ───────────────────────────────────────────────
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── Read env (strip quotes) ───────────────────────────────────
export function readEnv(name: string): string | undefined {
  const raw = process.env[name];
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

// ─── Format date ───────────────────────────────────────────────
export function formatAppointmentDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("fr-FR", {
      dateStyle: "full",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function formatAppointmentDateOnly(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", {
      dateStyle: "full",
    });
  } catch {
    return iso;
  }
}

export function formatAppointmentTimeOnly(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

// ─── Extract first name ────────────────────────────────────────
export function getFirstName(fullName: string): string {
  return fullName.split(" ")[0]?.trim() || fullName.trim();
}

// ─── EmailButton ───────────────────────────────────────────────
export function EmailButton(
  href: string,
  label: string,
  variant: "primary" | "outline" = "primary"
): string {
  const bg = variant === "primary" ? EMAIL_COLORS.bordeaux : EMAIL_COLORS.white;
  const color = variant === "primary" ? EMAIL_COLORS.white : EMAIL_COLORS.bordeaux;
  const border = variant === "primary" ? EMAIL_COLORS.bordeaux : EMAIL_COLORS.bordeaux;

  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px auto;">
    <tr>
      <td style="border-radius:6px;background:${bg};border:1px solid ${border};">
        <a href="${escapeHtml(href)}"
           style="display:inline-block;padding:14px 36px;font-family:Georgia,serif;font-size:15px;font-weight:600;color:${color};text-decoration:none;border-radius:6px;letter-spacing:0.3px;">
          ${escapeHtml(label)}
        </a>
      </td>
    </tr>
  </table>`;
}

// ─── EmailCard ─────────────────────────────────────────────────
export function EmailCard(content: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${EMAIL_COLORS.cardBg};border:1px solid ${EMAIL_COLORS.border};border-radius:8px;margin:20px 0;">
    <tr>
      <td style="padding:24px 28px;font-family:Georgia,serif;font-size:14px;line-height:1.8;color:${EMAIL_COLORS.text};">
        ${content}
      </td>
    </tr>
  </table>`;
}

// ─── EmailDivider ──────────────────────────────────────────────
export function EmailDivider(): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0;">
    <tr><td style="border-top:1px solid ${EMAIL_COLORS.border};font-size:0;line-height:0;">&nbsp;</td></tr>
  </table>`;
}

// ─── EmailInfoRow (for recap tables) ───────────────────────────
export function EmailInfoRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 0;color:${EMAIL_COLORS.textMuted};font-size:14px;width:160px;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:6px 0;color:${EMAIL_COLORS.text};font-size:14px;font-weight:600;">${escapeHtml(value)}</td>
  </tr>`;
}

// ─── EmailInfoTable ────────────────────────────────────────────
export function EmailInfoTable(rows: { label: string; value: string }[]): string {
  const rowsHtml = rows.map((r) => EmailInfoRow(r.label, r.value)).join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:16px 0;">
    ${rowsHtml}
  </table>`;
}

// ─── EmailLayout ───────────────────────────────────────────────
export function EmailLayout(
  preheader: string,
  bodyContent: string,
  options?: {
    headerColor?: string;
    headerTitle?: string;
  }
): string {
  const headerColor = options?.headerColor || EMAIL_COLORS.bordeaux;
  const headerTitle = options?.headerTitle || EMAIL_SITE_NAME;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${escapeHtml(headerTitle)}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background:${EMAIL_COLORS.background};font-family:Georgia,'Times New Roman',serif;-webkit-font-smoothing:antialiased;">

  <!-- Preheader (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;font-size:1px;line-height:1px;color:${EMAIL_COLORS.background};">
    ${escapeHtml(preheader)}
  </div>

  <!-- Wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${EMAIL_COLORS.background};">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <!-- Main container -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background:${EMAIL_COLORS.white};border-radius:10px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:${headerColor};padding:28px 32px;text-align:center;">
              <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.7);letter-spacing:1.5px;text-transform:uppercase;font-weight:600;">Juriste en droit du travail</p>
              <h1 style="margin:0;color:${EMAIL_COLORS.white};font-size:22px;font-weight:600;letter-spacing:0.3px;">${escapeHtml(headerTitle)}</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 8px;font-family:Georgia,serif;font-size:15px;line-height:1.8;color:${EMAIL_COLORS.text};">
              ${bodyContent}
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td style="padding:8px 40px 28px;font-family:Georgia,serif;font-size:15px;line-height:1.8;color:${EMAIL_COLORS.text};">
              ${EmailDivider()}
              <p style="margin:0;font-size:15px;line-height:1.8;">Bien cordialement,</p>
              <p style="margin:8px 0 0;font-size:15px;line-height:1.7;font-weight:600;color:${EMAIL_COLORS.bordeaux};">${EMAIL_SIGNATURE}</p>
              <p style="margin:4px 0 0;font-size:13px;color:${EMAIL_COLORS.textMuted};">
                <a href="${EMAIL_SITE_URL}" style="color:${EMAIL_COLORS.textMuted};text-decoration:none;">${EMAIL_SITE_URL}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 32px;background:${EMAIL_COLORS.cardBg};border-top:1px solid ${EMAIL_COLORS.border};">
              <p style="margin:0;font-size:11px;line-height:1.7;color:${EMAIL_COLORS.textMuted};text-align:center;">
                ${EMAIL_FOOTER_LEGAL}
              </p>
              <p style="margin:10px 0 0;font-size:11px;color:${EMAIL_COLORS.textMuted};text-align:center;">
                &copy; ${new Date().getFullYear()} ${EMAIL_SITE_NAME} — ${EMAIL_SITE_URL}
              </p>
            </td>
          </tr>

        </table>

        <!-- Spacer -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;">
          <tr><td style="height:20px;font-size:0;line-height:0;">&nbsp;</td></tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

// ─── Text version builder ──────────────────────────────────────
export function buildTextVersion(
  lines: string[]
): string {
  return [
    ...lines,
    "",
    "Bien cordialement,",
    EMAIL_SIGNATURE,
    EMAIL_SITE_URL,
    "",
    EMAIL_FOOTER_LEGAL,
  ].join("\n");
}
