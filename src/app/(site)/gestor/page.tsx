import Link from "next/link";

export default function GestorPage() {
  return (
    <div className="space-y-10">
      <section className="card">
        <span className="badge-accent">Gestor</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          PREATOR y tu asesoría: sin dramas.
        </h1>
        <p className="mt-3 muted max-w-2xl">
          La app está pensada para que tu día a día sea fácil, y para que luego
          puedas compartir información clara cuando toque presentar o revisar.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/alta" className="btn btn-accent">
            Empezar
          </Link>
          <Link href="/contacto" className="btn btn-ghost">
            Hablar con soporte
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="card-compact">
          <h3 className="font-semibold">Export y control</h3>
          <p className="mt-2 text-sm muted">
            Exporta listados y KPIs para revisar números con tu gestor sin
            perseguir facturas sueltas.
          </p>
        </div>
        <div className="card-compact">
          <h3 className="font-semibold">Avisos “consulta a tu gestor”</h3>
          <p className="mt-2 text-sm muted">
            Donde hay interpretación fiscal, PREATOR te lo recuerda. La app
            ayuda, no inventa la ley.
          </p>
        </div>
      </section>
    </div>
  );
}
