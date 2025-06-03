import { Suspense } from "react";
import HomeClient from "./HomeClient";

// Add metadata export at the top level of the file
export const metadata = {
  title: "Horizon Shift Int 002",
  description: "Explore NIS's Horizon Shift Volume 002 interactively. The report covers 3 key sectors: Education, Entertainment, and Health through strategic foresight frameworks.",
  openGraph: {
    title: "Horizon Shift 002",
    description: "Explore NIS's Horizon Shift Volume 002 interactively. The report covers 3 key sectors: Education, Entertainment, and Health through strategic foresight frameworks.",
    url: "https://horizon-shift-git-main-khanikad-ucedus-projects.vercel.app/",
    siteName: "Horizon Shift 002",
    images: [
      {
        url: "https://res.cloudinary.com/doylblq4v/image/upload/v1746454838/Screenshot_2025-05-05_at_7.48.49_PM_fsdtce.png",
        width: 1200,
        height: 630,
        alt: "Horizon Shift 002",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <HomeClient />
    </Suspense>
  );
}
