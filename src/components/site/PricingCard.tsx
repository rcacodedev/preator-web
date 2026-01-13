import Link from "next/link";

function cn(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

export function PricingCard({
  code,
  name,
  description,
  monthlyLabel,
  yearlyLabel,
  highlight,
  badge,
  users,
  warehouses,
  bullets,
  featuredPriceLabel,
}: {
  code: "starter" | "pro" | "business";
  name: string;
  description: string;
  monthlyLabel: string;
  yearlyLabel: string;
  highlight?: boolean;
  badge?: string;
  users: string;
  warehouses: string;
  bullets: string[];
  featuredPriceLabel?: string;
}) {
  const ctaHref = "/alta/cuenta";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-[var(--card)] p-5 shadow-sm transition",
        "border-[var(--border)] hover:shadow-md",
        "hover:-translate-y-0.5 will-change-transform",
        highlight ? "ring-1 ring-[var(--accent)]" : ""
      )}
    >
      {highlight ? (
        <div className="pointer-events-none absolute -top-24 right-[-60px] h-56 w-56 rounded-full bg-[var(--accent)]/10 blur-2xl" />
      ) : null}

      <div className="relative space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{name}</h3>
              {badge ? (
                <span className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-2 py-0.5 text-[11px] text-[var(--muted)]">
                  {badge}
                </span>
              ) : null}
            </div>
            <p className="muted text-sm">{description}</p>
          </div>

          {featuredPriceLabel ? (
            <span className="hidden rounded-full border border-[var(--border)] bg-[var(--bg)] px-2 py-1 text-[11px] text-[var(--muted)] sm:inline">
              {featuredPriceLabel}
            </span>
          ) : null}
        </div>

        <div className="grid gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs muted">Mensual</p>
              <p className="text-2xl font-bold leading-none">{monthlyLabel}</p>
            </div>
            <p className="muted text-xs">+ IVA</p>
          </div>

          <div className="flex items-end justify-between border-t border-[var(--border)] pt-2">
            <div>
              <p className="text-xs muted">
                Anual <span className="text-[var(--accent)]">−15%</span>
              </p>
              <p className="text-lg font-semibold leading-none">
                {yearlyLabel}
              </p>
            </div>
            <p className="muted text-xs">+ IVA</p>
          </div>

          <p className="muted text-[11px]">IVA calculado en Stripe Checkout.</p>
        </div>

        <div className="grid gap-2 text-sm">
          <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2">
            <span className="muted">Usuarios</span>
            <span className="font-medium">{users}</span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2">
            <span className="muted">Almacenes</span>
            <span className="font-medium">{warehouses}</span>
          </div>
        </div>

        <ul className="space-y-2 pt-1 text-sm">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span className="text-[var(--fg)]/90">{b}</span>
            </li>
          ))}
        </ul>

        <div className="pt-2">
          <Link
            href={ctaHref}
            className={cn(
              "btn w-full justify-center",
              highlight ? "btn-accent" : "btn-primary"
            )}
          >
            Empezar
          </Link>
          <p className="mt-2 text-center text-[11px] muted">
            Gestión dentro de la app · Usuarios desde “Usuarios y permisos”
          </p>
        </div>

        <div className="card-compact text-[11px] muted">
          Para decisiones fiscales o contables, consulta a tu gestor.
        </div>

        <span className="sr-only">{code}</span>
      </div>
    </div>
  );
}
