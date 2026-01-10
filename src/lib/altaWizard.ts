export type BillingPeriod = "monthly" | "yearly";
export type PlanCode = "starter" | "pro" | "business";
export type EntityType = "autonomo" | "empresa";

export type AltaWizardState = {
  v: 1;

  // cuenta
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;

  // fiscal + org
  entity_type: EntityType;
  legal_name: string;
  tax_id: string;
  billing_email: string;

  org_display_name: string;
  org_slug: string;

  // plan
  plan: PlanCode;
  billing_period: BillingPeriod;

  // extras
  source?: string;
};

const KEY = "preator_alta_wizard_v1";

export const defaultAltaWizardState: AltaWizardState = {
  v: 1,

  email: "",
  password: "",
  first_name: "",
  last_name: "",
  phone: "",

  entity_type: "autonomo",
  legal_name: "",
  tax_id: "",
  billing_email: "",

  org_display_name: "",
  org_slug: "",

  plan: "starter",
  billing_period: "monthly",

  source: "web-f13",
};

export function loadAltaWizardState(): AltaWizardState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.v !== 1) return null;
    return parsed as AltaWizardState;
  } catch {
    return null;
  }
}

export function saveAltaWizardState(state: AltaWizardState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

export function clearAltaWizardState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

export function slugify(input: string) {
  return (input || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
