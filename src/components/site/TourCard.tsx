import Link from "next/link";

function cn(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

export function TourCard({
  title,
  desc,
  points,
  href,
  highlight,
  badge,
}: {
  title: string;
  desc: string;
  points: string[];
  href: string;
  highlight?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition",
        "hover:shadow-md hover:-translate-y-0.5 will-change-transform",
        highlight ? "ring-1 ring-[var(--accent)]" : ""
      )}
    >
      {highlight ? (
        <div className="pointer-events-none absolute -top-24 right-[-60px] h-56 w-56 rounded-full bg-[var(--accent)]/10 blur-2xl" />
      ) : null}

      <div className="relative space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{title}</h3>
              {badge ? (
                <span className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-2 py-0.5 text-[11px] text-[var(--muted)]">
                  {badge}
                </span>
              ) : null}
            </div>
            <p className="muted text-sm">{desc}</p>
          </div>
        </div>

        <ul className="space-y-2 text-sm">
          {points.map((p) => (
            <li key={p} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span className="text-[var(--fg)]/90">{p}</span>
            </li>
          ))}
        </ul>

        <div className="pt-2">
          <Link href={href} className="btn btn-ghost w-full justify-center">
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
}
