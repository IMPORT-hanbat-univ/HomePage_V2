"use client";
import React, { useEffect, useState } from "react";
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
      <div className=" z-10  lg:block hidden">
        <DesktopHeader />
      </div>
      <div className="z-10 block lg:hidden">
        <MobileHeader />
      </div>
    </>
  );
}
