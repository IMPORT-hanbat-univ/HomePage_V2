"use client";
import CommentContent from "@/components/CommentContent";
import MarkdownViewer from "@/components/MarkdownViewer";
import PostContent from "@/components/PostContent";
import { PostDetail } from "@/util/type";
import { useParams } from "next/navigation";
import React from "react";

export default function PostDetail({ data }: { data: PostDetail }) {
  const params = useParams();
  const { id } = params || {};

  return (
    <div className="flex justify-center">
      <div className="max-w-[980px] w-full px-3 ">
        {data?.content && (
          <PostContent
            content={data.content}
            pathArray={[{ name: "About" }, { name: "Notice", link: "/about/notice" }]}
          >
            <MarkdownViewer text={data.content.content} />
          </PostContent>
        )}
        <div className="my-[90px]">{data?.comment && <CommentContent comments={data.comment} />}</div>
      </div>
    </div>
  );
}
