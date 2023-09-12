"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header() {
  if (typeof window === "undefined") {
    null;
  }
  const pathname = usePathname();
  const isEdit = pathname?.includes("edit");
  const isAdmin = pathname?.includes("admin");

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    // 윈도우 크기 변경 이벤트를 구독하여 isDesktop 상태를 업데이트합니다.
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    // 컴포넌트 언마운트 시 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isEdit || isAdmin) {
    return null;
  }
  return (
    <>
      <div className=" z-10  ">{isDesktop ? <DesktopHeader /> : <MobileHeader />}</div>
    </>
  );
}
