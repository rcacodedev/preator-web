"use client";

import { useRouter } from "next/navigation";
import { useAltaWizard } from "../AltaProvider";

export default function AltaPlanPage() {
  const router = useRouter();
  const { state, setState } = useAltaWizard();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Elige tu plan</h1>
      <p className="text-black/70">Paso 3/4: Plan y periodo.</p>

      <div className="rounded-2xl border p-6 space-y-4">
        <div className="grid gap-2">
          <label className="text-sm">Plan</label>
          <select
            className="rounded-lg border px-3 py-2"
            value={state.plan}
            onChange={(e) =>
              setState((s) => ({ ...s, plan: e.target.value as any }))
            }
          >
            <option value="starter">Starter</option>
            <option value="pro">Pro</option>
            <option value="business">Business</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm">Periodo</label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setState((s) => ({ ...s, billing_period: "monthly" }))
              }
              className={[
                "rounded-full px-4 py-2 text-sm",
                state.billing_period === "monthly"
                  ? "bg-black text-white"
                  : "bg-black/5 hover:bg-black/10",
              ].join(" ")}
            >
              Mensual
            </button>
            <button
              type="button"
              onClick={() =>
                setState((s) => ({ ...s, billing_period: "yearly" }))
              }
              className={[
                "rounded-full px-4 py-2 text-sm",
                state.billing_period === "yearly"
                  ? "bg-black text-white"
                  : "bg-black/5 hover:bg-black/10",
              ].join(" ")}
            >
              Anual (1 mes gratis)
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-black/5 p-4 text-sm text-black/70">
          <p className="font-medium text-black">Resumen</p>
          <p className="mt-1">
            Plan: <b>{state.plan}</b> · Periodo: <b>{state.billing_period}</b>
          </p>
          <p className="mt-2 text-xs">
            El pago se hace en Stripe. La gestión de plan/portal irá dentro de
            la app (F14).
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="rounded-lg border px-4 py-2"
            onClick={() => router.push("/alta/empresa")}
          >
            Atrás
          </button>
          <button
            type="button"
            className="rounded-lg bg-black px-4 py-2 text-white"
            onClick={() => router.push("/alta/pago")}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
