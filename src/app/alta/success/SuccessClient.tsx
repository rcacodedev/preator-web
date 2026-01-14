"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAltaWizard } from "../AltaProvider";
import { checkoutComplete } from "@/lib/preatorApi";

type SyncState =
  | { kind: "idle" }
  | { kind: "syncing" }
  | { kind: "ok"; status: string; plan: string }
  | { kind: "error"; message: string };

function getErrMsg(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  try {
    return JSON.stringify(e);
  } catch {
    return "Error desconocido";
  }
}

function cn(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

export function SuccessClient() {
  const sp = useSearchParams();
  const sessionId = useMemo(() => (sp.get("session_id") || "").trim(), [sp]);

  const { reset } = useAltaWizard();
  const [sync, setSync] = useState<SyncState>({ kind: "idle" });

  // Limpia estado del wizard (bien)
  useEffect(() => {
    reset();
  }, [reset]);

  // Sync PRO: en DEV no dependemos del webhook para desbloquear
  useEffect(() => {
    if (!sessionId) {
      setSync({ kind: "error", message: "Falta session_id en la URL." });
      return;
    }

    let cancelled = false;

    (async () => {
      setSync({ kind: "syncing" });
      try {
        const data = await checkoutComplete(sessionId);
        if (cancelled) return;

        setSync({
          kind: "ok",
          status: data.status || "trialing",
          plan: data.plan || "unknown",
        });
      } catch (e: unknown) {
        if (cancelled) return;
        setSync({ kind: "error", message: getErrMsg(e) });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return (
    <div className="card space-y-4 motion-in">
      <h1 className="text-2xl font-bold">¡Pago completado!</h1>

      <p className="muted">
        Estamos activando tu suscripción. Si tarda unos segundos en reflejarse,
        es normal. En desarrollo, lo sincronizamos automáticamente.
      </p>

      {sessionId ? (
        <div className="card-compact">
          <p className="text-xs muted">Referencia Stripe</p>
          <p className="break-all text-xs font-mono">{sessionId}</p>
        </div>
      ) : null}

      <div
        className={cn(
          "rounded-xl border px-4 py-3 text-sm",
          sync.kind === "ok"
            ? "border-emerald-500/30 bg-emerald-500/10"
            : sync.kind === "error"
            ? "border-red-500/30 bg-red-500/10"
            : "border-[var(--border)] bg-[var(--card)]"
        )}
      >
        {sync.kind === "syncing" ? <span>Activando suscripción…</span> : null}

        {sync.kind === "ok" ? (
          <span>
            Suscripción activa: <b>{sync.status}</b> · Plan: <b>{sync.plan}</b>
          </span>
        ) : null}

        {sync.kind === "error" ? (
          <span>
            <b>Error:</b> {sync.message}
            <span className="block pt-1 text-xs muted">
              Si esto pasa en local, revisa que el backend tenga el endpoint{" "}
              <span className="font-mono">
                /api/v1/public/checkout-complete/
              </span>{" "}
              y que el <span className="font-mono">API_BASE</span> apunte bien.
            </span>
          </span>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        <a href="https://app.preator.es" className="btn btn-accent">
          Entrar en la app
        </a>
        <Link href="/ayuda" className="btn btn-ghost">
          Ver ayuda
        </Link>
        <Link href="/contacto" className="btn btn-primary">
          Contactar soporte
        </Link>
      </div>

      <p className="muted text-xs">
        Siguiente paso: dentro de la app ve a <b>Usuarios y permisos</b> para
        invitar a tu equipo.
      </p>
    </div>
  );
}
