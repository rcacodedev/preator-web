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

  const modules = [
    {
      t: "Contactos",
      d: "Clientes, proveedores y empleados con todo su contexto.",
    },
    { t: "Inventario", d: "Productos, almacenes y movimientos de stock." },
    { t: "Ventas", d: "Presupuestos, pedidos, albaranes y facturas." },
    { t: "Compras", d: "Pedidos a proveedor, facturas y pagos." },
    { t: "KPIs", d: "Ingresos, pendientes, top clientes y exportación." },
    {
      t: "Usuarios y permisos",
      d: "Invita a tu equipo, roles y acceso controlado.",
    },
  ];

  return (
    <div className="space-y-12">
      {/* HERO */}
      <section className="card motion-in">
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

      {/* TRUST */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {trust.map((x, i) => (
          <div
            key={x.t}
            className="card-compact hover-lift"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="font-semibold">{x.t}</div>
            <p className="mt-2 text-sm muted">{x.d}</p>
          </div>
        ))}
      </section>

      {/* MODULES */}
      <section className="card-compact">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Todo lo que necesitas, en un flujo lógico
            </h2>
            <p className="mt-2 text-sm muted max-w-2xl">
              Módulos conectados para que no tengas que “coser” herramientas.
              Menos fricción, más orden.
            </p>
          </div>
          <Link href="/tour" className="btn btn-ghost">
            Ver el tour completo
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <div key={m.t} className="card-compact hover-lift">
              <div className="font-semibold">{m.t}</div>
              <p className="mt-2 text-sm muted">{m.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA PRICING */}
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

      {/* SUPPORT */}
      <section className="card-compact">
        <h3 className="font-semibold">¿Tienes dudas?</h3>
        <p className="mt-2 text-sm muted max-w-3xl">
          Escríbenos y te ayudamos a elegir plan, preparar tu alta o resolver
          cualquier duda de uso.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link href="/contacto" className="btn btn-primary">
            Contacto
          </Link>
          <Link href="/ayuda" className="btn btn-ghost">
            Ir a Ayuda
          </Link>
        </div>
      </section>
    </div>
  );
}
