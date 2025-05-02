// src/app/history/page.tsx
import { Suspense } from "react";
import HistoryClient from "./HistoryClient";

/**
 * Because HistoryClient calls `useSearchParams`, the page must
 * bail out to CSR.  Wrapping it in <Suspense> satisfies Next 15’s
 * rule and fixes the build error.
 */
export default function HistoryPage() {
  return (
    <Suspense fallback={null}>
      <HistoryClient />
    </Suspense>
  );
}

// If the rest of your site is static‑exported and you *need* this page
// to run only on the client at request time, uncomment the next line.
// export const dynamic = "force-dynamic";
