"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAltaWizard } from "../AltaProvider";
import { orgSlugAvailable } from "@/lib/preatorApi";
import { slugify } from "@/lib/altaWizard";

async function pickAvailableSlug(base: string) {
  const root = slugify(base) || "org";
  // 1 intento con el root + 6 intentos con sufijo aleatorio
  for (let i = 0; i < 7; i++) {
    const candidate =
      i === 0 ? root : `${root}-${Math.floor(1000 + Math.random() * 9000)}`;
    const res = await orgSlugAvailable(candidate);
    if (res.available) return candidate;
  }
  throw new Error("No se pudo generar un identificador interno disponible.");
}

export default function AltaEmpresaPage() {
  const router = useRouter();
  const { state, setState } = useAltaWizard();

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    // autocompletar billing_email con email si vacío
    if (!state.billing_email && state.email) {
      setState((s) => ({ ...s, billing_email: s.email }));
    }
  }, [state.billing_email, state.email, setState]);

  async function next(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);

    if (!state.legal_name.trim()) return setErr("Falta el nombre fiscal.");
    if (!state.tax_id.trim()) return setErr("Falta NIF/CIF.");
    if (!state.billing_email.includes("@"))
      return setErr("Email de facturación inválido.");
    if (!state.org_display_name.trim())
      return setErr("Falta el nombre de tu empresa/organización.");

    setLoading(true);
    try {
      const slug = await pickAvailableSlug(
        state.org_display_name || state.legal_name
      );
      setState((s) => ({ ...s, org_slug: slug }));
      router.push("/alta/plan");
    } catch (ex: any) {
      setErr(ex?.message || "No se pudo continuar.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Empresa y fiscal</h1>
      <p className="text-white/70">Paso 2/4: Datos fiscales y organización.</p>

      <form
        onSubmit={next}
        className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3"
      >
        <div className="grid gap-2">
          <label className="text-sm text-white/80">Tipo</label>
          <select
            className="rounded-lg border border-white/10 bg-black/20 px-3 py-2"
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
          <label className="text-sm text-white/80">Nombre fiscal</label>
          <input
            className="rounded-lg border border-white/10 bg-black/20 px-3 py-2"
            value={state.legal_name}
            onChange={(e) =>
              setState((s) => ({ ...s, legal_name: e.target.value }))
            }
            required
          />
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm text-white/80">NIF/CIF</label>
            <input
              className="rounded-lg border border-white/10 bg-black/20 px-3 py-2"
              value={state.tax_id}
              onChange={(e) =>
                setState((s) => ({ ...s, tax_id: e.target.value }))
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-white/80">
              Email de facturación
            </label>
            <input
              className="rounded-lg border border-white/10 bg-black/20 px-3 py-2"
              type="email"
              value={state.billing_email}
              onChange={(e) =>
                setState((s) => ({ ...s, billing_email: e.target.value }))
              }
              required
            />
          </div>
        </div>

        <hr className="my-2 border-white/10" />

        <div className="grid gap-2">
          <label className="text-sm text-white/80">Nombre de tu empresa</label>
          <input
            className="rounded-lg border border-white/10 bg-black/20 px-3 py-2"
            value={state.org_display_name}
            onChange={(e) =>
              setState((s) => ({ ...s, org_display_name: e.target.value }))
            }
            required
          />
          <p className="text-xs text-white/50">
            (El identificador interno lo generamos nosotros automáticamente.)
          </p>
        </div>

        {err ? <p className="text-sm text-red-300">{err}</p> : null}

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="rounded-lg border border-white/10 px-4 py-2 hover:bg-white/5"
            onClick={() => router.push("/alta/cuenta")}
            disabled={loading}
          >
            Atrás
          </button>
          <button
            className="rounded-lg bg-white px-4 py-2 text-black disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Comprobando..." : "Continuar"}
          </button>
        </div>
      </form>
    </div>
  );
}
