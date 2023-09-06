"use client";
import React, { KeyboardEvent } from "react";

type Props = {
  value: string;
  label: string;
  name: string;
  onChange: (value: string) => void;
  onKeydown: (e: KeyboardEvent<HTMLInputElement>, name: string) => void;
  tagList: string[];
  onRemove: (tag: string, name: string) => void;
};

export default function ClubTagInput({ value, label, name, onChange, onKeydown, tagList, onRemove }: Props) {
  return (
    <>
      <label htmlFor={name} className="md:text-[13px] text-[12px] tracking-[-0.195px] text-[#565656]">
        {label}
      </label>
      <div className="w-full">
        <div className="w-full overflow-x-auto overflow-y-hidden items-center border  rounded-[10px] p-1  flex grow ">
          {tagList.map((tag) => (
            <button
              key={tag}
              onClick={() => onRemove(tag, name)}
              className="bg-[#EFEFEF] rounded-[10px]    w-fit px-2 py-1 whitespace-nowrap text-xs border-none mt-1 mr-2 mb-1 gap-2 flex item-center"
            >
              {tag}
              <svg
                className=" h-4"
                width="6"
                height="7"
                viewBox="0 0 6 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1.31274L5 6.31241" stroke="#515151" strokeLinecap="round" />
                <path d="M1 6.3125L4.99955 1.3125" stroke="#515151" strokeLinecap="round" />
              </svg>
            </button>
          ))}
          <input
            id={name}
            name={name}
            className="w-full md:text-[15px] text-[12px] border-none bg-none outline-none"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => onKeydown(e, name)}
            placeholder="프레임워크를 입력해주세요"
          />
        </div>
      </div>
    </>
  );
}
