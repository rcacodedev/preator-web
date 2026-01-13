import { LegalPdfPage } from "@/components/site/LegalPdfPage";

export const metadata = {
  title: "Política de cookies | PREATOR",
  description: "Política de cookies en PDF.",
};

export default function CookiesPage() {
  return (
    <LegalPdfPage
      title="Política de cookies"
      subtitle="Información sobre el uso de cookies y tecnologías similares. Documento oficial en PDF."
      pdfPath="/legal/cookies.pdf"
      fallbackText="La política de cookies se publica en PDF. Si necesitas una aclaración, escríbenos."
    />
  );
}
