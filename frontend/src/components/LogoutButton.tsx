"use client";
import { logout } from "@/api/auth";
import React from "react";
import { redirect } from "next/navigation";
import getClientCookie from "@/util/getClientCookie"
export default function LogoutButton() {
  const handleLogout = async () => {
  
    await logout(getClientCookie("accessToken")||"", getClientCookie("refreshToken")||"");
    return redirect("/");
  };
  return (
    <button onClick={handleLogout} className="p-3 border rounded bg-import-color text-white">
      로그아웃
    </button>
  );
}
