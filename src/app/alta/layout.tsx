import Link from "next/link";
import { AltaProvider } from "./AltaProvider";
import { AltaSteps } from "@/components/alta/Steps";
import { ThemeToggle } from "@/components/site/ThemeToggle";

export default function AltaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AltaProvider>
      <div className="min-h-screen">
        <header
          className="border-b"
          style={{ borderColor: "var(--border)", background: "var(--bg)" }}
        >
          <div className="site-container mx-auto max-w-6xl flex items-center justify-between py-4">
            <Link href="/" className="font-bold tracking-tight">
              PREATOR
            </Link>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a
                href="https://app.preator.es"
                className="btn btn-ghost text-sm hidden sm:inline-flex"
              >
                Ya tengo cuenta
              </a>
              <a
                href="https://app.preator.es"
                className="btn btn-ghost text-sm sm:hidden"
                aria-label="Entrar"
              >
                Entrar
              </a>
            </div>
          </div>
        </header>

        <main className="site-container mx-auto max-w-3xl space-y-6 py-10 pb-24">
          <AltaSteps />
          {children}
        </main>
      </div>
    </AltaProvider>
  );
}
