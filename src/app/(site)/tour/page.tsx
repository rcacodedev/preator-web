import Link from "next/link";
import { TourGrid } from "@/components/site/TourGrid";

export const metadata = {
  title: "Tour | PREATOR",
  description: "Un recorrido rápido por los módulos clave de PREATOR.",
};

export default function TourPage() {
  return (
    <div className="space-y-10 motion-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Tour</h1>
        <p className="muted max-w-2xl">
          PREATOR es una herramienta online para gestionar tu empresa con
          claridad: contactos, inventario, ventas, compras y KPIs. Todo con un
          diseño limpio y orientado a trabajar rápido.
        </p>
      </div>

      <TourGrid />

      <div className="grid gap-3 md:grid-cols-2">
        <div className="card-compact">
          <p className="text-sm font-semibold">Usuarios y permisos</p>
          <p className="muted text-sm">
            Invita a tu equipo, asigna roles y controla accesos. Los límites del
            plan se aplican por <b>memberships activos</b>.
          </p>
        </div>
        <div className="card-compact">
          <p className="text-sm font-semibold">Nota fiscal</p>
          <p className="muted text-sm">
            PREATOR te ayuda a gestionar tu negocio, pero para decisiones
            fiscales o contables, consulta a tu gestor.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/alta/cuenta" className="btn btn-accent">
          Darse de alta
        </Link>
        <Link href="/precios" className="btn btn-ghost">
          Ver precios
        </Link>
      </div>
    </div>
  );
}
