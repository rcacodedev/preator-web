"use client";

import { useState } from "react";
import { sendContact } from "@/lib/preatorApi";

export function ContactForm() {
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOk(null);
    setErr(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
      company: String(fd.get("company") || ""),
      phone: String(fd.get("phone") || ""),
      website: String(fd.get("website") || ""), // honeypot
    };

    try {
      await sendContact(payload);
      setOk("Mensaje enviado. Te responderemos pronto.");
      (e.target as HTMLFormElement).reset();
    } catch (ex: any) {
      setErr(ex?.message || "No se pudo enviar el mensaje.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-3">
      <input
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <div className="grid gap-2">
        <label className="text-sm">Nombre</label>
        <input name="name" required className="input" />
      </div>
      <div className="grid gap-2">
        <label className="text-sm">Email</label>
        <input name="email" type="email" required className="input" />
      </div>
      <div className="grid gap-2">
        <label className="text-sm">Empresa (opcional)</label>
        <input name="company" className="input" />
      </div>
      <div className="grid gap-2">
        <label className="text-sm">Teléfono (opcional)</label>
        <input name="phone" className="input" />
      </div>
      <div className="grid gap-2">
        <label className="text-sm">Mensaje</label>
        <textarea name="message" required rows={5} className="textarea" />
      </div>

      {ok ? <p className="text-sm text-green-700">{ok}</p> : null}
      {err ? <p className="text-sm text-red-700">{err}</p> : null}

      <button disabled={loading} className="btn btn-accent">
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
