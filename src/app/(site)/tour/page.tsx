import Link from "next/link";

export default function TourPage() {
  const blocks = [
    {
      t: "Contactos",
      d: "Clientes, proveedores y empleados con todo su contexto.",
    },
    { t: "Inventario", d: "Productos, almacenes y movimientos de stock." },
    {
      t: "Ventas y facturación",
      d: "Presupuesto → pedido → albarán → factura. PDFs listos para enviar.",
    },
    { t: "Compras", d: "Pedidos a proveedor, facturas y pagos. Todo trazado." },
    { t: "KPIs", d: "Ingresos, pendientes, top clientes y exportación." },
    {
      t: "Usuarios y permisos",
      d: "Invita a tu equipo, asigna roles y desactiva accesos sin perder histórico.",
    },
    {
      t: "Seguridad y auditoría",
      d: "Roles, acciones registradas y recordatorio: consulta a tu gestor en fiscalidad.",
    },
  ];

  return (
    <div className="space-y-10">
      <section className="card">
        <span className="badge-accent">Tour</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Una app seria para gestionar tu negocio.
        </h1>
        <p className="mt-3 muted max-w-2xl">
          PREATOR une ventas, compras, inventario y analítica con una interfaz
          clara y rápida. Menos fricción, más orden.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/alta" className="btn btn-accent">
            Empezar ahora
          </Link>
          <Link href="/precios" className="btn btn-ghost">
            Ver precios
          </Link>
          <Link href="/ayuda#usuarios-y-permisos" className="btn btn-primary">
            Usuarios y permisos
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blocks.map((b) => {
          const highlight = b.t === "Usuarios y permisos";
          return (
            <div
              key={b.t}
              className={
                highlight ? "card hover-lift" : "card-compact hover-lift"
              }
              style={
                highlight
                  ? {
                      borderColor: "var(--accent)",
                      background: "var(--panel2)",
                    }
                  : undefined
              }
            >
              <h3 className="font-semibold">{b.t}</h3>
              <p className="mt-2 text-sm muted">{b.d}</p>
              {highlight ? (
                <p className="mt-3 text-xs muted">
                  Los límites de usuarios dependen del plan y se gestionan desde
                  el panel de control.
                </p>
              ) : null}
            </div>
          );
        })}
      </section>
    </div>
  );
}
