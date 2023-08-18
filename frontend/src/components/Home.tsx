import React from "react";
import MainSection from "./ui/MainSection";
import { Sarabun } from "next/font/google";

const sarabun = Sarabun({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={sarabun.className}>
      <MainSection />
    </main>
  );
}
