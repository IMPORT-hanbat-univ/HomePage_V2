import React from "react";
import DevNewsList from "@/components/DevnewsList";
// import { cookies } from "next/headers";
// import { checkUser } from "@/api/auth";
export default async function DevNewsPage() {
  // const cookieObj = cookies();
  // const { decodeUser, error } = await checkUser(cookieObj.get("accessToken")?.value || "");

  return <DevNewsList />;
}
