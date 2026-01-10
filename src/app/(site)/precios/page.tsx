import Link from "next/link";

export default function PreciosPage() {
  const plans = [
    {
      name: "Starter",
      priceM: "29€",
      priceY: "319€",
      desc: "Para autónomos que quieren control y claridad.",
      bullets: [
        "2 usuarios",
        "1–2 almacenes",
        "Ventas + Compras + Inventario",
        "KPIs básicos",
      ],
      cta: "Elegir Starter",
    },
    {
      name: "Pro",
      priceM: "59€",
      priceY: "649€",
      desc: "Para equipos pequeños que necesitan ir más rápido.",
      bullets: [
        "10 usuarios",
        "3–5 almacenes",
        "KPIs PRO + export",
        "Más control y permisos",
      ],
      cta: "Elegir Pro",
      highlight: true,
    },
    {
      name: "Business",
      priceM: "99€",
      priceY: "1089€",
      desc: "Para empresas con operativa y varios almacenes.",
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
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Planes simples. Sin letra pequeña rara.
        </h1>
        <p className="mt-3 muted max-w-2xl">
          Mensual o anual (con 1 mes gratis). IVA no incluido. Si tienes dudas,
          te ayudamos a elegir plan.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/alta" className="btn btn-accent">
            Empezar
          </Link>
          <Link href="/contacto" className="btn btn-ghost">
            Hablar con soporte
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
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
              </div>
              <div className="mt-1 muted">
                Anual: <b>{p.priceY}</b> (1 mes gratis)
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
              Nota: PREATOR no sustituye a tu asesoría. Para decisiones
              fiscales, consulta a tu gestor.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
