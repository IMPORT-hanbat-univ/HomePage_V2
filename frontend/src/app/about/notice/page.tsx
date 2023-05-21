import React from "react";
import NoticeList from "@/components/NoticeList";
import { notFound } from "next/navigation";
import { getNoticeList } from "@/api/notice";
import { cookies } from "next/headers";
import { checkUser } from "@/api/auth";

export default async function NoticeListPage() {
  const cookieObj = cookies();
  const { decodeUser, error } = await checkUser(
    cookieObj.get("accessToken")?.value || "",
    cookieObj.get("refreshToken")?.value || ""
  );

  return (
    <div className="flex items-center justify-center">
      <NoticeList user={decodeUser} />
    </div>
  );
}
