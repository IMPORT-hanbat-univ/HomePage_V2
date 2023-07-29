"use client";
import React from "react";
import { usePathname } from "next/navigation";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
export default function Header() {
  const pathname = usePathname();
  const isEdit = pathname?.includes("edit");
  const isAdmin = pathname?.includes("admin");
  if (isEdit || isAdmin) {
    return null;
  }
  return (
    <>
      <div className="hidden z-10  lg:block">
        <DesktopHeader />
      </div>
      <div className="block z-10 lg:hidden">
        <MobileHeader />
      </div>
    </>
  );
}
