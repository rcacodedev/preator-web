"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAltaWizard } from "../AltaProvider";
import { orgSlugAvailable } from "@/lib/preatorApi";
import { slugify } from "@/lib/altaWizard";

async function pickAvailableSlug(base: string) {
  const root = slugify(base) || "org";

  for (let i = 0; i < 7; i++) {
    const candidate =
      i === 0 ? root : `${root}-${Math.floor(1000 + Math.random() * 9000)}`;

    const res = await orgSlugAvailable(candidate);
    if (res.available) return candidate;
  }

  throw new Error(
    "No hemos podido generar un identificador interno disponible. Prueba con otro nombre."
  );
}

export default function AltaEmpresaPage() {
  const router = useRouter();
  const { state, setState } = useAltaWizard();

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    // Autocompleta billing_email con email si está vacío
    if (!state.billing_email && state.email) {
      setState((s) => ({ ...s, billing_email: s.email }));
    }
  }, [state.billing_email, state.email, setState]);

  async function next(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);

    const legal_name = (state.legal_name || "").trim();
    const tax_id = (state.tax_id || "").trim();
    const billing_email = (state.billing_email || "").trim();
    const org_display_name = (state.org_display_name || "").trim();

    if (!legal_name) return setErr("Falta el nombre fiscal.");
    if (!tax_id) return setErr("Falta NIF/CIF.");
    if (!billing_email || !billing_email.includes("@"))
      return setErr("Email de facturación inválido.");
    if (!org_display_name)
      return setErr("Falta el nombre de tu empresa/organización.");

    setLoading(true);

    try {
      const slug = await pickAvailableSlug(org_display_name || legal_name);
      setState((s) => ({ ...s, org_slug: slug }));
      router.push("/alta/plan");
    } catch (ex: any) {
      setErr(ex?.message || "No se pudo continuar.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Empresa y fiscal</h1>
        <p className="muted mt-1">Paso 2/4: datos fiscales y organización.</p>
      </div>

      <form onSubmit={next} className="card space-y-4">
        <div className="grid gap-2">
          <label className="label">Tipo</label>
          <select
            className="select"
            value={state.entity_type}
            onChange={(e) =>
              setState((s) => ({ ...s, entity_type: e.target.value as any }))
            }
          >
            <option value="autonomo">Autónomo</option>
            <option value="empresa">Empresa</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label className="label">Nombre fiscal</label>
          <input
            className="input"
            value={state.legal_name}
            onChange={(e) =>
              setState((s) => ({ ...s, legal_name: e.target.value }))
            }
            placeholder="Tu nombre o razón social"
            required
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="label">NIF/CIF</label>
            <input
              className="input"
              value={state.tax_id}
              onChange={(e) =>
                setState((s) => ({ ...s, tax_id: e.target.value }))
              }
              placeholder="B12345678"
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="label">Email de facturación</label>
            <input
              className="input"
              type="email"
              value={state.billing_email}
              onChange={(e) =>
                setState((s) => ({ ...s, billing_email: e.target.value }))
              }
              placeholder="facturacion@tuempresa.com"
              required
            />
          </div>
        </div>

        <hr className="hr" />

        <div className="grid gap-2">
          <label className="label">Nombre de tu empresa</label>
          <input
            className="input"
            value={state.org_display_name}
            onChange={(e) =>
              setState((s) => ({ ...s, org_display_name: e.target.value }))
            }
            placeholder="Ej. Talleres García"
            required
          />
          <p className="muted text-xs">
            El identificador interno lo generamos automáticamente. No tendrás
            que elegirlo.
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

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => router.push("/alta/cuenta")}
            disabled={loading}
          >
            Atrás
          </button>

          <button className="btn btn-accent" disabled={loading}>
            {loading ? "Comprobando..." : "Continuar"}
          </button>
        </div>
      </form>

      <p className="muted text-xs">
        Consejo: si ya usaste el mismo nombre antes, cambia un poco el nombre de
        empresa para generar un identificador interno distinto.
      </p>
    </div>
  );
}
