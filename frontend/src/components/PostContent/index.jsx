import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";

export default function PostContent({ content }) {
  return (
    <div>
      <div className="mt-[224px] pl-1 flex items-center">
        <button className="flex justify-center items-center  mr-[32px]">
          <IoHomeOutline className="w-[24px] h-[24px]" />
        </button>
        <MdArrowForwardIos className="w-[24px] h-[24px] mr-[32px]" />
        <span className="text-[15px] font-normal leading-6 tracking-[-0.015em] opacity-80">{content.category}</span>
      </div>
      <h2 className="mt-10 text-4xl font-extrabold leading-6 tracking-[-0.015em]">{content.title}</h2>
      <div className="mt-[15px] flex items-center justify-between">
        <span className="leading-6 tracking-[-0.015em] text-[20px] font-semibold opacity-80">{content.nick_name}</span>
      </div>
    </div>
  );
}
