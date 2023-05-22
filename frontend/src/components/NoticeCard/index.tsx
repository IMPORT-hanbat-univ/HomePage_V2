import dayjs from "dayjs";
import React from "react";
import cls from "classnames";
import { Notice } from "@/util/type";
import Link from "next/link";
import TagList from "../TagList";
export default function NoticeCard({ post, order }: { post: Notice; order: number }) {
  return (
    <article className={cls("p-4 flex", { "border-t border-t-gray-400": order !== 0 })}>
      <Link
        prefetch={false}
        href={`/about/notice/${post.id}`}
        className="overflow-auto break-words cursor-pointer grow"
      >
        <h3 className="mb-2 text-lg">
          <span className="text-import-color">N.</span>
          {post.title}
        </h3>
       
          {(post.tagF !== "" || post.tagS !== "" || post.tagT !== "") && (
            <div className="flex item-center mt-1">
              <TagList post={{tagF: post.tagF, tagS: post.tagS, tagT: post.tagT}} disabled={true} />
            </div>
          )}
         
        <div className="text-xs mt-1 text-preview-gray flex">
          <time dateTime={dayjs(post.createAt).format()}>{dayjs(post.createAt).format("MM월DD일")}</time>
          <div className="ml-2">{post.nick_name}</div>
        </div>
       
      </Link>
    </article>
  );
}
