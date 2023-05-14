"use client";
import { logout } from "@/api/auth";
import React from "react";
import { redirect } from "next/navigation";
export default function LogoutButton({ cookieObj }: { cookieObj: any }) {
  const handleLogout = async () => {
    console.log("cookieObj", cookieObj);
    await logout(cookieObj);
    redirect("/");
  };
  return (
    <button onClick={handleLogout} className="p-3 border rounded bg-import-color text-white">
      로그아웃
    </button>
  );
}
