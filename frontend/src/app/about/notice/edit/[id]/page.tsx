import React from "react";
import EditorWithPreview from "@/components/EditorWithPreview";
import { checkUser } from "@/api/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getNoticeDetail } from "@/api/notice";

type Props = {
  params: {
    id: string;
  };
};
export default async function NoticeModifyPage({ params: { id } }: Props) {
  const dataPromise = getNoticeDetail(parseInt(id));
  const cookieObj = cookies();
  const userPromise = checkUser(cookieObj.get("accessToken")?.value || "", cookieObj.get("refreshToken")?.value || "");
  const [data, { decodeUser, error }] = await Promise.all([dataPromise, userPromise]);
  console.log("modify", data);
  if (!decodeUser || Object.keys(decodeUser).length === 0) {
    redirect("/");
  } else if (typeof data === "string" || Array.isArray(data)) {
    redirect(`/about/notice`);
  }
  // else if (decodeUser.nick_name !== data.content.nick_name) {
  // redirect(`/about/notice/${id}`);
  // }
  return (
    <div>
      <EditorWithPreview type={"updateNotice"} nick_name={decodeUser?.nick_name} data={data.content} />
    </div>
  );
}
