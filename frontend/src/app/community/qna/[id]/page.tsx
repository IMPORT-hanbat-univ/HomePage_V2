import React from "react";
import PostDetail from "@/components/PostDetail";
import { cookies } from "next/headers";

import { checkUser } from "@/api/auth";

export default async function QnAPage() {
  const cookieObj = cookies();
  const { decodeUser } = await checkUser(cookieObj.get("accessToken")?.value || "");
  console.log("checkuser", decodeUser);

  return <PostDetail category="qna" user={decodeUser} />;
}
