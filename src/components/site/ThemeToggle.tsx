"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as any) || "dark";
    setTheme(current);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("preator_theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      className="btn btn-ghost"
      onClick={toggle}
      aria-label="Cambiar tema"
    >
      {theme === "dark" ? "☾" : "☀"}
    </button>
  );
}
