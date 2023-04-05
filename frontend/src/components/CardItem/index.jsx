import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import TagList from "../TagList";

export default function CardItem({ post }) {
  return (
    <article className="w-[300px] py-1">
      <Image
        src={post.image}
        className="rounded"
        width={300}
        height={200}
        alt={post.title}
        style={{ objectFit: "cover", width: 300, height: 200 }}
      />
      <h3 className="w-full h-[36px] mt-3 font-bold text-2xl leading-9 tracking-[-0.015em]  text-ellipsis overflow-hidden whitespace-nowrap">
        {post.title}
      </h3>
      <span className="mt-1 h-[36px] text-sm opacity-80 tracking-[-0.015em]">
        {dayjs(post.createAt).format("YYYY월 M월 D일")}
      </span>
      <div className="mt-[1px]">
        <TagList post={post} disabled={false} />
      </div>
    </article>
  );
}
