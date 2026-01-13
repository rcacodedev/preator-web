import Link from "next/link";
import {
  BulletList,
  Callout,
  DocNav,
  DocsShell,
  DocSection,
  Steps,
} from "@/components/site/DocsSections";

export const metadata = {
  title: "Ayuda | PREATOR",
  description:
    "Documentación rápida: usuarios y permisos, invitaciones, roles y límites por plan.",
};

export default function AyudaPage() {
  return (
    <DocsShell
      title="Ayuda y documentación"
      subtitle="Aquí tienes una explicación clara y práctica de cómo funciona PREATOR. Empezamos por lo más importante: usuarios, permisos y límites."
    >
      {/* Mobile index */}
      <div className="lg:hidden">
        <DocNav />
      </div>

      <div className="card space-y-3">
        <p className="text-sm font-semibold">Resumen rápido</p>
        <p className="muted text-sm">
          Un usuario se registra con su email, crea una organización y elige un
          plan. A partir de ahí, puede invitar a su equipo desde{" "}
          <b>Usuarios y permisos</b>.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="/alta/cuenta" className="btn btn-accent">
            Empezar
          </Link>
          <Link href="/precios" className="btn btn-ghost">
            Ver precios
          </Link>
          <Link href="/contacto" className="btn btn-primary">
            Contactar soporte
          </Link>
        </div>
      </div>

      <DocSection
        id="usuarios-y-permisos"
        title="Usuarios y permisos"
        subtle="El sistema está pensado para equipos: claro, seguro y con límites de plan fáciles de entender."
      >
        <BulletList
          items={[
            "Cada persona tiene su propio email y contraseña (no se comparten cuentas).",
            "Las personas trabajan dentro de una Organización.",
            "Los accesos se controlan por Roles (Owner/Admin/Manager/Member/Viewer).",
            "Los límites de usuarios se calculan por memberships activos.",
          ]}
        />
        <Callout title="Recomendación PRO">
          Usa emails individuales siempre. Es más seguro, hay auditoría real y
          los permisos funcionan como deben.
        </Callout>
      </DocSection>

      <DocSection
        id="que-es-una-organizacion"
        title="¿Qué es una Organización?"
        subtle="Es tu empresa dentro de PREATOR. Todo (datos, facturas, inventario, KPIs) vive dentro de una organización."
      >
        <BulletList
          items={[
            "Una organización tiene su plan (Starter/Pro/Business).",
            "Tu equipo entra en esa organización con invitación.",
            "Puedes tener más de una organización si lo necesitas (ej. dos negocios).",
          ]}
        />
        <Callout title="Importante">
          PREATOR es multi-tenant: los datos están aislados por organización.
        </Callout>
      </DocSection>

      <DocSection
        id="que-es-un-membership"
        title="¿Qué es un Membership?"
        subtle="Un membership es la relación entre una persona (User) y una organización (Organization), con un rol concreto."
      >
        <div className="card-compact">
          <p className="text-sm font-semibold">En una frase</p>
          <p className="muted text-sm">
            <b>User</b> (persona) + <b>Organization</b> (empresa) + <b>Role</b>{" "}
            (permiso) = <b>Membership</b>.
          </p>
        </div>

        <BulletList
          items={[
            "Un mismo user puede estar en varias organizaciones (si le invitan).",
            "Cada membership puede tener un rol distinto según la organización.",
            "Los límites del plan cuentan memberships activos (no cuentas creadas).",
          ]}
        />

        <Callout title="Ejemplo" variant="info">
          Plan Pro (10 usuarios): significa <b>hasta 10 memberships activos</b>{" "}
          en tu organización. Si tienes 1 owner + 4 empleados activos = 5.
          Todavía te quedan 5.
        </Callout>
      </DocSection>

      <DocSection
        id="como-invitar"
        title="Cómo invitar a tu equipo"
        subtle="Desde la app (panel de control) podrás invitar en 30 segundos."
      >
        <Steps
          items={[
            "Entra en la app y abre: Panel de control → Usuarios y permisos.",
            "Pulsa “Invitar usuario”.",
            "Escribe email, asigna rol y envía.",
            "La persona recibe un email y acepta la invitación.",
            "Al aceptar, se crea/activa el membership y ya puede trabajar.",
          ]}
        />
        <Callout title="Anti-lío">
          No compartas un usuario “empresa@…”. Invitar con emails individuales
          evita problemas, mejora seguridad y te da trazabilidad.
        </Callout>
      </DocSection>

      <DocSection id="roles" title="Roles (permisos)">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="card-compact">
            <p className="text-sm font-semibold">Owner</p>
            <p className="muted text-sm">
              Control total. Puede cambiar plan, ver facturación, gestionar
              usuarios y ajustes.
            </p>
          </div>
          <div className="card-compact">
            <p className="text-sm font-semibold">Admin</p>
            <p className="muted text-sm">
              Administración diaria. Puede gestionar usuarios (según política),
              contactos y procesos.
            </p>
          </div>
          <div className="card-compact">
            <p className="text-sm font-semibold">Manager</p>
            <p className="muted text-sm">
              Operación. Puede crear/editar documentos, validar procesos, ver
              KPIs.
            </p>
          </div>
          <div className="card-compact">
            <p className="text-sm font-semibold">Member / Viewer</p>
            <p className="muted text-sm">
              Miembro: trabajo diario con límites. Viewer: lectura, útil para
              gestoría o consulta.
            </p>
          </div>
        </div>

        <Callout title="Nota">
          Los roles exactos pueden ajustarse por módulo
          (Ventas/Compras/Inventario). La idea es sencilla: cada acción queda
          registrada y controlada.
        </Callout>
      </DocSection>

      <DocSection
        id="limites-y-planes"
        title="Límites por plan"
        subtle="Límites claros: usuarios por memberships activos y almacenes por organización."
      >
        <div className="grid gap-3 md:grid-cols-3">
          <div className="card-compact">
            <p className="text-sm font-semibold">Starter</p>
            <p className="muted text-sm">1 usuario · 1–2 almacenes</p>
          </div>
          <div className="card-compact">
            <p className="text-sm font-semibold">Pro</p>
            <p className="muted text-sm">Hasta 10 usuarios · 3–5 almacenes</p>
          </div>
          <div className="card-compact">
            <p className="text-sm font-semibold">Business</p>
            <p className="muted text-sm">
              Hasta 25 usuarios · Hasta 10 almacenes
            </p>
          </div>
        </div>

        <Callout title="¿Qué pasa si llego al límite?" variant="warn">
          Cuando alcances el máximo de usuarios, no podrás activar nuevos
          memberships hasta liberar uno (desactivar) o subir de plan. Así
          evitamos sorpresas.
        </Callout>
      </DocSection>

      <DocSection
        id="buenas-practicas"
        title="Buenas prácticas"
        subtle="Para que el equipo trabaje rápido y sin fricción."
      >
        <BulletList
          items={[
            "Usa roles: Owner para dirección, Manager para operación, Member para ejecución.",
            "Crea un usuario Viewer para tu gestoría si necesitas revisión.",
            "Evita compartir contraseñas: es inseguro y rompe la auditoría.",
            "Define un proceso sencillo (borrador → validación → emitido).",
          ]}
        />
      </DocSection>

      <DocSection id="faq" title="FAQ">
        <div className="space-y-3">
          <div className="card-compact">
            <p className="text-sm font-semibold">
              ¿Puedo tener varias personas con el mismo email?
            </p>
            <p className="muted text-sm">
              No. El email identifica a una persona. Si alguien necesita acceso,
              se invita con su email.
            </p>
          </div>

          <div className="card-compact">
            <p className="text-sm font-semibold">¿Puedo cambiar de plan?</p>
            <p className="muted text-sm">
              Sí. En la app tendrás Billing self-service para cambiar plan, ver
              facturas y gestionar suscripción.
            </p>
          </div>

          <div className="card-compact">
            <p className="text-sm font-semibold">
              ¿Qué cuenta para el límite de usuarios?
            </p>
            <p className="muted text-sm">
              Los <b>memberships activos</b> en tu organización. Invitaciones
              pendientes o usuarios desactivados no cuentan.
            </p>
          </div>

          <div className="card-compact">
            <p className="text-sm font-semibold">¿Cómo entra mi equipo?</p>
            <p className="muted text-sm">
              Les invitas desde <b>Usuarios y permisos</b>. Reciben un email,
              aceptan y listo.
            </p>
          </div>
        </div>
      </DocSection>

      <div className="flex flex-wrap gap-2 pt-2">
        <Link href="/alta/cuenta" className="btn btn-accent">
          Darse de alta
        </Link>
        <Link href="/contacto" className="btn btn-ghost">
          Hablar con soporte
        </Link>
      </div>
    </DocsShell>
  );
}
