import { SiteHeader } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="site-container mx-auto max-w-6xl py-8 md:py-10 lg:py-12">
        {children}
      </main>
      <Footer />
    </>
  );
}
