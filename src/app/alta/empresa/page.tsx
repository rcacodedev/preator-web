"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAltaWizard, type EntityType } from "../AltaProvider";
import { orgSlugAvailable } from "@/lib/preatorApi";
import { slugify } from "@/lib/altaWizard";

type SlugStatus =
  | { kind: "idle" }
  | { kind: "checking" }
  | { kind: "available" }
  | { kind: "taken" }
  | { kind: "error"; message: string };

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  try {
    return JSON.stringify(e);
  } catch {
    return "Error desconocido";
  }
}

async function suggestAvailableSlug(base: string) {
  const root = slugify(base) || "org";
  for (let i = 0; i < 10; i++) {
    const candidate =
      i === 0 ? root : `${root}-${Math.floor(1000 + Math.random() * 9000)}`;
    const res = await orgSlugAvailable(candidate);
    if (res.available) return candidate;
  }
  throw new Error(
    "No hemos podido generar un identificador disponible. Prueba con otro nombre."
  );
}

function isValidEmail(v: string) {
  const s = (v || "").trim();
  return s.includes("@") && s.includes(".");
}

function asEntityType(v: string): EntityType {
  return v === "empresa" ? "empresa" : "autonomo";
}

export default function AltaEmpresaPage() {
  const router = useRouter();
  const { state, setState } = useAltaWizard();

  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [slugStatus, setSlugStatus] = useState<SlugStatus>({ kind: "idle" });

  const slugDirtyRef = useRef(false);

  useEffect(() => {
    if (!state.billing_email && state.email) {
      setState((s) => ({ ...s, billing_email: s.email }));
    }
  }, [state.billing_email, state.email, setState]);

  useEffect(() => {
    const name = (state.org_display_name || "").trim();
    if (!name) return;
    if (slugDirtyRef.current) return;
    const nextSlug = slugify(name);
    if (nextSlug && nextSlug !== state.org_slug) {
      setState((s) => ({ ...s, org_slug: nextSlug }));
    }
  }, [state.org_display_name, state.org_slug, setState]);

  useEffect(() => {
    const slug = (state.org_slug || "").trim().toLowerCase();
    if (!slug) {
      setSlugStatus({ kind: "idle" });
      return;
    }
    if (slug.length < 3) {
      setSlugStatus({ kind: "error", message: "Usa al menos 3 caracteres." });
      return;
    }

    setSlugStatus({ kind: "checking" });
    const t = window.setTimeout(async () => {
      try {
        const res = await orgSlugAvailable(slug);
        setSlugStatus(
          res.available ? { kind: "available" } : { kind: "taken" }
        );
      } catch (e: unknown) {
        setSlugStatus({
          kind: "error",
          message: getErrorMessage(e) || "No se pudo comprobar.",
        });
      }
    }, 380);

    return () => window.clearTimeout(t);
  }, [state.org_slug]);

  const canContinue = useMemo(() => {
    const okSlug = slugStatus.kind === "available";
    return (
      (state.legal_name || "").trim().length > 0 &&
      (state.tax_id || "").trim().length > 0 &&
      isValidEmail(state.billing_email) &&
      (state.org_display_name || "").trim().length > 0 &&
      (state.org_slug || "").trim().length >= 3 &&
      okSlug &&
      !loading
    );
  }, [
    state.legal_name,
    state.tax_id,
    state.billing_email,
    state.org_display_name,
    state.org_slug,
    slugStatus.kind,
    loading,
  ]);

  async function onSuggestSlug() {
    setErr(null);
    setLoading(true);
    try {
      const base =
        (state.org_display_name || "").trim() ||
        (state.legal_name || "").trim() ||
        "org";
      const s = await suggestAvailableSlug(base);
      slugDirtyRef.current = true;
      setState((st) => ({ ...st, org_slug: s }));
      setSlugStatus({ kind: "available" });
    } catch (e: unknown) {
      setErr(getErrorMessage(e) || "No se pudo sugerir un identificador.");
    } finally {
      setLoading(false);
    }
  }

  async function next(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);

    const legal_name = (state.legal_name || "").trim();
    const tax_id = (state.tax_id || "").trim();
    const billing_email = (state.billing_email || "").trim();
    const org_display_name = (state.org_display_name || "").trim();
    const org_slug = (state.org_slug || "").trim().toLowerCase();

    if (!legal_name) return setErr("Falta el nombre fiscal.");
    if (!tax_id) return setErr("Falta NIF/CIF.");
    if (!isValidEmail(billing_email))
      return setErr("Email de facturación inválido.");
    if (!org_display_name)
      return setErr("Falta el nombre de tu empresa/organización.");
    if (!org_slug || org_slug.length < 3)
      return setErr("El identificador debe tener 3+ caracteres.");

    setLoading(true);
    try {
      const res = await orgSlugAvailable(org_slug);
      if (!res.available) {
        setSlugStatus({ kind: "taken" });
        throw new Error("Ese identificador ya está en uso. Prueba otro.");
      }
      setState((s) => ({ ...s, org_slug }));
      router.push("/alta/plan");
    } catch (e: unknown) {
      setErr(getErrorMessage(e) || "No se pudo continuar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5 motion-in">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Empresa y facturación</h1>
        <p className="muted">Paso 2/4 · Datos fiscales y organización.</p>
      </div>

      <form onSubmit={next} className="card space-y-5">
        <div className="grid gap-2">
          <label className="label">Tipo</label>
          <select
            className="select"
            value={state.entity_type}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                entity_type: asEntityType(e.target.value),
              }))
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
            <p className="help">Puedes usar un email distinto al del login.</p>
          </div>
        </div>

        <hr className="hr" />

        <div className="grid gap-2">
          <label className="label">Nombre visible de tu empresa</label>
          <input
            className="input"
            value={state.org_display_name}
            onChange={(e) =>
              setState((s) => ({ ...s, org_display_name: e.target.value }))
            }
            placeholder="Ej. Talleres García"
            required
          />
          <p className="help">
            Este nombre es el que verá tu equipo dentro de PREATOR.
          </p>
        </div>

        <div className="grid gap-2">
          <label className="label">Identificador interno</label>

          <div className="grid gap-2 md:grid-cols-[1fr_auto]">
            <div className="relative">
              <input
                className="input"
                value={state.org_slug}
                onChange={(e) => {
                  slugDirtyRef.current = true;
                  setState((s) => ({
                    ...s,
                    org_slug: slugify(e.target.value),
                  }));
                }}
                placeholder="ej: talleres-garcia"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                required
              />

              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs muted">
                {slugStatus.kind === "checking" ? "Comprobando…" : null}
                {slugStatus.kind === "available" ? "Disponible" : null}
                {slugStatus.kind === "taken" ? "Ocupado" : null}
              </div>
            </div>

            <button
              type="button"
              className="btn btn-ghost md:self-start"
              onClick={onSuggestSlug}
              disabled={loading}
            >
              Sugerir
            </button>
          </div>

          <p className="help">
            Se usa en la URL de tu empresa. Ejemplo:{" "}
            <span className="font-mono">
              app.preator.es/t/{"{"}identificador{"}"}
            </span>
          </p>

          {slugStatus.kind === "error" ? (
            <div className="alert alert-error text-sm">
              {slugStatus.message}
            </div>
          ) : null}
        </div>

        {err ? (
          <div className="alert alert-error text-sm">
            <b>Error:</b> {err}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => router.push("/alta/cuenta")}
            disabled={loading}
          >
            Atrás
          </button>

          <button className="btn btn-accent" disabled={!canContinue}>
            Continuar
          </button>
        </div>
      </form>

      <div className="card-compact text-xs muted">
        <b>Nota:</b> PREATOR te ayuda a gestionar tu negocio. Para decisiones
        fiscales, consulta a tu asesoría.
      </div>
    </div>
  );
}
