import Link from "next/link";

export default function AltaCancelPage() {
  return (
    <div className="card space-y-4 motion-in">
      <h1 className="text-2xl font-bold">Pago cancelado</h1>
      <p className="muted">
        No pasa nada. Puedes volver a intentarlo cuando quieras. Si te dio
        error, escríbenos y lo miramos.
      </p>

      <div className="flex flex-wrap gap-2">
        <Link href="/alta/plan" className="btn btn-accent">
          Reintentar
        </Link>
        <Link href="/contacto" className="btn btn-ghost">
          Contactar soporte
        </Link>
        <Link href="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>

      <p className="muted text-xs">
        Soporte:{" "}
        <a className="link-accent" href="mailto:soporte@preator.es">
          soporte@preator.es
        </a>
      </p>
    </div>
  );
}
