export default function TerminosPage() {
  return (
    <div className="space-y-10">
      <section className="card">
        <span className="badge-accent">Legal</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Términos del servicio
        </h1>
        <p className="mt-3 muted max-w-2xl">
          Condiciones de uso, suscripción y responsabilidades. El documento
          final se publicará en PDF.
        </p>

        <section className="card-compact">
          <h2 className="text-lg font-bold">Qué encontrarás en el PDF</h2>
          <ul className="mt-3 space-y-2 text-sm muted">
            <li>• Finalidad del tratamiento y base legal.</li>
            <li>• Derechos del usuario y cómo ejercerlos.</li>
            <li>• Conservación, seguridad y terceros.</li>
          </ul>
        </section>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a className="btn btn-accent" href="/legal/terminos.pdf">
            Ver PDF
          </a>
          <a className="btn btn-ghost" href="/contacto">
            Contacto
          </a>
        </div>
      </section>
    </div>
  );
}
