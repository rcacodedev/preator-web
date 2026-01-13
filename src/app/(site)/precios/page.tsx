import { PricingSection } from "@/components/site/PricingSection";

export const metadata = {
  title: "Precios | PREATOR",
  description:
    "Planes sencillos para gestionar tu negocio. Precios sin IVA. IVA calculado en Stripe Checkout.",
};

export default function PreciosPage() {
  return (
    <div className="space-y-10 motion-in">
      <div className="space-y-2 mt-2">
        <h1 className="text-3xl font-bold">Precios</h1>
        <p className="muted max-w-2xl">
          Elige un plan y empieza hoy. Precios <b>sin IVA</b>. El IVA se calcula
          en el checkout de Stripe según tu país (en España, 21%).
        </p>
      </div>

      <PricingSection />

      <div className="grid gap-3 md:grid-cols-2">
        <div className="card-compact">
          <p className="text-sm font-semibold">Impuestos (B2B)</p>
          <p className="muted text-sm">
            Mostramos precios sin IVA. En el checkout, Stripe calcula el IVA
            correspondiente. Para dudas fiscales, consulta a tu gestor.
          </p>
        </div>
        <div className="card-compact">
          <p className="text-sm font-semibold">Usuarios y límites</p>
          <p className="muted text-sm">
            Los límites por usuarios se basan en <b>memberships activos</b>{" "}
            (personas invitadas y activas en tu organización). Starter incluye 1
            usuario.
          </p>
        </div>
      </div>
    </div>
  );
}
