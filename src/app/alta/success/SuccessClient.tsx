"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAltaWizard } from "../AltaProvider";

export function SuccessClient() {
  const sp = useSearchParams();
  const sessionId = sp.get("session_id");
  const { reset } = useAltaWizard();

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="card space-y-4 motion-in">
      <h1 className="text-2xl font-bold">¡Pago completado!</h1>
      <p className="muted">
        Tu suscripción está en marcha. Si tarda unos segundos en reflejarse, es
        normal: depende del webhook de Stripe.
      </p>

      {sessionId ? (
        <div className="card-compact">
          <p className="text-xs muted">Referencia Stripe</p>
          <p className="text-xs font-mono">{sessionId}</p>
        </div>
      ) : null}

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
