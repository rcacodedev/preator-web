import Link from "next/link";

export default function PreciosPage() {
  const plans = [
    {
      name: "Starter",
      priceM: "29€",
      priceY: "296€",
      desc: "Para autónomos que quieren control y claridad.",
      bullets: [
        "1 usuario",
        "1–2 almacenes",
        "Ventas + Compras + Inventario",
        "KPIs básicos",
      ],
      cta: "Elegir Starter",
    },
    {
      name: "Pro",
      priceM: "59€",
      priceY: "602€",
      desc: "Para pequeñas empresas, que necesitan gestionar diferentes departamentos.",
      bullets: [
        "10 usuarios",
        "3–5 almacenes",
        "KPIs PRO + export",
        "Usuarios y permisos",
      ],
      cta: "Elegir Pro",
      highlight: true,
    },
    {
      name: "Business",
      priceM: "99€",
      priceY: "1010€",
      desc: "Para empresas con una alta operatividad.",
      bullets: [
        "25 usuarios",
        "10 almacenes",
        "Operativa completa",
        "Prioridad soporte",
      ],
      cta: "Elegir Business",
    },
  ];

  return (
    <div className="space-y-10">
      <section className="card">
        <span className="badge-accent">Precios</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Planes simples. Sin letra pequeña rara.
        </h1>
        <div className="card-compact">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p className="text-sm muted">
              <b>Precios sin IVA.</b> El IVA se calcula en el checkout según tu
              dirección fiscal.
            </p>
            <p className="text-sm muted">
              Plan anual: <b>−15%</b> vs mensual × 12.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/alta" className="btn btn-accent">
            Empezar
          </Link>
          <Link href="/ayuda#usuarios-y-permisos" className="btn btn-ghost">
            Usuarios y permisos
          </Link>
          <Link href="/contacto" className="btn btn-primary">
            Hablar con soporte
          </Link>
        </div>
      </section>

      <section className="card-compact" id="usuarios-y-permisos">
        <h2 className="text-lg font-bold">Usuarios y permisos</h2>
        <p className="mt-2 text-sm muted max-w-3xl">
          Un “usuario” es una persona con su propio email y contraseña dentro de
          tu empresa en PREATOR. Puedes invitar a tu equipo (según plan),
          asignar roles y desactivar accesos sin perder histórico.
        </p>
        <p className="mt-2 text-sm muted">
          Starter incluye <b>1 usuario</b>. Pro incluye hasta <b>10</b> y
          Business hasta <b>25</b>.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={p.highlight ? "card" : "card-compact"}
            style={
              p.highlight
                ? { borderColor: "var(--accent)", background: "var(--panel2)" }
                : undefined
            }
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">{p.name}</h3>
              {p.highlight ? (
                <span className="badge-accent">Recomendado</span>
              ) : null}
            </div>

            <p className="mt-2 text-sm muted">{p.desc}</p>

            <div className="mt-5 text-sm">
              <div className="flex items-end gap-2">
                <div className="text-3xl font-extrabold">{p.priceM}</div>
                <div className="muted">/mes</div>
                <p className="mt-2 text-xs muted">
                  + IVA (calculado en checkout)
                </p>
              </div>
              <div className="mt-1 muted">
                Anual: <b>{p.priceY}</b> <span className="muted">(−15%)</span>
              </div>
            </div>

            <ul className="mt-5 space-y-2 text-sm">
              {p.bullets.map((b) => (
                <li key={b} className="muted">
                  • {b}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Link
                href="/alta"
                className={
                  p.highlight
                    ? "btn btn-accent w-full"
                    : "btn btn-primary w-full"
                }
              >
                {p.cta}
              </Link>
            </div>

            <p className="mt-3 text-xs muted">
              PREATOR te ayuda a gestionar. Para decisiones fiscales, consulta a
              tu gestor.
            </p>
          </div>
        ))}
      </section>

      <section className="card-compact">
        <h3 className="font-semibold">Enterprise</h3>
        <p className="mt-2 text-sm muted max-w-3xl">
          Si necesitas requisitos especiales (multi-sede, onboarding guiado,
          integraciones a medida), hablamos y te preparamos un plan.
        </p>
        <div className="mt-4">
          <Link href="/contacto" className="btn btn-accent">
            Contactar
          </Link>
        </div>
      </section>
    </div>
  );
}
