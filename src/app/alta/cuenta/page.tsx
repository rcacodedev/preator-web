"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAltaWizard } from "../AltaProvider";

export default function AltaCuentaPage() {
  const router = useRouter();
  const { state, setState } = useAltaWizard();
  const [err, setErr] = useState<string | null>(null);

  function next(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);

    if (!state.email || !state.email.includes("@"))
      return setErr("Email inválido.");
    if (!state.password || state.password.length < 8)
      return setErr("La contraseña debe tener al menos 8 caracteres.");
    if (!state.first_name.trim()) return setErr("Falta el nombre.");
    if (!state.last_name.trim()) return setErr("Faltan los apellidos.");
    if (!state.phone.trim()) return setErr("Falta el teléfono.");

    router.push("/alta/empresa");
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Alta</h1>
      <p className="text-black/70">Paso 1/4: Datos de tu cuenta.</p>

      <form onSubmit={next} className="rounded-2xl border p-6 space-y-3">
        <div className="grid gap-2">
          <label className="text-sm">Email</label>
          <input
            className="rounded-lg border px-3 py-2"
            type="email"
            value={state.email}
            onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
            required
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm">Contraseña</label>
          <input
            className="rounded-lg border px-3 py-2"
            type="password"
            value={state.password}
            onChange={(e) =>
              setState((s) => ({ ...s, password: e.target.value }))
            }
            required
          />
          <p className="text-xs text-black/50">Mínimo 8 caracteres.</p>
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm">Nombre</label>
            <input
              className="rounded-lg border px-3 py-2"
              value={state.first_name}
              onChange={(e) =>
                setState((s) => ({ ...s, first_name: e.target.value }))
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Apellidos</label>
            <input
              className="rounded-lg border px-3 py-2"
              value={state.last_name}
              onChange={(e) =>
                setState((s) => ({ ...s, last_name: e.target.value }))
              }
              required
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm">Teléfono</label>
          <input
            className="rounded-lg border px-3 py-2"
            value={state.phone}
            onChange={(e) => setState((s) => ({ ...s, phone: e.target.value }))}
            required
          />
        </div>

        {err ? <p className="text-sm text-red-700">{err}</p> : null}

        <div className="flex justify-end">
          <button className="rounded-lg bg-black px-4 py-2 text-white">
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
}
