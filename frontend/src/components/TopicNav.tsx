"use client";
import Link from "next/link";

import React from "react";
import cls from "classnames";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  topicList: string[];
  selectedTopic?: string;
};

export default function TopicNav({ topicList, selectedTopic }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = searchParams ? Object.fromEntries(searchParams.entries()) : {};

  return (
    <nav className="w-full ">
      <h6 className="mb-[1em] h-[20px] text-xs text-light-gray">주제</h6>
      <ul>
        {topicList.map((topic) => (
          <li key={topic} className="py-2 px-3">
            <Link
              className={cls("text-base cursor-pointer hover:text-opacity-40", {
                "text-lg font-semibold text-import-color": topic === selectedTopic,
              })}
              href={`${pathname}?${new URLSearchParams({ ...query, topic }).toString()}`}
            >
              {topic}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
