"use client";
import dayjs from "dayjs";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import TagList from "../TagList";
import Link from "next/link";
import getClientCookie from "@/util/getClientCookie";
import { deleteNotice } from "@/api/notice";
import { PostDetailType } from "@/util/type";

import { useRouter } from "next/navigation";

export default function PostContent({
  content,
  pathArray,
  children,
}: {
  content: PostDetailType["content"];
  pathArray: { name: string; link?: string }[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleRemove = async () => {
    if (!content?.id) {
      return;
    } else {
      const accessToken: string = getClientCookie("accessToken") || "";
      const refreshToken: string = getClientCookie("refreshToken") || "";
      const result: string | boolean = await deleteNotice(content?.id as number, accessToken, refreshToken);
      if (typeof result === "string") {
        alert(result);
        return;
      } else {
        return router.replace("/about/notice");
      }
    }
  };

  return (
    <div>
      <div className="mt-24 pl-1 flex items-center">
        <Link href="/" className="flex justify-center items-center ">
          <IoHomeOutline className="w-[18px] h-[18px]" />
        </Link>
        {pathArray &&
          pathArray.length > 0 &&
          pathArray.map((path) => (
            <div key={path.name} className="flex items-center">
              <MdArrowForwardIos className="w-[18px] h-[18px] mx-2" />
              {path.link ? (
                <Link href={path.link} className="text-[15px] font-normal leading-6 tracking-[-0.015em] opacity-80">
                  {path.name}
                </Link>
              ) : (
                <span key={path.name} className="text-[15px] font-normal leading-6 tracking-[-0.015em] opacity-80">
                  {path.name}
                </span>
              )}
            </div>
          ))}
      </div>
      <h2 className="mt-10 text-4xl font-extrabold  tracking-[-0.015em] h-full">{content.title}</h2>
      <div className="mt-9 flex items-center justify-between">
        <span className="leading-6 tracking-[-0.015em] text-[20px] font-semibold opacity-80">{content.nick_name}</span>
        <time className="font-normal text-sm leading-6 tracking-[-0.015em] opacity-80">
          {dayjs(content.createdAt).format("YYYY년 M월 D일")}
        </time>
      </div>
      <div className="flex items-center justify-between mt-[17px]">
        <TagList post={content} disabled={true} />
        <div className="flex items-center">
          <Link href="/" className="font-normal text-sm leading-6 tracking-[-0.015em] opacity-50 mr-2">
            수정
          </Link>
          <button onClick={handleRemove} className="font-normal text-sm leading-6 tracking-[-0.015em] opacity-50">
            삭제
          </button>
        </div>
      </div>
      <div className="mt-[92px]">{children}</div>
    </div>
  );
}