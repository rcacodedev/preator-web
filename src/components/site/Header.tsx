"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./SiteMobileNav";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "/tour", label: "Tour" },
  { href: "/precios", label: "Precios" },
  { href: "/ayuda", label: "Ayuda" },
  { href: "/contacto", label: "Contacto" },
];

function cn(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = useMemo(() => NAV, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          <Link href="/" className="group inline-flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm font-bold">
              P
            </span>
            <span className="text-sm font-semibold tracking-wide">PREATOR</span>
            <span className="ml-2 hidden rounded-full border border-[var(--border)] bg-[var(--card)] px-2 py-0.5 text-[11px] text-[var(--muted)] md:inline-flex">
              ERP online
            </span>
          </Link>
        </div>

        {/* Center (desktop nav) */}
        <nav className="hidden items-center gap-1 md:flex">
          {items.map((it) => {
            const active = pathname === it.href;
            return (
              <Link
                key={it.href}
                href={it.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm transition",
                  active
                    ? "bg-[var(--card)] text-[var(--fg)]"
                    : "text-[var(--muted)] hover:bg-[var(--card)] hover:text-[var(--fg)]"
                )}
              >
                {it.label}
                {active ? (
                  <span className="absolute -bottom-0.5 left-3 right-3 h-[2px] rounded bg-[var(--accent)]" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2 md:flex">
            <a
              href="https://app.preator.es"
              className="btn btn-ghost"
              rel="noreferrer"
            >
              Acceder
            </a>
            <Link href="/alta/cuenta" className="btn btn-accent">
              Darse de alta
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile: burger */}
          <div className="md:hidden">
            <button
              type="button"
              className="btn btn-ghost"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Cerrar" : "Abrir"} menú</span>
              <span className="relative block h-5 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-1 block h-[2px] w-5 rounded bg-[var(--fg)] transition",
                    open ? "translate-y-2 rotate-45" : ""
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-2.5 block h-[2px] w-5 rounded bg-[var(--fg)] transition",
                    open ? "opacity-0" : "opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-4 block h-[2px] w-5 rounded bg-[var(--fg)] transition",
                    open ? "-translate-y-2 -rotate-45" : ""
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <MobileNav open={open} setOpen={setOpen} items={items} />
    </header>
  );
}
