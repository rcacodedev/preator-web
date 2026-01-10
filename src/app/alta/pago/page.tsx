"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAltaWizard } from "../AltaProvider";
import { registerAndCheckout } from "@/lib/preatorApi";

function planLabel(plan: string) {
  if (plan === "starter") return "Starter";
  if (plan === "pro") return "Pro";
  if (plan === "business") return "Business";
  return plan;
}

function periodLabel(period: string) {
  return period === "yearly" ? "Anual (1 mes gratis)" : "Mensual";
}

export default function AltaPagoPage() {
  const router = useRouter();
  const { state } = useAltaWizard();

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const summary = useMemo(() => {
    const orgName = (state.org_display_name || "").trim() || "Tu empresa";
    const plan = planLabel(state.plan);
    const period = periodLabel(state.billing_period);

    return { orgName, plan, period };
  }, [state.org_display_name, state.plan, state.billing_period]);

  function validateBeforePay() {
    // Validaciones mínimas para evitar llamadas basura
    if (!state.email || !state.email.includes("@")) return "Email inválido.";
    if (!state.password || state.password.length < 8)
      return "La contraseña debe tener al menos 8 caracteres.";
    if (!state.first_name || !state.last_name)
      return "Falta nombre y apellidos.";
    if (!state.phone) return "Falta el teléfono.";

    if (!state.legal_name || !state.tax_id) return "Faltan datos fiscales.";
    if (!state.billing_email || !state.billing_email.includes("@"))
      return "Email de facturación inválido.";
    if (!state.org_display_name) return "Falta el nombre de empresa.";

    if (!state.org_slug)
      return "No tenemos identificador interno. Vuelve al paso anterior.";
    if (!state.plan) return "Falta plan.";
    if (!state.billing_period) return "Falta periodicidad.";

    return null;
  }

  async function goStripe() {
    setErr(null);

    const v = validateBeforePay();
    if (v) return setErr(v);

    setLoading(true);
    try {
      const payload = {
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

        source: "preator-web",
      } as const;

      const res = await registerAndCheckout(payload);

      if (!res?.checkout_url) {
        throw new Error(
          "No se ha devuelto la URL de Stripe. Intenta de nuevo."
        );
      }

      window.location.assign(res.checkout_url);
    } catch (ex: any) {
      setErr(ex?.message || "No se pudo iniciar el pago.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Pago</h1>
        <p className="muted mt-1">
          Paso 4/4: te redirigimos a Stripe para completar el pago.
        </p>
      </div>

      <div className="card space-y-4">
        <div className="space-y-1">
          <p className="text-sm muted">Empresa</p>
          <p className="text-lg font-semibold">{summary.orgName}</p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="card-compact">
            <p className="text-sm muted">Plan</p>
            <p className="text-lg font-bold">{summary.plan}</p>
          </div>
          <div className="card-compact">
            <p className="text-sm muted">Periodicidad</p>
            <p className="text-lg font-bold">{summary.period}</p>
          </div>
        </div>

        <div
          className="rounded-xl border p-3 text-sm"
          style={{ borderColor: "var(--border)", background: "var(--panel2)" }}
        >
          <p className="muted">
            Te llevamos a <b>Stripe</b> para pagar de forma segura. PREATOR no
            guarda tus datos de tarjeta.
          </p>
        </div>

        {err ? (
          <div
            className="rounded-xl border p-3 text-sm"
            style={{
              borderColor: "var(--accent)",
              background: "var(--accentSoft)",
            }}
          >
            <b>Error:</b> {err}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => router.push("/alta/plan")}
            disabled={loading}
          >
            Atrás
          </button>

          <button
            type="button"
            className="btn btn-accent"
            onClick={goStripe}
            disabled={loading}
          >
            {loading ? "Abriendo Stripe..." : "Ir a Stripe"}
          </button>
        </div>

        <p className="muted text-xs">
          Si cancelas el pago, podrás retomarlo desde la app cuando quieras.
        </p>
      </div>
    </div>
  );
}
