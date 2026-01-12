"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useAltaWizard } from "../AltaProvider";

function isValidEmail(email: string) {
  const v = (email || "").trim();
  return v.includes("@") && v.includes(".");
}

export default function AltaCuentaPage() {
  const router = useRouter();
  const { state, setState } = useAltaWizard();
  const [err, setErr] = useState<string | null>(null);

  const canContinue = useMemo(() => {
    return (
      isValidEmail(state.email) &&
      (state.password || "").length >= 8 &&
      (state.first_name || "").trim().length > 0 &&
      (state.last_name || "").trim().length > 0 &&
      (state.phone || "").trim().length > 0
    );
  }, [
    state.email,
    state.password,
    state.first_name,
    state.last_name,
    state.phone,
  ]);

  function next(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);

    if (!isValidEmail(state.email)) return setErr("Email inválido.");
    if (!state.password || state.password.length < 8)
      return setErr("La contraseña debe tener al menos 8 caracteres.");
    if (!state.first_name.trim()) return setErr("Falta el nombre.");
    if (!state.last_name.trim()) return setErr("Faltan los apellidos.");
    if (!state.phone.trim()) return setErr("Falta el teléfono.");

    router.push("/alta/empresa");
  }

  return (
    <div className="space-y-5 motion-in">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Crear cuenta</h1>
        <p className="muted">Paso 1/4 · Datos del propietario de la cuenta.</p>
      </div>

      <form onSubmit={next} className="card space-y-4">
        <div className="grid gap-2">
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            value={state.email}
            onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
            placeholder="tu@email.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="grid gap-2">
          <label className="label">Contraseña</label>
          <input
            className="input"
            type="password"
            value={state.password}
            onChange={(e) =>
              setState((s) => ({ ...s, password: e.target.value }))
            }
            placeholder="Mínimo 8 caracteres"
            autoComplete="new-password"
            required
          />
          <p className="help">
            Consejo: usa 12+ caracteres y una frase fácil de recordar.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="label">Nombre</label>
            <input
              className="input"
              value={state.first_name}
              onChange={(e) =>
                setState((s) => ({ ...s, first_name: e.target.value }))
              }
              autoComplete="given-name"
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="label">Apellidos</label>
            <input
              className="input"
              value={state.last_name}
              onChange={(e) =>
                setState((s) => ({ ...s, last_name: e.target.value }))
              }
              autoComplete="family-name"
              required
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label className="label">Teléfono</label>
          <input
            className="input"
            type="tel"
            value={state.phone}
            onChange={(e) => setState((s) => ({ ...s, phone: e.target.value }))}
            placeholder="+34 600 000 000"
            autoComplete="tel"
            required
          />
          <p className="help">
            Lo usamos para incidencias de cuenta y recuperación.
          </p>
        </div>

        {err ? (
          <div className="alert alert-error text-sm">
            <b>Error:</b> {err}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <Link className="btn btn-ghost" href="/">
            Volver
          </Link>

          <button className="btn btn-accent" disabled={!canContinue}>
            Continuar
          </button>
        </div>
      </form>

      <p className="muted text-xs">
        Al continuar, crearás una organización y podrás invitar a tu equipo
        desde “Usuarios y permisos”.
      </p>
    </div>
  );
}
