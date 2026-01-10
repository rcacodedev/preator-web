const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:8000";

async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
  const method = (init?.method || "GET").toUpperCase();
  const hasBody = init?.body !== undefined && init?.body !== null;

  const headers: Record<string, string> = {
    ...(init?.headers || {}),
  };

  // Solo setear Content-Type cuando mandas body
  if (hasBody && method !== "GET" && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg =
      data && (data.detail || data.error)
        ? data.detail || data.error
        : `HTTP ${res.status}`;
    throw new Error(msg);
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
