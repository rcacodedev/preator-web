"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAltaWizard } from "../AltaProvider";
import { registerAndCheckout } from "@/lib/preatorApi";

const PRICES = {
  starter: { m: 29, y: 296, label: "Starter" },
  pro: { m: 59, y: 602, label: "Pro" },
  business: { m: 99, y: 1010, label: "Business" },
} as const;

function isValidEmail(email: string) {
  const v = (email || "").trim();
  return v.includes("@") && v.includes(".");
}

function getErrorMessage(ex: unknown): string {
  if (ex instanceof Error) return ex.message;
  if (typeof ex === "string") return ex;
  try {
    return JSON.stringify(ex);
  } catch {
    return "Error desconocido";
  }
}

export default function AltaPagoPage() {
  const router = useRouter();
  const { state } = useAltaWizard();

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);

  const summary = useMemo(() => {
    const orgName = (state.org_display_name || "").trim() || "Tu empresa";
    const planInfo = PRICES[state.plan] || PRICES.starter;
    const period =
      state.billing_period === "yearly" ? "Anual (−15%)" : "Mensual";
    const amount = state.billing_period === "yearly" ? planInfo.y : planInfo.m;
    const amountLabel = `${amount}€ ${
      state.billing_period === "yearly" ? "/año" : "/mes"
    }`;
    return { orgName, planInfo, period, amountLabel };
  }, [state.org_display_name, state.plan, state.billing_period]);

  function validateBeforePay() {
    if (!isValidEmail(state.email)) return "Email inválido.";
    if (!state.password || state.password.length < 8)
      return "La contraseña debe tener al menos 8 caracteres.";
    if (!state.first_name || !state.last_name)
      return "Falta nombre y apellidos.";
    if (!state.phone) return "Falta el teléfono.";

    if (!state.legal_name || !state.tax_id) return "Faltan datos fiscales.";
    if (!isValidEmail(state.billing_email))
      return "Email de facturación inválido.";
    if (!state.org_display_name) return "Falta el nombre de empresa.";
    if (!state.org_slug)
      return "Falta el identificador interno de la organización.";

    if (!state.plan) return "Falta plan.";
    if (!state.billing_period) return "Falta periodo.";
    if (!accepted)
      return "Debes aceptar los términos y la política de privacidad.";

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
      if (!res?.checkout_url)
        throw new Error("No se devolvió la URL de Stripe.");
      window.location.assign(res.checkout_url);
    } catch (ex: unknown) {
      setErr(getErrorMessage(ex) || "No se pudo iniciar el pago.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5 motion-in">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Pago</h1>
        <p className="muted">
          Paso 4/4 · Te redirigimos a Stripe para completar el pago.
        </p>
      </div>

      <div className="card space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="card-compact">
            <p className="text-sm muted">Empresa</p>
            <p className="text-lg font-semibold">{summary.orgName}</p>
          </div>
          <div className="card-compact">
            <p className="text-sm muted">Plan</p>
            <p className="text-lg font-semibold">{summary.planInfo.label}</p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="card-compact">
            <p className="text-sm muted">Periodo</p>
            <p className="text-lg font-semibold">{summary.period}</p>
          </div>
          <div className="card-compact">
            <p className="text-sm muted">Importe</p>
            <p className="text-lg font-semibold">{summary.amountLabel}</p>
            <p className="text-xs muted mt-1">
              Precios sin IVA. IVA calculado en checkout.
            </p>
          </div>
        </div>

        <div className="alert text-sm">
          <p className="muted">
            Te llevamos a <b>Stripe</b> para pagar de forma segura. PREATOR no
            guarda tus datos de tarjeta.
          </p>
        </div>

        <label className="flex gap-3 text-sm items-start">
          <input
            type="checkbox"
            className="mt-1"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <span className="muted">
            He leído y acepto los{" "}
            <Link className="link-accent" href="/legal/terminos">
              términos
            </Link>{" "}
            y la{" "}
            <Link className="link-accent" href="/legal/privacidad">
              política de privacidad
            </Link>
            .
          </span>
        </label>

        {err ? (
          <div
            className="alert alert-error text-sm"
            style={{ whiteSpace: "pre-line" }}
          >
            <b>Error:</b> {err}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
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
            {loading ? "Abriendo Stripe…" : "Ir a Stripe"}
          </button>
        </div>

        <p className="muted text-xs">
          Para dudas, escribe a{" "}
          <a className="link-accent" href="mailto:soporte@preator.es">
            soporte@preator.es
          </a>
          .
        </p>
      </div>
    </div>
  );
}
