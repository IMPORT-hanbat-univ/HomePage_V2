"use client";

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
export default async function ModifyPage({ params: { id }, searchParams: { category } }: Props) {
  if (!category) {
    alert("카테고리를 못찾았습니다.");
    redirect("/");
  }
  const { data, error: postError } = await getPostDetail(category, parseInt(id));
  // const cookieObj = cookies();
  // const userPromise = checkUser(cookieObj.get("accessToken")?.value || "");
  // const [{ data, error: postError }, { decodeUser, error: decodeUserError }] = await Promise.all([
  //   dataPromise,
  //   userPromise,
  // ]);
  console.log("...", data);
  if (typeof data === "string" || postError) {
    console.log(postError, data);
    redirect("/");
  }
  const { content, title, tagF, tagS, tagT, topic } = data.content;
  const tagList = [tagF, tagS, tagT].filter((tag) => tag.trim() !== "");
  console.log("tagList", tagList);
  return (
    <div>
      <EditorWithPreview
        initContent={content}
        initTagList={tagList}
        initTitle={title}
        initTopic={topic ?? ""}
        category={category}
      />
    </div>
  );
}
