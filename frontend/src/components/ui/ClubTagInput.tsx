"use client";
import React, { Dispatch, KeyboardEvent, SetStateAction, useCallback } from "react";

type Props = {
  value: string;
  label: string;
  name: string;

  tagList: string[];
  setValue: Dispatch<SetStateAction<string>>;
  setTagList: Dispatch<SetStateAction<string[]>>;
};

export default function ClubTagInput({
  value,
  label,
  name,

  tagList,
  setTagList,
  setValue,
}: Props) {
  const removeTag = React.useCallback(
    (tag: string) => {
      if (tagList.length > 1) {
        const filteredTag = tagList.filter((item) => item !== tag);

        setTagList(filteredTag);
      } else {
        setTagList([]);
      }
    },
    [tagList]
  );

  const pressTagInput = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (value.trim() === "") {
          return;
        } else if (tagList.find((prevFrame) => prevFrame === value.trim())) {
          return;
        } else {
          setTagList((prev) => [...prev, value]);
          setValue("");
        }
      }
    },
    [tagList, value]
  );

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
              onClick={() => removeTag(tag)}
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
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={pressTagInput}
            placeholder="프레임워크를 입력해주세요"
          />
        </div>
      </div>
    </>
  );
}
