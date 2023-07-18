import React from "react";
import InformationList from "@/components/InformationList";
import { cookies } from "next/headers";
import { checkUser } from "@/api/auth";
export default async function InforamtionPage() {
  const cookieObj = cookies();
  const { decodeUser, error } = await checkUser(
    cookieObj.get("accessToken")?.value || "",
    cookieObj.get("refreshToken")?.value || ""
  );

  return <InformationList user={decodeUser} />;
}
