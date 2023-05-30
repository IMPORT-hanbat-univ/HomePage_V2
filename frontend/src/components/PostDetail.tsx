"use client";
import CommentContent from "@/components/CommentContent";
import MarkdownViewer from "@/components/MarkdownViewer";
import PostContent from "@/components/PostContent";
import { PostDetailType } from "@/util/type";

import React from "react";

type Props = {
  data: PostDetailType;
  user: any;
  category: string;
};

const categoryPath = {
  notice: [{ name: "About" }, { name: "Notice", link: "/about/notice" }],
};

export default function PostDetail({ data, user, category }: Props) {
  const pathArray = categoryPath[category as keyof typeof categoryPath] || [{ name: category }];
  return (
    <div className="flex justify-center">
      <div className="max-w-[980px] w-full px-3 ">
        {data?.content && (
          <PostContent user={user} content={data.content} pathArray={pathArray}>
            <MarkdownViewer text={data.content.content} />
          </PostContent>
        )}
        <div className="my-[90px]">
          <CommentContent user={user} comments={data.comment} category={category} />
        </div>
      </div>
    </div>
  );
}
