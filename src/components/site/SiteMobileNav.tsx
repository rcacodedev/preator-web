"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

type NavItem = { href: string; label: string };

function cn(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

function getFocusable(container: HTMLElement | null) {
  if (!container) return [];
  const sel =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll<HTMLElement>(sel)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}

export function MobileNav({
  open,
  setOpen,
  items,
}: {
  open: boolean;
  setOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  items: readonly NavItem[];
}) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement | null>(null);

  const activeLabel = useMemo(() => {
    const it = items.find((x) => x.href === pathname);
    return it?.label || "";
  }, [items, pathname]);

  // ESC to close + focus trap
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusables = getFocusable(panel);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    // Focus first element inside drawer
    window.setTimeout(() => first?.focus(), 0);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      // Trap focus
      if (!first || !last) return;

      const isShift = e.shiftKey;
      const active = document.activeElement as HTMLElement | null;

      if (!isShift && active === last) {
        e.preventDefault();
        first.focus();
      } else if (isShift && active === first) {
        e.preventDefault();
        last.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        className="fixed inset-x-0 top-14 z-50"
      >
        <div ref={panelRef} className="mx-auto max-w-6xl px-4">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-[var(--shadow)]">
            <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-3">
              <div className="text-sm">
                <p className="font-semibold">Menú</p>
                <p className="text-xs muted">
                  {activeLabel ? `Estás en: ${activeLabel}` : "Navegación"}
                </p>
              </div>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setOpen(false)}
              >
                Cerrar
              </button>
            </div>

            <nav className="grid gap-1 p-2">
              {items.map((it) => {
                const active = pathname === it.href;
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-xl px-3 py-3 text-sm transition",
                      active
                        ? "bg-[var(--card)] text-[var(--fg)]"
                        : "text-[var(--muted)] hover:bg-[var(--card)] hover:text-[var(--fg)]"
                    )}
                  >
                    {it.label}
                  </Link>
                );
              })}
            </nav>

            <div className="grid gap-2 border-t border-[var(--border)] p-3">
              <a
                href="https://app.preator.es"
                className="btn btn-ghost justify-center"
                rel="noreferrer"
              >
                Acceder
              </a>
              <Link
                href="/alta/cuenta"
                className="btn btn-accent justify-center"
                onClick={() => setOpen(false)}
              >
                Darse de alta
              </Link>

              <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2">
                <span className="text-sm muted">Tema</span>
                <ThemeToggle />
              </div>

              <p className="px-1 text-xs muted">
                Pulsa <b>Esc</b> para cerrar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
