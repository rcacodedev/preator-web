import Link from "next/link";

export default function HomePage() {
  const trust = [
    { t: "Seguridad", d: "Buenas prácticas y trazabilidad desde el minuto 1." },
    {
      t: "Multi-empresa",
      d: "Organizaciones y roles para trabajar con orden.",
    },
    { t: "Datos claros", d: "Operativa y KPIs para decidir con calma." },
    { t: "Soporte", d: "Email directo para resolver dudas." },
  ];

  return (
    <div className="space-y-12">
      <section className="card">
        <span className="badge-accent">PREATOR</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Una herramienta online para gestionar tu empresa con control y
          claridad.
        </h1>
        <p className="mt-4 max-w-2xl text-base muted sm:text-lg">
          Ventas, compras, inventario, facturación y KPIs en una sola app.
          Diseñada para trabajar rápido, con roles, auditoría y una interfaz
          limpia.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link href="/alta" className="btn btn-accent">
            Darte de alta
          </Link>
          <Link href="/tour" className="btn btn-ghost">
            Ver tour
          </Link>
          <Link href="/precios" className="btn btn-primary">
            Ver precios
          </Link>
        </div>

        <p className="mt-4 text-sm muted">
          Nota: PREATOR no sustituye a tu asesoría. Para decisiones fiscales,
          consulta a tu gestor.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {trust.map((x) => (
          <div key={x.t} className="card-compact">
            <div className="font-semibold">{x.t}</div>
            <p className="mt-2 text-sm muted">{x.d}</p>
          </div>
        ))}
      </section>

      <section className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold">
            Elige un plan y empieza en minutos
          </h2>
          <p className="mt-2 text-sm muted max-w-2xl">
            Precios sin IVA. El IVA se calcula en el checkout según tu dirección
            fiscal.
          </p>
        </div>
        <Link href="/precios" className="btn btn-accent">
          Ver precios
        </Link>
      </section>
    </div>
  );
}
