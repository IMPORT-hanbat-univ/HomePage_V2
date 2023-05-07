import usePopularTag from "@/hooks/usePopularTag";
import { useRouter } from "next/navigation";
import React from "react";

export default function PopularTag({ data }) {
  const router = useRouter();
  const { tag } = router.query;
  const tagArray = usePopularTag(data);
  const clickTag = (seletedTag) => {
    if (tag && tag.trim() !== "") {
      if (tag.includes(seletedTag)) {
        return;
      }
      const newTag = `${tag}+${seletedTag}`;
      router.push({ pathname: router.pathname, query: { ...router.query, tag: newTag } }, undefined, { shallow: true });
    } else {
      router.push({ pathname: router.pathname, query: { ...router.query, tag: seletedTag } }, undefined, {
        shallow: true,
      });
    }
  };

  return (
    <div className="mb-3 w-full">
      <div className="py-4 px-5 border rounded-sm">
        <h2 className="mb-3 text-sm font-bold">인기 태그</h2>
        <ul className="grid grid-cols-2  -mb-2">
          {tagArray &&
            tagArray.length > 0 &&
            tagArray.map((tag) => (
              <li key={tag} className="mr-3 mb-2">
                <button
                  onClick={() => clickTag(tag)}
                  className="w-fit h-[26px] px-2 py-1 border-none bg-tag-bg-color text-tag-text bg-opacity-10 rounded-sm whitespace-nowrap text-sm hover:opacity-70"
                >
                  <span>#</span>
                  <span className="mb-[1px">{tag}</span>
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
