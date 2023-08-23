import React from "react";
import NoticeList from "@/components/NoticeList";

import { cookies } from "next/headers";
// import { checkUser } from "@/api/auth";

export default async function NoticeListPage() {
  const cookieObj = cookies();
  // const { decodeUser, error } = await checkUser(cookieObj.get("accessToken")?.value || "");

  return (
    <div className="flex items-center justify-center">
      <NoticeList />
    </div>
  );
}
