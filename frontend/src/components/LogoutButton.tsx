"use client";
import { logout } from "@/api/auth";
import React from "react";

import getClientCookie from "@/util/getClientCookie";
import { useRouter } from "next/navigation";
export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    await logout(getClientCookie("accessToken") || "", getClientCookie("refreshToken") || "");
    return router.push("/");
  };
  return (
    <button onClick={handleLogout} className="border border-import-color rounded-md leading-[18px] px-[38px] py-[11px] bg-white">
      Log out
    </button>
  );
}
