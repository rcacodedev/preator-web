"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const steps = [
  { key: "cuenta", label: "Cuenta", href: "/alta/cuenta" },
  { key: "empresa", label: "Empresa", href: "/alta/empresa" },
  { key: "plan", label: "Plan", href: "/alta/plan" },
  { key: "pago", label: "Pago", href: "/alta/pago" },
] as const;

export function AltaSteps() {
  const pathname = usePathname();
  return (
    <div className="rounded-2xl border p-4">
      <div className="flex flex-wrap gap-2 text-sm">
        {steps.map((s, idx) => {
          const active = pathname?.startsWith(s.href);
          return (
            <Link
              key={s.key}
              href={s.href}
              className={[
                "rounded-full px-3 py-1",
                active ? "bg-black text-white" : "bg-black/5 hover:bg-black/10",
              ].join(" ")}
            >
              {idx + 1}. {s.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
