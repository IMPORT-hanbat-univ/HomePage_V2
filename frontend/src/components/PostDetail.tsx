"use client";
import CommentContent from "@/components/CommentContent";
import MarkdownViewer from "@/components/MarkdownViewer";
import PostContent from "@/components/PostContent";
import usePost from "@/hooks/usePost";
import { useParams } from "next/navigation";
import { PostDetailType } from "@/util/type";

import React from "react";

type Props = {
  user: any;
  category: string;
};

const categoryPath = {
  notice: [{ name: "About" }, { name: "Notice", link: "/about/notice" }],
};

export default function PostDetail({ user, category }: Props) {
  const params = useParams();
  const id = params?.id;
  console.log();
  const { data, isLoading, error } = usePost(category, id as string);
  console.log("data", data, error);
  const pathArray = categoryPath[category as keyof typeof categoryPath] || [{ name: category }];
  return (
    <>
      {!isLoading && (
        <div className="flex justify-center">
          <div className="max-w-[980px] w-full px-3 ">
            {data?.content && (
              <PostContent category={category} user={user} content={data.content} pathArray={pathArray}>
                <MarkdownViewer text={data.content.content} />
              </PostContent>
            )}
            <div className="my-[90px]">
              <CommentContent user={user} comments={data.comment} category={category} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
