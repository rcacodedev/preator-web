import Link from "next/link";

export default function SeguridadPage() {
  const items = [
    {
      t: "Roles y permisos",
      d: "Acceso por organización y roles. Cada acción, con control.",
    },
    { t: "Auditoría", d: "Registro de eventos clave para trazabilidad." },
    {
      t: "Buenas prácticas web",
      d: "CORS/CSRF, rate limiting y saneamiento de entradas.",
    },
    {
      t: "Backups y continuidad",
      d: "Estrategia de copias y recuperación pensada para producción.",
    },
  ];

  return (
    <div className="space-y-10">
      <section className="card">
        <span className="badge-accent">Seguridad</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Serio por dentro. Limpio por fuera.
        </h1>
        <p className="mt-3 muted max-w-2xl">
          PREATOR está construido como SaaS multi-empresa con medidas de
          seguridad desde el diseño. Y aun así: si tu caso requiere cumplimiento
          específico, te orientamos.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contacto" className="btn btn-accent">
            Preguntar una duda
          </Link>
          <Link href="/tour" className="btn btn-ghost">
            Ver tour
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {items.map((i) => (
          <div key={i.t} className="card-compact">
            <h3 className="font-semibold">{i.t}</h3>
            <p className="mt-2 text-sm muted">{i.d}</p>
          </div>
        ))}
      </section>

      <section className="card-compact">
        <p className="text-sm muted">
          Importante: la información aquí es orientativa. Para requisitos
          legales/fiscales, consulta con tu asesor.
        </p>
      </section>
    </div>
  );
}
