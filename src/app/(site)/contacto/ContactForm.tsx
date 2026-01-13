"use client";

import { useMemo, useState } from "react";
import { sendContact } from "@/lib/preatorApi";

type FormState = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  website: string; // honeypot
};

function isEmail(v: string) {
  const s = (v || "").trim();
  return s.includes("@") && s.includes(".");
}

function cn(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

export function ContactForm() {
  const [state, setState] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const canSend = useMemo(() => {
    return (
      (state.name || "").trim().length >= 2 &&
      isEmail(state.email) &&
      (state.message || "").trim().length >= 10 &&
      !loading
    );
  }, [state.name, state.email, state.message, loading]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setOk(null);

    const payload = {
      name: state.name.trim(),
      email: state.email.trim(),
      company: state.company.trim() || undefined,
      phone: state.phone.trim() || undefined,
      message: state.message.trim(),
      website: state.website.trim() || undefined,
    };

    if (!payload.name) return setErr("Dinos tu nombre.");
    if (!isEmail(payload.email)) return setErr("Email inválido.");
    if (!payload.message || payload.message.length < 10)
      return setErr("Cuéntanos un poco más (mínimo 10 caracteres).");

    setLoading(true);
    try {
      await sendContact(payload);
      setOk("¡Mensaje enviado! Te responderemos lo antes posible.");
      setState({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
        website: "",
      });
    } catch (e: unknown) {
      const msg =
        e instanceof Error
          ? e.message
          : typeof e === "string"
          ? e
          : "No se pudo enviar. Prueba de nuevo.";
      setErr(msg);

      // Fallback UX: ofrecer mailto si falla API
      // (no hacemos redirect automático para que el usuario no pierda el texto)
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Escríbenos</h2>
        <p className="muted text-sm">
          Cuanto más contexto, mejor: plan, número de usuarios, y qué intentabas
          hacer.
        </p>
      </div>

      {/* Honeypot */}
      <div className="hidden">
        <label className="label">Website</label>
        <input
          className="input"
          value={state.website}
          onChange={(e) => setState((s) => ({ ...s, website: e.target.value }))}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="label">Nombre</label>
          <input
            className="input"
            value={state.name}
            onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
            placeholder="Tu nombre"
            required
          />
        </div>

        <div className="grid gap-2">
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            value={state.email}
            onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
            placeholder="tu@email.com"
            required
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="label">Empresa (opcional)</label>
          <input
            className="input"
            value={state.company}
            onChange={(e) =>
              setState((s) => ({ ...s, company: e.target.value }))
            }
            placeholder="Tu empresa"
          />
        </div>

        <div className="grid gap-2">
          <label className="label">Teléfono (opcional)</label>
          <input
            className="input"
            value={state.phone}
            onChange={(e) => setState((s) => ({ ...s, phone: e.target.value }))}
            placeholder="+34 ..."
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="label">Mensaje</label>
        <textarea
          className={cn("textarea min-h-[140px]", loading ? "opacity-90" : "")}
          value={state.message}
          onChange={(e) => setState((s) => ({ ...s, message: e.target.value }))}
          placeholder="Cuéntanos qué necesitas. Si es soporte, dinos qué estabas haciendo y qué esperabas ver."
          required
        />
        <p className="help">
          Responderemos a <b>{state.email ? state.email : "tu email"}</b>.
        </p>
      </div>

      {ok ? (
        <div className="alert alert-success text-sm">
          <b>Listo:</b> {ok}
        </div>
      ) : null}

      {err ? (
        <div className="alert alert-error text-sm space-y-2">
          <div>
            <b>Error:</b> {err}
          </div>
          <div className="text-xs muted">
            Si lo prefieres, escríbenos a{" "}
            <a className="link-accent" href="mailto:soporte@preator.es">
              soporte@preator.es
            </a>
            .
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <p className="text-xs muted">
          Enviar este formulario implica aceptar los términos y la política de
          privacidad.
        </p>
        <button className="btn btn-accent" disabled={!canSend}>
          {loading ? "Enviando…" : "Enviar"}
        </button>
      </div>
    </form>
  );
}
