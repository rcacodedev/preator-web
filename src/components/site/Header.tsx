import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ borderColor: "var(--border)", background: "var(--bg)" }}
    >
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="font-bold tracking-tight">
          PREATOR
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          <Link href="/tour" className="muted hover:!text-[var(--fg)]">
            Tour
          </Link>
          <Link href="/precios" className="muted hover:!text-[var(--fg)]">
            Precios
          </Link>
          <Link href="/seguridad" className="muted hover:!text-[var(--fg)]">
            Seguridad
          </Link>
          <Link href="/gestor" className="muted hover:!text-[var(--fg)]">
            Gestor
          </Link>
          <Link href="/contacto" className="muted hover:!text-[var(--fg)]">
            Contacto
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="https://app.preator.es" className="btn btn-ghost">
            Entrar
          </a>
          <Link href="/alta" className="btn btn-primary">
            Empezar
          </Link>
        </div>
      </div>
    </header>
  );
}
