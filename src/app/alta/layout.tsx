import Link from "next/link";
import { AltaProvider } from "./AltaProvider";
import { AltaSteps } from "@/components/alta/Steps";

export default function AltaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AltaProvider>
      <div className="min-h-screen bg-white">
        <header className="border-b">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
            <Link href="/" className="font-bold">
              PREATOR
            </Link>
            <a
              href="https://app.preator.es"
              className="text-sm text-black/70 hover:underline"
            >
              Ya tengo cuenta
            </a>
          </div>
        </header>

        <main className="mx-auto max-w-3xl space-y-6 px-4 py-10">
          <AltaSteps />
          {children}
        </main>
      </div>
    </AltaProvider>
  );
}
