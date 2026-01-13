import { LegalPdfPage } from "@/components/site/LegalPdfPage";

export const metadata = {
  title: "Política de privacidad | PREATOR",
  description: "Política de privacidad en PDF.",
};

export default function PrivacidadPage() {
  return (
    <LegalPdfPage
      title="Política de privacidad"
      subtitle="Cómo tratamos tus datos y con qué finalidad. Documento oficial en PDF."
      pdfPath="/legal/privacidad.pdf"
      fallbackText="La política de privacidad completa se publica en PDF. Si necesitas una copia o tienes preguntas, escríbenos."
    />
  );
}
