"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAltaWizard } from "../AltaProvider";
import { checkoutComplete } from "@/lib/preatorApi";

type SyncState =
  | { kind: "idle" }
  | { kind: "syncing" }
  | { kind: "ok"; status: string; plan: string }
  | { kind: "error"; message: string };

function getErr(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  return "No se pudo sincronizar el pago.";
}

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
  "https://app.preator.es";

export function SuccessClient() {
  const sp = useSearchParams();
  const sessionId = sp.get("session_id");
  const { reset } = useAltaWizard();

  const autoRanRef = useRef(false);
  const [sync, setSync] = useState<SyncState>({ kind: "idle" });

  useEffect(() => {
    // Dejamos el wizard limpio: ya hemos terminado alta/pago
    reset();
  }, [reset]);

  const doSync = useCallback(async () => {
    if (!sessionId) {
      setSync({
        kind: "error",
        message:
          "Falta session_id en la URL. Vuelve a Stripe Checkout o contacta soporte.",
      });
      return;
    }

    setSync({ kind: "syncing" });
    try {
      const r = await checkoutComplete(sessionId);
      setSync({ kind: "ok", status: r.status, plan: r.plan });
    } catch (e) {
      setSync({ kind: "error", message: getErr(e) });
    }
  }, [sessionId]);

  useEffect(() => {
    // Auto-sync solo 1 vez al aterrizar
    if (!sessionId) return;
    if (autoRanRef.current) return;
    autoRanRef.current = true;
    void doSync();
  }, [sessionId, doSync]);

  return (
    <div className="card space-y-4 motion-in">
      <h1 className="text-2xl font-bold">¡Pago completado!</h1>

      <p className="muted">
        Estamos activando tu suscripción. Si tarda unos segundos en reflejarse,
        es normal.
      </p>

      {sessionId ? (
        <div className="card-compact">
          <p className="text-xs muted">Referencia Stripe</p>
          <p className="text-xs font-mono">{sessionId}</p>
        </div>
      ) : null}

      {sync.kind === "syncing" ? (
        <div className="alert text-sm">Sincronizando con Stripe…</div>
      ) : null}

      {sync.kind === "ok" ? (
        <div className="alert alert-success text-sm">
          Suscripción activada: <b>{sync.plan}</b> · estado <b>{sync.status}</b>
        </div>
      ) : null}

      {sync.kind === "error" ? (
        <div className="alert alert-danger text-sm">
          <b>Error:</b> {sync.message}
          <div className="mt-2 text-xs muted space-y-1">
            <div>
              En local, revisa que exista{" "}
              <span className="font-mono">
                /api/v1/public/checkout-complete/
              </span>{" "}
              en el backend.
            </div>
            <div>
              Y que <span className="font-mono">NEXT_PUBLIC_API_BASE_URL</span>{" "}
              apunte bien (ej:{" "}
              <span className="font-mono">http://localhost:8000</span>).
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-accent"
              onClick={() => void doSync()}
            >
              Reintentar sincronización
            </button>
            <Link href="/alta/plan" className="btn btn-ghost">
              Volver al plan
            </Link>
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2 pt-1">
        <a className="btn btn-accent" href={APP_URL} rel="noreferrer">
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
