import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React from "react";
import cls from "classnames";
export default function TagList({ post, disabled }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const pathname = usePathname();
  const query = searchParams ? Object.fromEntries(searchParams.entries()) : {};
  const clickTag = (seletedTag) => {
    if (tag && tag.trim() !== "") {
      if (tag.includes(seletedTag)) {
        return;
      }
      const newTag = `${tag}+${seletedTag}`;
      router.push({ pathname: pathname, query: { ...query, tag: newTag } }, undefined, { shallow: true });
    } else {
      router.push({ pathname: pathname, query: { ...query, tag: seletedTag } }, undefined, {
        shallow: true,
      });
    }
  };
  return (
    <div className="flex min-h-[32px]">
      {post.tagF && (
        <button
          disabled={disabled}
          onClick={() => clickTag(post.tagF)}
          className={cls(
            "bg-tag-bg-color text-tag-text bg-opacity-10 mr-[8px] mb-[5px] py-[4px] px-[8px] height-[26px] border-none  leading-5 text-[13px] w-fit inline-flex items-center justify-center rounded-[40px] font-medium cursor-pointer",
            { "cursor-none": disabled }
          )}
        >
          #{post.tagF}
        </button>
      )}
      {post.tagS && (
        <button
          disabled={disabled}
          onClick={() => clickTag(post.tagS)}
          className={cls(
            "bg-tag-bg-color text-tag-text bg-opacity-10 mr-[8px] mb-[5px] py-[4px] px-[8px] height-[26px] border-none  leading-5 text-[13px] w-fit inline-flex items-center justify-center rounded-[40px] font-medium cursor-pointer",
            { "cursor-none": disabled }
          )}
        >
          #{post.tagS}
        </button>
      )}
      {post.tagT && (
        <button
          disabled={disabled}
          onClick={() => clickTag(post.tagT)}
          className={cls(
            "bg-tag-bg-color text-tag-text bg-opacity-10 mr-[8px] mb-[5px] py-[4px] px-[8px] height-[26px] border-none  leading-5 text-[13px] w-fit inline-flex items-center justify-center rounded-[40px] font-medium cursor-pointer",
            { "cursor-none": disabled }
          )}
        >
          #{post.tagT}
        </button>
      )}
    </div>
  );
}
