import React from "react";

import { cookies } from "next/headers";
import { checkUser } from "@/api/auth";
import QnAList from "@/components/QnAList";

export default async function QnAPage() {
  const cookieObj = cookies();
  const { decodeUser, error } = await checkUser(
    cookieObj.get("accessToken")?.value || "",
    cookieObj.get("refreshToken")?.value || ""
  );

  return <QnAList user={decodeUser} />;
}
