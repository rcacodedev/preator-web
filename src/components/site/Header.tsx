"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/tour", label: "Tour" },
  { href: "/precios", label: "Precios" },
  { href: "/ayuda", label: "Ayuda" },
  { href: "/seguridad", label: "Seguridad" },
  { href: "/gestor", label: "Gestor" },
  { href: "/contacto", label: "Contacto" },
];

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  // ESC closes
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // lock body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const links = useMemo(() => NAV_LINKS, []);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ borderColor: "var(--border)", background: "var(--bg)" }}
    >
      <div className="site-container mx-auto max-w-6xl flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          {/* Mobile menu: ONLY on <md */}
          <button
            type="button"
            className="btn btn-ghost md:hidden"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </button>

          <Link
            href="/"
            className="font-bold tracking-tight flex items-center gap-2"
          >
            <span>PREATOR</span>
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: "var(--accent)" }}
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 text-sm md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="muted hover:!text-[var(--fg)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions only (avoid duplicate CTAs with mobile drawer) */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://app.preator.es"
            className="btn btn-ghost hidden md:inline-flex"
          >
            Entrar
          </a>
          <Link href="/alta" className="btn btn-accent hidden md:inline-flex">
            Empezar
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-50 bg-black/45"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
          />
          <aside
            className="fixed right-0 top-0 z-50 h-full w-[86%] max-w-sm border-l p-4 transition-transform duration-200 ease-out"
            style={{ borderColor: "var(--border)", background: "var(--bg)" }}
            aria-label="Menú"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">Menú</span>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setOpen(false)}
              >
                <CloseIcon />
                Cerrar
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="card-compact block hover-lift"
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
