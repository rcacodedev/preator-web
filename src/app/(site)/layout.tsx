import { SiteHeader } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#content" className="skip-link">
        Saltar al contenido
      </a>

      <SiteHeader />

      <main id="content" className="mx-auto max-w-6xl px-4 py-10">
        {children}
      </main>

      <Footer />
    </>
  );
}
