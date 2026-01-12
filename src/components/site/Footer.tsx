import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="container py-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="text-lg font-bold tracking-tight">
              PREATOR
            </Link>
            <p className="mt-3 text-sm muted max-w-sm">
              Herramienta online para gestionar ventas, compras, inventario y
              facturación con control y claridad.
            </p>
            <p className="mt-4 text-sm muted">
              Soporte:{" "}
              <a className="link-accent" href="mailto:soporte@preator.es">
                soporte@preator.es
              </a>
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <div className="text-sm font-semibold">Producto</div>
                <div className="mt-3 grid gap-2 text-sm">
                  <Link className="muted hover:!text-[var(--fg)]" href="/tour">
                    Tour
                  </Link>
                  <Link
                    className="muted hover:!text-[var(--fg)]"
                    href="/precios"
                  >
                    Precios
                  </Link>
                  <Link
                    className="muted hover:!text-[var(--fg)]"
                    href="/seguridad"
                  >
                    Seguridad
                  </Link>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold">Recursos</div>
                <div className="mt-3 grid gap-2 text-sm">
                  <Link className="muted hover:!text-[var(--fg)]" href="/ayuda">
                    Ayuda
                  </Link>
                  <Link
                    className="muted hover:!text-[var(--fg)]"
                    href="/contacto"
                  >
                    Contacto
                  </Link>
                  <Link
                    className="muted hover:!text-[var(--fg)]"
                    href="/gestor"
                  >
                    Consulta a tu gestor
                  </Link>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold">Legal</div>
                <div className="mt-3 grid gap-2 text-sm">
                  <Link
                    className="muted hover:!text-[var(--fg)]"
                    href="/legal/privacidad"
                  >
                    Privacidad
                  </Link>
                  <Link
                    className="muted hover:!text-[var(--fg)]"
                    href="/legal/terminos"
                  >
                    Términos
                  </Link>
                  <Link
                    className="muted hover:!text-[var(--fg)]"
                    href="/legal/cookies"
                  >
                    Cookies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hr mt-10" />

        <div className="mt-6 flex flex-col gap-2 text-xs muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} PREATOR. Todos los derechos reservados.</span>
          <span>
            PREATOR no sustituye a tu asesoría. Para decisiones fiscales,
            consulta a tu gestor.
          </span>
        </div>
      </div>
    </footer>
  );
}
