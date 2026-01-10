"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAltaWizard } from "../AltaProvider";

export default function AltaSuccessPage() {
  const sp = useSearchParams();
  const sessionId = sp.get("session_id");
  const { reset } = useAltaWizard();

  useEffect(() => {
    // limpiamos wizard al completar
    reset();
  }, [reset]);

  return (
    <div className="card space-y-3">
      <h1 className="text-2xl font-bold">¡Pago completado!</h1>
      <p className="muted">
        Tu suscripción está en marcha. Si tarda unos segundos en reflejarse, es
        normal: depende del webhook de Stripe.
      </p>

      {sessionId ? (
        <p className="text-xs muted">
          session_id: <span className="font-mono">{sessionId}</span>
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3 pt-2">
        <a
          href="https://app.preator.es"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Entrar en la app
        </a>
        <Link href="/contacto" className="card py-2">
          Contactar soporte
        </Link>
      </div>
    </div>
  );
}
