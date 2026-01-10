"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAltaWizard } from "../AltaProvider";
import { registerAndCheckout } from "@/lib/preatorApi";

export default function AltaPagoPage() {
  const router = useRouter();
  const { state } = useAltaWizard();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function goStripe() {
    setErr(null);
    setLoading(true);
    try {
      const res = await registerAndCheckout({
        email: state.email,
        password: state.password,
        first_name: state.first_name,
        last_name: state.last_name,
        phone: state.phone,

        entity_type: state.entity_type,
        legal_name: state.legal_name,
        tax_id: state.tax_id,
        billing_email: state.billing_email,

        org_display_name: state.org_display_name,
        org_slug: state.org_slug,

        plan: state.plan,
        billing_period: state.billing_period,
        source: state.source || "web-f13",
      });

      window.location.assign(res.checkout_url);
    } catch (ex: any) {
      setErr(ex?.message || "No se pudo iniciar el pago.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Pago</h1>
      <p className="text-black/70">Paso 4/4: Serás redirigido a Stripe.</p>

      <div className="rounded-2xl border p-6 space-y-4">
        <div className="rounded-xl bg-black/5 p-4 text-sm">
          <p className="font-medium">Resumen</p>
          <p className="mt-1 text-black/70">
            <b>{state.org_display_name}</b> · slug{" "}
            <span className="font-mono">{state.org_slug}</span>
          </p>
          <p className="mt-1 text-black/70">
            Plan <b>{state.plan}</b> ·{" "}
            {state.billing_period === "monthly" ? "Mensual" : "Anual"}
          </p>
          <p className="mt-2 text-xs text-black/50">
            Stripe pedirá dirección de facturación. Después podrás entrar en la
            app.
          </p>
        </div>

        {err ? <p className="text-sm text-red-700">{err}</p> : null}

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="rounded-lg border px-4 py-2"
            onClick={() => router.push("/alta/plan")}
            disabled={loading}
          >
            Atrás
          </button>
          <button
            type="button"
            className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60"
            onClick={goStripe}
            disabled={loading}
          >
            {loading ? "Redirigiendo..." : "Ir a Stripe"}
          </button>
        </div>
      </div>
    </div>
  );
}
