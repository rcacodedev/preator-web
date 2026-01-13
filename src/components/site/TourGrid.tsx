import Link from "next/link";
import { TourCard } from "./TourCard";

type TourModule = {
  title: string;
  desc: string;
  points: readonly string[];
  href: string;
  highlight?: boolean;
  badge?: string;
};

const MODULES: readonly TourModule[] = [
  {
    title: "Contactos",
    desc: "Clientes, proveedores y empleados. Notas, adjuntos, eventos y trazabilidad.",
    points: ["Fichas claras", "Adjuntos y notas", "Historial por contacto"],
    href: "/tour#contactos",
  },
  {
    title: "Inventario",
    desc: "Productos, almacenes, stock y movimientos. Control sin complicaciones.",
    points: ["Stock y movimientos", "Almacenes", "Entradas y salidas"],
    href: "/tour#inventario",
  },
  {
    title: "Ventas y facturación",
    desc: "Presupuestos, pedidos, albaranes y facturas. Flujo natural.",
    points: ["Borradores → emitidas", "Cobros y estado", "PDF y exportación"],
    href: "/tour#ventas",
  },
  {
    title: "Compras",
    desc: "Pedidos, facturas proveedor y pagos. Preparado para crecer.",
    points: ["Recepciones", "Pagos y estado", "Integración con stock"],
    href: "/tour#compras",
  },
  {
    title: "KPIs y analítica",
    desc: "Ingresos, margen, pendientes, IVA básico y vistas por periodo.",
    points: ["Dashboards claros", "Filtros rápidos", "Export PDF/CSV"],
    href: "/tour#kpis",
  },
  {
    title: "Seguridad y confianza",
    desc: "Multi-tenant por organización, roles, auditoría y buenas prácticas.",
    points: ["Roles y permisos", "Auditoría", "Buenas prácticas 2026"],
    href: "/seguridad",
    highlight: true,
    badge: "Importante",
  },
];

export function TourGrid() {
  return (
    <section className="space-y-5">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Módulos</h2>
          <p className="muted text-sm">
            Un vistazo rápido a lo esencial. Luego, dentro de la app, todo
            encaja como piezas de Lego.
          </p>
        </div>

        <div className="card-compact text-xs muted lg:text-right">
          <p>
            ¿Tienes dudas?{" "}
            <Link href="/contacto" className="link-accent">
              Escríbenos
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {MODULES.map((m) => (
          <TourCard
            key={m.title}
            title={m.title}
            desc={m.desc}
            points={[...m.points]}
            href={m.href}
            highlight={m.highlight}
            badge={m.badge}
          />
        ))}
      </div>

      <div className="card-compact text-xs muted">
        Consejo: para decisiones fiscales y contables, consulta a tu gestor.
      </div>
    </section>
  );
}
