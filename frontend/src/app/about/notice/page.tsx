import React from "react";
import NoticeList from "@/components/NoticeList";
import { notFound } from "next/navigation";
import { getNoticeList } from "@/api/notice";
import { cookies } from "next/headers";
import { checkUser } from "@/api/auth";

export default async function NoticeListPage() {
  const noticePromise = getNoticeList();
  const cookieObj = cookies();
  const userPromise = checkUser(cookieObj.get("accessToken")?.value || "", cookieObj.get("refreshToken")?.value || "");
  const [notices, { decodeUser, error }] = await Promise.all([noticePromise, userPromise]);
  if (typeof notices === "string") {
    notFound();
  }
  return (
    <div className="flex items-center justify-center">
      <NoticeList notices={notices} user={decodeUser} />
    </div>
  );
}
