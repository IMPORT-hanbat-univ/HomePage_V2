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
    <button onClick={handleLogout} className="p-3 border rounded bg-import-color text-white">
      로그아웃
    </button>
  );
}
