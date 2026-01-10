import { ContactForm } from "./ContactForm";

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Contacto</h1>
      <p className="text-black/70">
        Cuéntanos qué necesitas y te respondemos desde soporte@preator.es.
      </p>
      <ContactForm />
    </div>
  );
}
