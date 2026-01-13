"use client";

import { useMemo } from "react";

function cn(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

export type BillingPeriod = "monthly" | "yearly";

export function PricingToggle({
  value,
  onChange,
}: {
  value: BillingPeriod;
  onChange: (v: BillingPeriod) => void;
}) {
  const items = useMemo(
    () =>
      [
        {
          key: "monthly" as const,
          label: "Mensual",
          hint: "Flexibilidad",
        },
        {
          key: "yearly" as const,
          label: "Anual",
          hint: "−15% (1 mes gratis aprox.)",
        },
      ] as const,
    []
  );

  return (
    <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-1">
      {items.map((it) => {
        const active = value === it.key;
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onChange(it.key)}
            className={cn(
              "group relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition",
              active
                ? "bg-[var(--bg)] text-[var(--fg)] shadow-sm"
                : "text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--fg)]"
            )}
            aria-pressed={active}
          >
            <span className="font-medium">{it.label}</span>
            <span className="hidden text-[11px] text-[var(--muted)] sm:inline">
              {it.hint}
            </span>
            {active ? (
              <span className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded bg-[var(--accent)]" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
