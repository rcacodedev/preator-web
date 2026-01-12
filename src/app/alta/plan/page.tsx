"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAltaWizard } from "../AltaProvider";

type Plan = {
  code: "starter" | "pro" | "business";
  name: string;
  desc: string;
  priceM: number;
  priceY: number;
  bullets: string[];
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    code: "starter",
    name: "Starter",
    desc: "Para autónomos que quieren control y claridad.",
    priceM: 29,
    priceY: 296,
    bullets: [
      "1 usuario",
      "1–2 almacenes",
      "Ventas + Compras + Inventario",
      "KPIs básicos",
    ],
  },
  {
    code: "pro",
    name: "Pro",
    desc: "Para pequeñas empresas que necesitan equipo y permisos.",
    priceM: 59,
    priceY: 602,
    bullets: [
      "10 usuarios",
      "3–5 almacenes",
      "KPIs PRO + export",
      "Usuarios y permisos",
    ],
    highlight: true,
  },
  {
    code: "business",
    name: "Business",
    desc: "Para empresas con alta operatividad.",
    priceM: 99,
    priceY: 1010,
    bullets: [
      "25 usuarios",
      "10 almacenes",
      "Operativa completa",
      "Prioridad soporte",
    ],
  },
];

export default function AltaPlanPage() {
  const router = useRouter();
  const { state, setState } = useAltaWizard();

  const selected = useMemo(
    () => PLANS.find((p) => p.code === state.plan) || PLANS[0],
    [state.plan]
  );

  return (
    <div className="space-y-6 motion-in">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Elige tu plan</h1>
        <p className="muted">Paso 3/4 · Plan y periodo.</p>
      </div>

      <div className="card-compact">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-sm muted">
            <b>Precios sin IVA.</b> El IVA se calcula en Stripe según tu
            dirección fiscal.
          </p>
          <p className="text-sm muted">
            Anual: <b>−15%</b> vs mensual × 12.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLANS.map((p) => {
          const isActive = p.code === state.plan;
          const isHighlight = p.highlight;
          return (
            <button
              key={p.code}
              type="button"
              onClick={() => setState((s) => ({ ...s, plan: p.code }))}
              className={
                (isActive ? "card" : "card-compact") + " text-left hover-lift"
              }
              style={
                isActive || isHighlight
                  ? {
                      borderColor: "var(--accent)",
                      background: "var(--panel2)",
                    }
                  : undefined
              }
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold">{p.name}</h3>
                {isHighlight ? (
                  <span className="badge-accent">Recomendado</span>
                ) : null}
              </div>

              <p className="mt-2 text-sm muted">{p.desc}</p>

              <div className="mt-5 text-sm">
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-extrabold">{p.priceM}€</div>
                  <div className="muted">/mes</div>
                </div>
                <div className="mt-1 muted">
                  Anual: <b>{p.priceY}€</b>{" "}
                  <span className="muted">(−15%)</span>
                </div>
              </div>

              <ul className="mt-5 space-y-2 text-sm">
                {p.bullets.map((b) => (
                  <li key={b} className="muted">
                    • {b}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <div className="card space-y-4">
        <div className="grid gap-2">
          <label className="label">Periodo de facturación</label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setState((s) => ({ ...s, billing_period: "monthly" }))
              }
              className={
                "pill " +
                (state.billing_period === "monthly" ? "pill-active" : "")
              }
            >
              Mensual
            </button>
            <button
              type="button"
              onClick={() =>
                setState((s) => ({ ...s, billing_period: "yearly" }))
              }
              className={
                "pill " +
                (state.billing_period === "yearly" ? "pill-active" : "")
              }
            >
              Anual (−15%)
            </button>
          </div>
          <p className="help">
            El pago se hace en Stripe. La gestión de plan y facturación se hace
            dentro de la app (F14).
          </p>
        </div>

        <div className="card-compact">
          <div className="text-sm muted">Resumen</div>
          <div className="mt-1 text-sm">
            <b>{selected.name}</b> ·{" "}
            {state.billing_period === "yearly" ? "Anual" : "Mensual"} ·{" "}
            <b>
              {state.billing_period === "yearly"
                ? selected.priceY
                : selected.priceM}
              €
            </b>
            <span className="muted">
              {" "}
              {state.billing_period === "yearly" ? "/año" : "/mes"} (+ IVA)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => router.push("/alta/empresa")}
          >
            Atrás
          </button>
          <button
            type="button"
            className="btn btn-accent"
            onClick={() => router.push("/alta/pago")}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
