"use client";

import Link from "next/link";

export default function AltaCancelPage() {
  return (
    <div className="rounded-2xl border p-8 space-y-3">
      <h1 className="text-2xl font-bold">Pago cancelado</h1>
      <p className="text-black/70">
        No pasa nada. Puedes volver a intentarlo cuando quieras.
      </p>

      <div className="flex flex-wrap gap-3 pt-2">
        <Link
          href="/alta/plan"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Volver al plan
        </Link>
        <Link href="/contacto" className="rounded-lg border px-4 py-2">
          Contactar soporte
        </Link>
      </div>
    </div>
  );
}
