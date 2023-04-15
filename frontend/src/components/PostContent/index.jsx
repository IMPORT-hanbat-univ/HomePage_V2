import dayjs from "dayjs";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import TagList from "../TagList";
import Link from "next/link";
import MarkdownViewer from "../MarkdownViewer";
import { useRouter } from "next/router";

export default function PostContent({ content, pathArray, children }) {
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
      <h2 className="mt-10 text-4xl font-extrabold leading-6 tracking-[-0.015em]">{content.title}</h2>
      <div className="mt-9 flex items-center justify-between">
        <span className="leading-6 tracking-[-0.015em] text-[20px] font-semibold opacity-80">{content.nick_name}</span>
        <time className="font-normal text-sm leading-6 tracking-[-0.015em] opacity-80">
          {dayjs(content.createAt).format("YYYY년 M월 D일")}
        </time>
      </div>
      <div className="flex items-center justify-between mt-[17px]">
        <TagList post={content} disabled={true} />
        <div className="flex items-center">
          <Link href="/" className="font-normal text-sm leading-6 tracking-[-0.015em] opacity-50 mr-2">
            수정
          </Link>
          <button className="font-normal text-sm leading-6 tracking-[-0.015em] opacity-50">삭제</button>
        </div>
      </div>
      <div className="mt-[92px]">{children}</div>
    </div>
  );
}
