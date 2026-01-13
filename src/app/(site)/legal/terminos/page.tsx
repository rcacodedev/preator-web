import { LegalPdfPage } from "@/components/site/LegalPdfPage";

export const metadata = {
  title: "Términos y condiciones | PREATOR",
  description: "Términos y condiciones en PDF.",
};

export default function TerminosPage() {
  return (
    <LegalPdfPage
      title="Términos y condiciones"
      subtitle="Condiciones de uso del servicio y aspectos contractuales. Documento oficial en PDF."
      pdfPath="/legal/terminos.pdf"
      fallbackText="Los términos completos se publican en PDF. Si todavía no está disponible, vuelve más tarde o contáctanos."
    />
  );
}
