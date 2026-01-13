import { ContactForm } from "./ContactForm";

export const metadata = {
  title: "Contacto | PREATOR",
  description:
    "Soporte y contacto. Escríbenos y te respondemos lo antes posible.",
};

export default function ContactoPage() {
  return (
    <div className="space-y-10 motion-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Contacto</h1>
        <p className="muted max-w-2xl">
          ¿Dudas, soporte o quieres hablar de un plan a medida? Escríbenos y te
          respondemos. También puedes escribir directamente a{" "}
          <b>soporte@preator.es</b>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="card">
          <ContactForm />
        </div>

        <aside className="space-y-3">
          <div className="card-compact">
            <p className="text-sm font-semibold">Soporte</p>
            <p className="muted text-sm">
              Email: <b>soporte@preator.es</b>
            </p>
            <p className="muted text-sm">
              Horario: L–V (España) · respondemos lo antes posible.
            </p>
          </div>

          <div className="card-compact">
            <p className="text-sm font-semibold">Antes de escribir</p>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="text-[var(--fg)]/90">
                  Si es sobre <b>usuarios y permisos</b>, mira{" "}
                  <a className="link-accent" href="/ayuda#usuarios-y-permisos">
                    esta sección
                  </a>
                  .
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="text-[var(--fg)]/90">
                  Si es sobre facturación, revisa <b>Precios</b> y el checkout
                  de Stripe.
                </span>
              </li>
            </ul>
          </div>

          <div className="card-compact text-xs muted">
            <b>Nota:</b> PREATOR es una herramienta de gestión. Para decisiones
            fiscales o contables, consulta a tu gestor.
          </div>
        </aside>
      </div>
    </div>
  );
}
