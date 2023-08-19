import React from "react";
import MainSection from "./ui/MainSection";
import { Sarabun } from "next/font/google";
import ClubOverview from "./ClubOverview";
import MainFaq from "./MainFaq";
import VacationOverview from "./VacationOverview";

const sarabun = Sarabun({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={sarabun.className}>
      <MainSection />
      <section className="md:mx-72 mx-4">
        <ClubOverview />
        <VacationOverview />
        <MainFaq />
      </section>
    </main>
  );
}
