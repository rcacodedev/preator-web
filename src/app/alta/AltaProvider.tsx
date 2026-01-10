"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AltaWizardState,
  clearAltaWizardState,
  defaultAltaWizardState,
  loadAltaWizardState,
  saveAltaWizardState,
} from "@/lib/altaWizard";

type Ctx = {
  state: AltaWizardState;
  setState: React.Dispatch<React.SetStateAction<AltaWizardState>>;
  reset: () => void;
};

const AltaCtx = createContext<Ctx | null>(null);

export function AltaProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AltaWizardState>(defaultAltaWizardState);

  useEffect(() => {
    const loaded = loadAltaWizardState();
    if (loaded) setState(loaded);
  }, []);

  useEffect(() => {
    // guardado simple (sin debounce por ahora, es pequeño)
    saveAltaWizardState(state);
  }, [state]);

  const value = useMemo<Ctx>(() => {
    return {
      state,
      setState,
      reset: () => {
        clearAltaWizardState();
        setState(defaultAltaWizardState);
      },
    };
  }, [state]);

  return <AltaCtx.Provider value={value}>{children}</AltaCtx.Provider>;
}

export function useAltaWizard() {
  const ctx = useContext(AltaCtx);
  if (!ctx)
    throw new Error("useAltaWizard must be used inside <AltaProvider />");
  return ctx;
}
