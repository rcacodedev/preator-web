import Link from "next/link";

function cn(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

export function LegalPdfPage({
  title,
  subtitle,
  pdfPath,
  fallbackText,
}: {
  title: string;
  subtitle: string;
  pdfPath: string;
  fallbackText: string;
}) {
  return (
    <div className="space-y-8 motion-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="muted max-w-3xl">{subtitle}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="card space-y-4">
          <p className="text-sm text-[var(--fg)]/90">{fallbackText}</p>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">
            <p className="text-sm font-semibold">Documento en PDF</p>
            <p className="muted mt-1 text-sm">
              Por transparencia, este documento se publica en PDF firmado por la
              asesoría/legal.
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <a
                className="btn btn-accent"
                href={pdfPath}
                target="_blank"
                rel="noreferrer"
              >
                Abrir PDF
              </a>
              <a className="btn btn-ghost" href={pdfPath} download>
                Descargar
              </a>
            </div>

            <p className="muted mt-3 text-xs">
              Si el PDF aún no está disponible, aparecerá un error 404: en ese
              caso, vuelve más tarde o escríbenos.
            </p>
          </div>

          <div className="card-compact text-xs muted">
            <b>Nota:</b> PREATOR es una herramienta de gestión. Para decisiones
            fiscales o contables, consulta a tu gestor.
          </div>
        </div>

        <aside className="space-y-3">
          <div className="card-compact">
            <p className="text-sm font-semibold">Enlaces legales</p>
            <div className="mt-2 grid gap-1">
              <Link
                className="rounded-xl px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--fg)]"
                href="/legal/privacidad"
              >
                Política de privacidad
              </Link>
              <Link
                className="rounded-xl px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--fg)]"
                href="/legal/terminos"
              >
                Términos y condiciones
              </Link>
              <Link
                className="rounded-xl px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--fg)]"
                href="/legal/cookies"
              >
                Política de cookies
              </Link>
            </div>
          </div>

          <div className="card-compact">
            <p className="text-sm font-semibold">¿Dudas?</p>
            <p className="muted text-sm">Escríbenos y te ayudamos.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/contacto" className="btn btn-primary">
                Contacto
              </Link>
              <a className="btn btn-ghost" href="mailto:soporte@preator.es">
                soporte@preator.es
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
