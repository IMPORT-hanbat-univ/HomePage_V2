"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React from "react";
import cls from "classnames";
import { Notice } from "@/util/type";
export default function TagList({
  post,
  disabled,
}: {
  post: { tagF: string; tagS: string; tagT: string };
  disabled: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tag = searchParams?.get("tag");
  const pathname = usePathname();
  const query = searchParams ? Object.fromEntries(searchParams.entries()) : {};
  const clickTag = (seletedTag: string) => {
    let queryString = "";
    if (tag && tag.trim() !== "") {
      if (tag.includes(seletedTag)) {
        return;
      }
      const newTag = `${tag}+${seletedTag}`;
      queryString = new URLSearchParams({ ...query, tag: newTag }).toString();
    } else {
      queryString = new URLSearchParams({ ...query, tag: seletedTag }).toString();
    }
    router.push(`${pathname}?${queryString}`);
  };

  return (
    <div className="flex items-center min-h-[32px]">
      {post.tagF && post.tagF !== "" && (
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
      {post.tagS && post.tagS !== "" && (
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
      {post.tagT && post.tagT !== "" && (
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
