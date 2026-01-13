import Link from "next/link";

function cn(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

export function DocsShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-8 motion-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle ? <p className="muted max-w-3xl">{subtitle}</p> : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-3">
            <div className="card-compact">
              <p className="text-sm font-semibold">Ayuda</p>
              <p className="muted text-xs">
                Respuestas rápidas para empezar. Si necesitas algo específico,
                escríbenos.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href="/contacto" className="btn btn-ghost">
                  Contacto
                </Link>
                <Link href="/precios" className="btn btn-primary">
                  Precios
                </Link>
              </div>
            </div>

            <DocNav />
          </div>
        </aside>

        <div className="space-y-6">{children}</div>
      </div>

      <div className="card-compact text-xs muted">
        <b>Nota:</b> PREATOR es una herramienta de gestión. Para decisiones
        fiscales o contables, consulta a tu gestor.
      </div>
    </div>
  );
}

export function DocNav() {
  const items = [
    { href: "#usuarios-y-permisos", label: "Usuarios y permisos" },
    { href: "#que-es-una-organizacion", label: "Organización" },
    { href: "#que-es-un-membership", label: "Membership" },
    { href: "#como-invitar", label: "Invitar usuarios" },
    { href: "#roles", label: "Roles" },
    { href: "#limites-y-planes", label: "Límites por plan" },
    { href: "#buenas-practicas", label: "Buenas prácticas" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <div className="card-compact">
      <p className="text-sm font-semibold">Índice</p>
      <div className="mt-2 grid gap-1">
        {items.map((it) => (
          <a
            key={it.href}
            href={it.href}
            className={cn(
              "rounded-xl px-3 py-2 text-sm text-[var(--muted)] transition hover:bg-[var(--bg)] hover:text-[var(--fg)]"
            )}
          >
            {it.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function DocSection({
  id,
  title,
  children,
  subtle,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  subtle?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-3">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">{title}</h2>
        {subtle ? <p className="muted text-sm">{subtle}</p> : null}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function Callout({
  title,
  children,
  variant = "info",
}: {
  title: string;
  children: React.ReactNode;
  variant?: "info" | "warn";
}) {
  const styles =
    variant === "warn"
      ? "border-[var(--accent)]/40 bg-[var(--accent)]/5"
      : "border-[var(--border)] bg-[var(--bg)]";

  return (
    <div className={cn("rounded-2xl border p-4", styles)}>
      <p className="text-sm font-semibold">{title}</p>
      <div className="mt-2 text-sm muted">{children}</div>
    </div>
  );
}

export function Steps({ items }: { items: string[] }) {
  return (
    <ol className="space-y-2">
      {items.map((s, idx) => (
        <li key={s} className="flex gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] text-xs font-semibold">
            {idx + 1}
          </span>
          <span className="text-sm text-[var(--fg)]/90">{s}</span>
        </li>
      ))}
    </ol>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {items.map((b) => (
        <li key={b} className="flex gap-2">
          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          <span className="text-[var(--fg)]/90">{b}</span>
        </li>
      ))}
    </ul>
  );
}
