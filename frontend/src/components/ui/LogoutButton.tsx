"use client";
import { logout } from "@/api/auth";
import React from "react";

import getClientCookie from "@/util/getClientCookie";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { notificationAtom } from "@/recoil/notification";
export default function LogoutButton() {
  const router = useRouter();
  const setNotification = useSetRecoilState(notificationAtom);
  const handleLogout = async () => {
    const result = await logout(getClientCookie("accessToken") || "");
    if (typeof result === "string") {
      console.log(result);
      setNotification({ notificationType: "Error", message: "로그아웃 과정에서 에러가 발생했습니다.", type: "danger" });
      return;
    } else {
      window.location.reload();
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="border border-import-color rounded-md px-7 py-2 lg:leading-[18px] lg:px-[42px] lg:py-[11px bg-white"
    >
      Log out
    </button>
  );
}
