"use client";
import usePosts from "@/hooks/usePosts";
import useRelatedPost from "@/hooks/useRelatedPost";
import { PostDetailType, SimplePost } from "@/util/type";
import dayjs from "dayjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  post: PostDetailType;
  category: string;
};

export default function RelatedPost({ post, category }: Props) {
  const pathname = usePathname() ?? "";
  const basePath = pathname.split("/").slice(0, -1).join("/");

  const { data: list, isLoading, error } = usePosts(category);
  const relatedList = useRelatedPost(list, post);
  return (
    <>
      {!isLoading && !error && relatedList.length > 0 && (
        <div className="mb-3 w-full">
          <div className="py-4 px-5 border rounded-sm w-full">
            <h6 className="mb-[1em] h-[20px] text-xs text-light-gray">연관게시글</h6>
            <ul>
              {relatedList &&
                relatedList.length > 0 &&
                relatedList.map((post: SimplePost) => (
                  <li key={post.id} className="py-2 border-b mb-2 text-sm hover:bg-zinc-50">
                    <Link href={`/${basePath}/${post.id}`}>
                      <span className=" overflow-hidden text-ellipsis whitespace-normal break-all line-clamp-2 max-h-14 mb-1">
                        {post.title}
                      </span>
                      <div className="flex items-center justify-between text-xs font-thin text-light-gray">
                        <span>{post.nick_name}</span>
                        <span> {dayjs(post.createdAt).format("YYYY년 M월 D일")}</span>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
