import Link from "next/link";

export default function AyudaPage() {
  return (
    <div className="space-y-10">
      <section className="card">
        <span className="badge-accent">Ayuda</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Documentación y guía rápida
        </h1>
        <p className="mt-3 muted max-w-2xl">
          Respuestas claras para empezar rápido. Si no encuentras algo,
          escríbenos y te ayudamos.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/alta" className="btn btn-accent">
            Empezar
          </Link>
          <Link href="/contacto" className="btn btn-ghost">
            Contactar soporte
          </Link>
        </div>
      </section>

      <section className="card-compact" id="usuarios-y-permisos">
        <h2 className="text-xl font-bold">Usuarios y permisos</h2>
        <p className="mt-3 text-sm muted max-w-3xl">
          En PREATOR, cada persona entra con su propio email y contraseña. Eso
          es un “usuario”. Los permisos se gestionan por rol (por ejemplo:
          owner, admin, manager, member, viewer).
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card-compact">
            <div className="font-semibold">¿Qué cuenta como usuario?</div>
            <p className="mt-2 text-sm muted">
              Una persona con acceso activo a tu empresa en PREATOR.
            </p>
          </div>

          <div className="card-compact">
            <div className="font-semibold">¿Puedo invitar a mi equipo?</div>
            <p className="mt-2 text-sm muted">
              Sí, según tu plan. Pro permite hasta 10 usuarios y Business hasta
              25.
            </p>
          </div>

          <div className="card-compact">
            <div className="font-semibold">¿Qué pasa si alguien se va?</div>
            <p className="mt-2 text-sm muted">
              Desactivas el acceso y se conserva el histórico (facturas,
              movimientos, auditoría).
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm muted">
          Nota: PREATOR no sustituye a tu asesoría. Para decisiones fiscales,
          consulta a tu gestor.
        </p>
      </section>

      <section className="card-compact">
        <h2 className="text-xl font-bold">Primeros pasos</h2>
        <ol className="mt-3 space-y-2 text-sm muted">
          <li>1) Crea tu cuenta y tu empresa.</li>
          <li>2) Configura datos básicos y tu primer almacén.</li>
          <li>3) Crea productos y contactos.</li>
          <li>4) Empieza a facturar y revisa tus KPIs.</li>
        </ol>
      </section>
    </div>
  );
}
