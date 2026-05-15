export const CONTACT_MAX_ATTACHMENTS_BYTES = 30 * 1024 * 1024;
export const CONTACT_MAX_FILES = 5;

export const CONTACT_ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

export const CONTACT_ACCEPT_ATTRIBUTE =
  ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp,.gif,.txt,application/pdf,image/*";

export type ContactAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export function validateContactFiles(files: File[]): string | null {
  if (files.length === 0) return null;
  if (files.length > CONTACT_MAX_FILES) {
    return `Maximum ${CONTACT_MAX_FILES} pièces jointes.`;
  }

  let total = 0;
  for (const file of files) {
    if (file.size === 0) {
      return `Le fichier « ${file.name} » est vide.`;
    }
    if (!CONTACT_ALLOWED_MIME_TYPES.has(file.type)) {
      return `Type de fichier non autorisé : ${file.name}`;
    }
    total += file.size;
    if (total > CONTACT_MAX_ATTACHMENTS_BYTES) {
      return `Taille totale maximale : ${formatBytes(CONTACT_MAX_ATTACHMENTS_BYTES)}.`;
    }
  }
  return null;
}

export async function parseContactAttachments(
  formData: FormData
): Promise<{ attachments: ContactAttachment[]; error: string | null }> {
  const entries = formData.getAll("piecesJointes");
  const files = entries.filter((e): e is File => e instanceof File && e.size > 0);

  const validationError = validateContactFiles(files);
  if (validationError) {
    return { attachments: [], error: validationError };
  }

  const attachments: ContactAttachment[] = [];
  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({
      filename: file.name,
      content: buffer,
      contentType: file.type || "application/octet-stream",
    });
  }

  return { attachments, error: null };
}
