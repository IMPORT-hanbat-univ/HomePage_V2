import React from "react";
import MainSection from "./ui/MainSection";
import { Sarabun } from "next/font/google";
import ClubOverview from "./ClubOverview";

const sarabun = Sarabun({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={sarabun.className}>
      <MainSection />
      <div className="mt-48">gkgk</div>
      <ClubOverview />
    </main>
  );
}
