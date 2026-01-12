import { Suspense } from "react";
import { SuccessClient } from "./SuccessClient";

function LoadingCard() {
  return (
    <div className="card space-y-3 motion-in">
      <div className="h-6 w-48 rounded bg-[var(--ghost)]" />
      <div className="h-4 w-full rounded bg-[var(--ghost)]" />
      <div className="h-4 w-5/6 rounded bg-[var(--ghost)]" />
      <div className="mt-2 flex flex-wrap gap-2">
        <div className="h-10 w-40 rounded bg-[var(--ghost)]" />
        <div className="h-10 w-28 rounded bg-[var(--ghost)]" />
        <div className="h-10 w-40 rounded bg-[var(--ghost)]" />
      </div>
    </div>
  );
}

export default function AltaSuccessPage() {
  return (
    <Suspense fallback={<LoadingCard />}>
      <SuccessClient />
    </Suspense>
  );
}
