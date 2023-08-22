"use client";
import useMe from "@/hooks/useMe";

import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  category?: string;
};

export default function ProfileNav({ category }: Props) {
  const { decodeUser, error } = useMe();

  const router = useRouter();
  const handleCategory = (value: string) => {
    const queryString = `category=${value}`;
    if (!decodeUser?.userId) {
      return;
    }
    router.push(`/mypage/${decodeUser.userId}?${queryString}`);
  };
  return (
    <div className="flex flex-col gap-6 rounded-[10px] border bg-white border-[#E2E2E2] w-fit  px-10 py-4  shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <button
        onClick={() => handleCategory("profile")}
        className={`flex items-center gap-9 ${category === "profile" && "text-import-color"}`}
      >
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.5 8C16.5 12.1421 13.1421 15.5 9 15.5C4.85786 15.5 1.5 12.1421 1.5 8C1.5 3.85786 4.85786 0.5 9 0.5C13.1421 0.5 16.5 3.85786 16.5 8Z"
            stroke={category === "profile" ? "#4CD773" : "black"}
          />
          <path
            d="M11.5 6C11.5 7.38071 10.3807 8.5 9 8.5C7.61929 8.5 6.5 7.38071 6.5 6C6.5 4.61929 7.61929 3.5 9 3.5C10.3807 3.5 11.5 4.61929 11.5 6Z"
            stroke={category === "profile" ? "#4CD773" : "black"}
          />
          <path d="M1 18H17" stroke={category === "profile" ? "#4CD773" : "black"} stroke-linecap="round" />
          <path d="M8 21.5H14" stroke={category === "profile" ? "#4CD773" : "black"} stroke-linecap="round" />
          <path d="M4 21.5H6" stroke={category === "profile" ? "#4CD773" : "black"} stroke-linecap="round" />
          <path
            d="M4 13.5V13.5C6.3786 9.93211 11.6214 9.93211 14 13.5V13.5"
            stroke={category === "profile" ? "#4CD773" : "black"}
            stroke-linecap="round"
          />
        </svg>
        <span className="text-[15px] tracking-[-0.225px]">프로필</span>
      </button>
      <button
        onClick={() => handleCategory("activity")}
        className={`flex items-center gap-9 ${category === "activity" && "text-import-color"}`}
      >
        <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="4.5"
            y1="1.5"
            x2="15.5"
            y2="1.5"
            stroke={category === "activity" ? "#4CD773" : "black"}
            stroke-linecap="round"
          />
          <circle cx="1.5" cy="1.5" r="1.1" stroke={category === "activity" ? "#4CD773" : "black"} stroke-width="0.8" />
          <line
            x1="4.5"
            y1="11.5"
            x2="15.5"
            y2="11.5"
            stroke={category === "activity" ? "#4CD773" : "black"}
            stroke-linecap="round"
          />
          <circle
            cx="1.5"
            cy="11.5"
            r="1.1"
            stroke={category === "activity" ? "#4CD773" : "black"}
            stroke-width="0.8"
          />
          <line
            x1="4.5"
            y1="6.5"
            x2="15.5"
            y2="6.5"
            stroke={category === "activity" ? "#4CD773" : "black"}
            stroke-linecap="round"
          />
          <circle cx="1.5" cy="6.5" r="1.1" stroke={category === "activity" ? "#4CD773" : "black"} stroke-width="0.8" />
        </svg>

        <span className="text-[15px] tracking-[-0.225px]">나의 활동</span>
      </button>
    </div>
  );
}
