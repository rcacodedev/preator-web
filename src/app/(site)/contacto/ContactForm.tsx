"use client";

import { useState } from "react";
import { sendContact } from "@/lib/preatorApi";

function getErrorMessage(ex: unknown): string {
  if (ex instanceof Error) return ex.message;
  if (typeof ex === "string") return ex;
  try {
    return JSON.stringify(ex);
  } catch {
    return "Error desconocido";
  }
}

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
      e.currentTarget.reset();
    } catch (ex: unknown) {
      setErr(getErrorMessage(ex) || "No se pudo enviar el mensaje.");
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
        <label className="label">Nombre</label>
        <input name="name" required className="input" />
      </div>

      <div className="grid gap-2">
        <label className="label">Email</label>
        <input name="email" type="email" required className="input" />
      </div>

      <div className="grid gap-2">
        <label className="label">Empresa (opcional)</label>
        <input name="company" className="input" />
      </div>

      <div className="grid gap-2">
        <label className="label">Teléfono (opcional)</label>
        <input name="phone" className="input" />
      </div>

      <div className="grid gap-2">
        <label className="label">Mensaje</label>
        <textarea name="message" required rows={5} className="textarea" />
      </div>

      {ok ? <div className="alert alert-success text-sm">{ok}</div> : null}
      {err ? (
        <div
          className="alert alert-error text-sm"
          style={{ whiteSpace: "pre-line" }}
        >
          <b>Error:</b> {err}
        </div>
      ) : null}

      <button disabled={loading} className="btn btn-accent">
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
