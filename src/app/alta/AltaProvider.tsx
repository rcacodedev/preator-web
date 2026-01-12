"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  loadAltaWizardState,
  saveAltaWizardState,
  type AltaWizardState,
} from "@/lib/altaWizard";

type Ctx = {
  state: AltaWizardState;
  setState: React.Dispatch<React.SetStateAction<AltaWizardState>>;
  reset: () => void;
};

const AltaContext = createContext<Ctx | null>(null);

function safeLoad(): AltaWizardState | null {
  if (typeof window === "undefined") return null;
  try {
    const loaded = loadAltaWizardState();
    return loaded ? loaded : null;
  } catch {
    return null;
  }
}

const DEFAULT_STATE: AltaWizardState = {
  // Si en tu lib existe `v`, lo ponemos aquí también (versionado del wizard)
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

  source: "preator-web",
};

export function AltaProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AltaWizardState>(
    () => safeLoad() ?? DEFAULT_STATE
  );

  // Sync to external system (localStorage)
  useEffect(() => {
    try {
      saveAltaWizardState(state);
    } catch {
      // ignore
    }
  }, [state]);

  const value = useMemo<Ctx>(() => {
    return {
      state,
      setState,
      reset: () => setState(DEFAULT_STATE),
    };
  }, [state]);

  return <AltaContext.Provider value={value}>{children}</AltaContext.Provider>;
}

export function useAltaWizard() {
  const ctx = useContext(AltaContext);
  if (!ctx) throw new Error("useAltaWizard must be used within AltaProvider");
  return ctx;
}

// Re-export tipos útiles para el resto de páginas
export type EntityType = AltaWizardState["entity_type"];
export type PlanCode = AltaWizardState["plan"];
export type BillingPeriod = AltaWizardState["billing_period"];
