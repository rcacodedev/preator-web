"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PricingCard } from "./PricingCard";
import { PricingToggle, type BillingPeriod } from "./PricingToggle";

type Plan = {
  code: "starter" | "pro" | "business";
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  highlight?: boolean;
  badge?: string;
  users: string;
  warehouses: string;
  bullets: string[];
};

const PLANS: Plan[] = [
  {
    code: "starter",
    name: "Starter",
    description:
      "Para autónomos y negocios pequeños que quieren orden y control.",
    monthly: 29,
    yearly: 296,
    users: "1 usuario",
    warehouses: "1–2 almacenes",
    bullets: [
      "Contactos (clientes, proveedores, empleados)",
      "Inventario y movimientos de stock",
      "Ventas y facturación (borradores → emitidas)",
      "Compras (pedidos, facturas, pagos)",
      "KPIs básicos y panel de control",
      "Soporte por email",
    ],
  },
  {
    code: "pro",
    name: "Pro",
    description:
      "La opción equilibrada para equipos que trabajan a diario con la app.",
    monthly: 59,
    yearly: 602,
    highlight: true,
    badge: "Recomendado",
    users: "Hasta 10 usuarios",
    warehouses: "3–5 almacenes",
    bullets: [
      "Todo lo de Starter",
      "Usuarios y permisos (roles, auditoría)",
      "KPIs PRO (ventas, compras, margen, IVA básico)",
      "Exportaciones CSV/PDF",
      "Integraciones (webhooks y email org)",
      "Prioridad en soporte",
    ],
  },
  {
    code: "business",
    name: "Business",
    description:
      "Para empresas con varios almacenes y más volumen de operaciones.",
    monthly: 99,
    yearly: 1010,
    users: "Hasta 25 usuarios",
    warehouses: "Hasta 10 almacenes",
    bullets: [
      "Todo lo de Pro",
      "Mayor capacidad de usuarios y almacenes",
      "Enforcement y controles avanzados",
      "Onboarding asistido",
      "SLA de soporte (según acuerdo)",
    ],
  },
];

function formatMoney(n: number) {
  return `${n}€`;
}

export function PricingSection() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  const periodLabel = period === "yearly" ? "Anual" : "Mensual";
  const helper = useMemo(() => {
    return period === "yearly"
      ? "Anual con −15% vs mensual × 12."
      : "Mensual flexible. Puedes cambiar de plan desde la app.";
  }, [period]);

  return (
    <section className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Planes</h2>
          <p className="muted text-sm">
            Precios <b>sin IVA</b> (+ IVA en checkout). {helper}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          <PricingToggle value={period} onChange={setPeriod} />
          <div className="card-compact text-xs muted">
            <p>
              ¿Necesitas Enterprise?{" "}
              <Link href="/contacto" className="link-accent">
                Hablemos
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {PLANS.map((p) => {
          const price = period === "yearly" ? p.yearly : p.monthly;
          const priceLabel =
            formatMoney(price) + (period === "yearly" ? "/año" : "/mes");
          return (
            <PricingCard
              key={p.code}
              code={p.code}
              name={p.name}
              description={p.description}
              monthlyLabel={formatMoney(p.monthly)}
              yearlyLabel={formatMoney(p.yearly)}
              highlight={p.highlight}
              badge={p.badge}
              users={p.users}
              warehouses={p.warehouses}
              bullets={p.bullets}
              // Extra: shown price label (top-right)
              featuredPriceLabel={`${periodLabel}: ${priceLabel}`}
            />
          );
        })}
      </div>

      <div className="card-compact text-xs muted">
        * Los límites se aplican por organización. Los usuarios cuentan como{" "}
        <b>memberships activos</b>. Puedes invitar desde{" "}
        <b>Usuarios y permisos</b>.
      </div>
    </section>
  );
}
