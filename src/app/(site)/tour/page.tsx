import Link from "next/link";

export default function TourPage() {
  const blocks = [
    {
      t: "Ventas y facturación",
      d: "Presupuesto → pedido → albarán → factura. PDFs listos para enviar.",
    },
    {
      t: "Compras y proveedores",
      d: "Pedidos, facturas de proveedor y pagos. Todo trazado.",
    },
    {
      t: "Inventario",
      d: "Productos, almacenes y movimientos de stock. Control real, sin suposiciones.",
    },
    {
      t: "Usuarios y permisos",
      d: "Invita a tu equipo por email, asigna roles y desactiva accesos sin perder histórico.",
    },
    {
      t: "KPIs PRO",
      d: "Ingresos, top clientes, pendientes e IVA básico con export.",
    },
    {
      t: "Seguridad y auditoría",
      d: "Roles, acciones registradas y recordatorios claros: para fiscalidad, consulta a tu gestor.",
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
        {blocks.map((b) => (
          <div key={b.t} className="card-compact">
            <h3 className="font-semibold">{b.t}</h3>
            <p className="mt-2 text-sm muted">{b.d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
