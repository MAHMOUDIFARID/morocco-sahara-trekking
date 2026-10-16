export const MAX_CONTACT_BYTES = 24_000;
export const INQUIRY_TYPES = ["Trek", "Général", "Sur-mesure", "Famille", "Autre"] as const;

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  country: string;
  inquiryType: string;
  message: string;
  newsletter: boolean;
}

export function validateContact(value: unknown): ContactMessage | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;
  const limits = { name: 161, email: 254, phone: 40, country: 100, inquiryType: 30, message: 5000 };
  const fields: Record<string, string> = {};
  for (const [key, maxLength] of Object.entries(limits)) {
    const input = body[key];
    if (input !== undefined && typeof input !== "string") return null;
    const text = typeof input === "string" ? input.trim() : "";
    if (text.length > maxLength || (key !== "message" && /[\r\n\u0000]/.test(text))) return null;
    fields[key] = text;
  }
  if (!fields.name || !fields.message || !/^[^\s@<>(),;:"\\]+@[^\s@<>(),;:"\\]+\.[^\s@<>(),;:"\\]+$/.test(fields.email)) return null;
  if (fields.inquiryType && !INQUIRY_TYPES.some((type) => type === fields.inquiryType)) return null;
  if (body.newsletter !== undefined && typeof body.newsletter !== "boolean") return null;
  return {
    name: fields.name,
    email: fields.email.toLowerCase(),
    phone: fields.phone,
    country: fields.country,
    inquiryType: fields.inquiryType || "Général",
    message: fields.message,
    newsletter: body.newsletter === true,
  };
}

export function escapeHtml(value: string): string {
  const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return value.replace(/[&<>"']/g, (character) => entities[character]);
}

export async function readContactBody(request: Request): Promise<unknown> {
  if (Number(request.headers.get("content-length")) > MAX_CONTACT_BYTES) throw new Error("BODY_TOO_LARGE");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("INVALID_JSON");
  const decoder = new TextDecoder();
  let length = 0;
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_CONTACT_BYTES) {
        await reader.cancel();
        throw new Error("BODY_TOO_LARGE");
      }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } finally {
    reader.releaseLock();
  }
}

// Limits apply within each Node process. Hosts with multiple replicas should also
// enforce a shared limit at their reverse proxy. IP headers must be overwritten by that proxy.
export function createContactLimiter() {
  const buckets = new Map<string, { count: number; resetAt: number }>();
  const windowMs = 15 * 60 * 1000;
  return (limits: { key: string; max: number }[], now = Date.now()): number => {
    buckets.forEach((bucket, key) => {
      if (bucket.resetAt <= now) buckets.delete(key);
    });
    const blocked = limits.find(({ key, max }) => (buckets.get(key)?.count || 0) >= max);
    if (blocked) return Math.ceil((buckets.get(blocked.key)!.resetAt - now) / 1000);
    limits.forEach(({ key }) => {
      const bucket = buckets.get(key) || { count: 0, resetAt: now + windowMs };
      bucket.count += 1;
      buckets.set(key, bucket);
    });
    return 0;
  };
}
