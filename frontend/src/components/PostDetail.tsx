"use client";
import CommentContent from "@/components/CommentContent";
import MarkdownViewer from "@/components/MarkdownViewer";
import PostContent from "@/components/PostContent";
import { PostDetailType } from "@/util/type";

import React from "react";

type Props = {
  data: PostDetailType;
  user: any;
};

export default function PostDetail({ data, user }: Props) {
  return (
    <div className="flex justify-center">
      <div className="max-w-[980px] w-full px-3 ">
        {data?.content && (
          <PostContent
            user={user}
            content={data.content}
            pathArray={[{ name: "About" }, { name: "Notice", link: "/about/notice" }]}
          >
            <MarkdownViewer text={data.content.content} />
          </PostContent>
        )}
        <div className="my-[90px]">{data?.comment && <CommentContent user={user} comments={data.comment} />}</div>
      </div>
    </div>
  );
}
