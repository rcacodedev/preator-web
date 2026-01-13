"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { ThemeToggle } from "./ThemeToggle";

type NavItem = { href: string; label: string };

function cn(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

export function MobileNav({
  open,
  setOpen,
  items,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  items: NavItem[];
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed right-0 top-14 z-50 h-[calc(100vh-3.5rem)] w-[88%] max-w-sm border-l border-[var(--border)] bg-[var(--bg)] p-4 transition-transform md:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
      >
        <div className="space-y-3">
          <div className="card-compact">
            <p className="text-sm font-semibold">Navegación</p>
            <p className="text-xs muted">
              Todo lo esencial, sin ruido. Negro, blanco y una pizca de rojo.
            </p>
          </div>

          <div className="grid gap-1">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className="rounded-xl px-3 py-3 text-sm text-[var(--fg)] hover:bg-[var(--card)]"
                onClick={() => setOpen(false)}
              >
                {it.label}
              </Link>
            ))}
          </div>

          <hr className="hr" />

          <div className="grid gap-2">
            <a
              href="https://app.preator.es"
              className="btn btn-ghost w-full justify-center"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              Acceder
            </a>

            <Link
              href="/alta/cuenta"
              className="btn btn-accent w-full justify-center"
              onClick={() => setOpen(false)}
            >
              Darse de alta
            </Link>

            <div className="pt-1">
              <ThemeToggle />
            </div>
          </div>

          <p className="muted pt-2 text-[11px]">
            Para decisiones fiscales, consulta a tu gestor.
          </p>
        </div>
      </div>
    </>
  );
}
