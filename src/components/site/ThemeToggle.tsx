"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

function readThemeFromDomOrStorage(): Theme {
  if (typeof window === "undefined") return "dark";
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => readThemeFromDomOrStorage());

  // Sync to external systems (DOM + localStorage). No setState here.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  return (
    <button
      type="button"
      className="btn btn-ghost"
      aria-label="Cambiar tema"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
    >
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
}
