"use client";
import CommentContent from "@/components/CommentContent";
import MarkdownViewer from "@/components/MarkdownViewer";
import PostContent from "@/components/PostContent";
import usePost from "@/hooks/usePost";
import { useParams, notFound } from "next/navigation";
import React from "react";
import RelatedPost from "./RelatedPosts";

type Props = {
  user: any;
  category: string;
};

const categoryPath = {
  notice: [{ name: "About" }, { name: "Notice", link: "/about/notice" }],
  information: [{ name: "Community" }, { name: "Information", link: "/community/information" }],
  qna: [{ name: "Community" }, { name: "QnA", link: "/community/qna" }],
};

export default function PostDetail({ user, category }: Props) {
  const params = useParams();
  const id = params?.id;
  console.log();
  const { data, isLoading, error } = usePost(category, id as string);
  console.log("data", data, error);
  const pathArray = categoryPath[category as keyof typeof categoryPath] || [{ name: category }];
  if (error || (!isLoading && !data?.content)) {
    notFound();
  }
  return (
    <>
      {!isLoading && (
        <section className={`flex justify-center ${category === "qna" && "px-[32px] mt-20"}`}>
          <article className={`max-w-[980px] w-full px-3 ${category === "qna" && " xl:w-9/12 px-3"}`}>
            {data?.content && (
              <PostContent category={category} user={user} content={data.content} pathArray={pathArray}>
                <MarkdownViewer text={data.content.content} />
              </PostContent>
            )}
            <div className="my-[90px]">
              <CommentContent user={user} comments={data.comment} category={category} />
            </div>
          </article>
          {category === "qna" && (
            <article className="hidden xl:block xl:w-3/12 mt-44 ml-[40px] max-w-[320px]">
              <div className="absolute max-w-[300px] mt-20">
                <RelatedPost category={category} post={data} />
              </div>
            </article>
          )}
        </section>
      )}
    </>
  );
}
