"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  try {
    return JSON.stringify(e);
  } catch {
    return "No se pudo sincronizar el pago.";
  }
}

export function SuccessClient() {
  const sp = useSearchParams();
  const sessionId = sp.get("session_id");
  const { reset } = useAltaWizard();

  const ranRef = useRef(false);
  const [sync, setSync] = useState<SyncState>({ kind: "idle" });

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (!sessionId) return;
    if (ranRef.current) return;
    ranRef.current = true;

    setSync({ kind: "syncing" });
    checkoutComplete(sessionId)
      .then((r) => {
        setSync({ kind: "ok", status: r.status, plan: r.plan });
      })
      .catch((e) => {
        setSync({ kind: "error", message: getErr(e) });
      });
  }, [sessionId]);

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
        <div className="alert alert-error text-sm">
          <b>Error:</b> {sync.message}
          <div className="mt-1 text-xs muted">
            Si esto pasa en local, revisa que exista{" "}
            <span className="font-mono">/api/v1/public/checkout-complete/</span>{" "}
            en el backend y que{" "}
            <span className="font-mono">NEXT_PUBLIC_API_BASE_URL</span> apunte
            bien.
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2 pt-1">
        <a
          href="https://app.preator.es"
          className="btn btn-accent"
          rel="noreferrer"
        >
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
