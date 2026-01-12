"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/tour", label: "Tour" },
  { href: "/precios", label: "Precios" },
  { href: "/ayuda", label: "Ayuda" },
  { href: "/seguridad", label: "Seguridad" },
  { href: "/gestor", label: "Gestor" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ borderColor: "var(--border)", background: "var(--bg)" }}
    >
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="btn btn-ghost md:hidden"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            Menú
          </button>

          <Link href="/" className="font-bold tracking-tight">
            PREATOR
          </Link>
        </div>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="muted hover:!text-[var(--fg)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://app.preator.es"
            className="btn btn-ghost hidden sm:inline-flex"
          >
            Entrar
          </a>
          <Link href="/alta" className="btn btn-accent">
            Empezar
          </Link>
        </div>
      </div>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-50 bg-black/40"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
          />
          <aside
            className="fixed right-0 top-0 z-50 h-full w-[82%] max-w-sm border-l p-4"
            style={{ borderColor: "var(--border)", background: "var(--bg)" }}
            aria-label="Menú"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">Navegación</span>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setOpen(false)}
              >
                Cerrar
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="card-compact block"
                  onClick={() => setOpen(false)}
                >
                  <div className="font-medium">{l.label}</div>
                </Link>
              ))}
            </div>

            <div className="mt-4 grid gap-2">
              <a
                href="https://app.preator.es"
                className="btn btn-ghost w-full"
                onClick={() => setOpen(false)}
              >
                Entrar
              </a>
              <Link
                href="/alta"
                className="btn btn-accent w-full"
                onClick={() => setOpen(false)}
              >
                Empezar
              </Link>
            </div>

            <p className="mt-4 text-xs muted">
              PREATOR es una herramienta de gestión. Para decisiones fiscales,
              consulta a tu gestor.
            </p>
          </aside>
        </>
      ) : null}
    </header>
  );
}
