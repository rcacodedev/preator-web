import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="card">
        <h1 className="text-3xl font-bold tracking-tight">
          Gestiona tu empresa sin pelearte con Excel.
        </h1>
        <p className="mt-3 max-w-2xl muted">
          Ventas, compras, inventario, facturación y KPIs en una sola app.
          Multi-empresa, roles y auditoría.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/alta"
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Crear cuenta
          </Link>
          <Link href="/tour" className="rounded-lg border px-4 py-2">
            Ver tour
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            t: "Ventas & Facturación",
            d: "Presupuesto → pedido → albarán → factura.",
          },
          {
            t: "Compras & Stock",
            d: "Pedidos, facturas proveedor y movimientos.",
          },
          { t: "KPIs PRO", d: "Ingresos, márgenes, pendientes, IVA básico." },
        ].map((c) => (
          <div key={c.t} className="card">
            <h3 className="font-semibold">{c.t}</h3>
            <p className="mt-2 text-sm muted">{c.d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
