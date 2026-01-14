const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:8000";

function asRecord(v: unknown): Record<string, unknown> | null {
  if (typeof v !== "object" || v === null) return null;
  return v as Record<string, unknown>;
}

function normalizeHeaders(h?: HeadersInit): Record<string, string> {
  const out: Record<string, string> = {};
  if (!h) return out;

  // Headers instance
  if (typeof Headers !== "undefined" && h instanceof Headers) {
    h.forEach((value, key) => {
      out[key] = value;
    });
    return out;
  }

  // Array of tuples
  if (Array.isArray(h)) {
    for (const pair of h) {
      const [k, v] = pair;
      out[String(k)] = String(v);
    }
    return out;
  }

  // Plain object
  if (typeof h === "object") {
    for (const [k, v] of Object.entries(h as Record<string, string>)) {
      out[k] = String(v);
    }
  }

  return out;
}

function formatApiError(data: unknown, status: number): string {
  if (!data) return `HTTP ${status}`;
  if (typeof data === "string") return data;

  const obj = asRecord(data);
  if (obj) {
    const direct = obj.detail ?? obj.error ?? obj.message;
    if (typeof direct === "string" && direct.trim()) return direct;

    const lines: string[] = [];
    for (const [k, v] of Object.entries(obj)) {
      if (v == null) continue;
      if (Array.isArray(v)) {
        lines.push(`${k}: ${v.map(String).join(" ")}`);
      } else if (typeof v === "string") {
        lines.push(`${k}: ${v}`);
      } else {
        try {
          lines.push(`${k}: ${JSON.stringify(v)}`);
        } catch {
          lines.push(`${k}: error`);
        }
      }
    }
    if (lines.length) return lines.join("\n");
  }

  return `HTTP ${status}`;
}

async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
  const method = (init?.method || "GET").toUpperCase();
  const hasBody = init?.body !== undefined && init?.body !== null;

  const headers: Record<string, string> = {
    ...normalizeHeaders(init?.headers),
  };

  if (hasBody && method !== "GET" && !("Content-Type" in headers)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
  });

  const data: unknown = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(formatApiError(data, res.status));
  }
  return data as T;
}

export async function orgSlugAvailable(slug: string) {
  const s = (slug || "").trim().toLowerCase();
  return apiJson<{ available: boolean; slug: string }>(
    `/api/v1/public/org-slug-available/?slug=${encodeURIComponent(s)}`
  );
}

export async function sendContact(payload: {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
  website?: string; // honeypot
}) {
  return apiJson<{ ok: boolean }>(`/api/v1/public/contact/`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function registerAndCheckout(payload: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;

  entity_type: string;
  legal_name: string;
  tax_id: string;
  billing_email: string;

  org_display_name: string;
  org_slug: string;

  plan: "starter" | "pro" | "business";
  billing_period: "monthly" | "yearly";
  source?: string;
}) {
  return apiJson<{
    ok: boolean;
    checkout_url: string;
    organization: { slug: string; name: string };
  }>(`/api/v1/public/register-and-checkout/`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function checkoutComplete(session_id: string) {
  const res = await fetch(
    `${API_BASE}/api/v1/public/checkout-complete/?session_id=${encodeURIComponent(
      session_id
    )}`,
    { method: "GET" }
  );

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail || "No se pudo sincronizar el pago.");
  }
  return res.json() as Promise<{
    ok: boolean;
    status: string;
    plan: string;
    stripe_customer_id?: string;
    stripe_subscription_id?: string;
  }>;
}
