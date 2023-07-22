import React from "react";
import EditorWithPreview from "@/components/EditorWithPreview";
import { checkUser } from "@/api/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getPostDetail } from "@/api/post";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    category?: string | undefined;
  };
};
export default async function NoticeModifyPage({ params: { id }, searchParams: { category } }: Props) {
  if (!category) {
    alert("카테고리를 못찾았습니다.");
    redirect("/");
  }
  const dataPromise = getPostDetail(category, parseInt(id));
  const cookieObj = cookies();
  const userPromise = checkUser(cookieObj.get("accessToken")?.value || "", cookieObj.get("refreshToken")?.value || "");
  const [{ data, error: postError }, { decodeUser, error: decodeUserError }] = await Promise.all([
    dataPromise,
    userPromise,
  ]);

  if (!decodeUser || Object.keys(decodeUser).length === 0 || decodeUserError) {
    redirect("/");
  } else if (typeof data === "string" || postError) {
    console.log(postError, data);
    redirect("/");
  }
  const { content, title, tagF, tagS, tagT, topic } = data.content;
  const tagList = [tagF, tagS, tagT].filter((tag) => tag.trim() !== "");
  console.log("tagList", tagList);
  return (
    <div>
      <EditorWithPreview
        nick_name={decodeUser?.nick_name}
        initContent={content}
        initTagList={tagList}
        initTitle={title}
        initTopic={topic ?? ""}
      />
    </div>
  );
}
