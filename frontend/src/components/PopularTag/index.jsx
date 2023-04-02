import usePopularTag from "@/hooks/usePopularTag";
import React from "react";

export default function PopularTag({ data }) {
  const tagArray = usePopularTag(data);
  return (
    <div className="mb-3 w-full ">
      <div className="py-4 px-5 border rounded-sm">
        <h2 className="mb-3 text-sm font-bold">인기 태그</h2>
        <ul className="flex flex-wrap -mb-2">
          {tagArray &&
            tagArray.length > 0 &&
            tagArray.map((tag) => (
              <li key={tag[0]} className="mr-3 mb-2">
                <button className="w-fit h-[26px] px-2 py-1 border-none bg-tag-bg-color text-tag-text bg-opacity-10 rounded-sm whitespace-nowrap text-sm hover:opacity-70">
                  <span>#</span>
                  <span className="mb-[1px">{tag[0]}</span>
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
