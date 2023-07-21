import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import TagList from "./TagList";
import import_image from "../../public/images/import_image.jpg";
import { SimplePost } from "@/util/type";
type Props = {
  post: SimplePost;
};

export default function CardItem({ post }: Props) {
  console.log("post", post);
  return (
    <article className="w-full py-1">
      <Image
        src={!post.file || post.file.trim() === "" ? import_image : post.file}
        className="rounded w-full"
        width={300}
        height={200}
        alt={post.title}
        style={{ objectFit: "cover", height: 200 }}
      />
      <h3 className="w-full h-[36px] mt-3 font-bold text-2xl leading-9 tracking-[-0.015em]  text-ellipsis overflow-hidden whitespace-nowrap">
        {post.title}
      </h3>
      <span className="mt-1 h-[36px] text-sm opacity-80 tracking-[-0.015em]">
        {dayjs(post.createdAt).format("YYYY월 M월 D일")}
      </span>
      <div className="mt-[1px]">
        <TagList post={post} disabled={false} />
      </div>
    </article>
  );
}
