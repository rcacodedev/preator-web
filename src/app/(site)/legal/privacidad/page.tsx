export default function PrivacidadPage() {
  return (
    <div className="space-y-10">
      <section className="card">
        <span className="badge-accent">Legal</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Política de privacidad
        </h1>
        <p className="mt-3 muted max-w-2xl">
          Aquí encontrarás cómo tratamos los datos y qué derechos tienes. El
          documento final se publicará en PDF.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a className="btn btn-accent" href="/legal/privacidad.pdf">
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
