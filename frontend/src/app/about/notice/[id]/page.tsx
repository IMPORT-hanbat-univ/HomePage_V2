import React from "react";
import PostDetail from "@/components/PostDetail";
import { cookies } from "next/headers";

import { checkUser } from "@/api/auth";

type Props = {
  params: {
    id: string;
  };
};

export default async function NoticePage({ params: { id } }: Props) {
  const cookieObj = cookies();
  const { decodeUser } = await checkUser(cookieObj.get("accessToken")?.value || "");

  return (
    <>
      <PostDetail user={decodeUser} category="notice" />
    </>
  );
}
