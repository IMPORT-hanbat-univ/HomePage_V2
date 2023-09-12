import React from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { Poppins } from "next/font/google";
import UserNav from "./UserNav";

const hanuman = Poppins({
  weight: "600",
  subsets: ["latin"],
  style: "normal",
});
export default function MobileHeader() {
  return (
    <header className="flex border-b shadow-sm bg-white justify-between items-center px-3 h-[60px] sticky z-10 w-screen ">
      <div className="w-[44px] h-[44px]"></div>
      <Link href="/" className="text-xl text-import-color ">
        <span className={hanuman.className}>#IMPORT</span>
      </Link>

      <MobileMenu />
    </header>
  );
}
