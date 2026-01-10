export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="container py-10 text-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="muted">© {new Date().getFullYear()} PREATOR</p>
          <p className="muted">Soporte: soporte@preator.es</p>
        </div>
      </div>
    </footer>
  );
}
