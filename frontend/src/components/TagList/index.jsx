import React from "react";

export default function TagList({ post }) {
  return (
    <div className="flex min-h-[32px]">
      {post.tagF && (
        <button
          onClick={() => clickTag(post.tagF)}
          className="bg-tag-bg-color text-tag-text bg-opacity-10 mr-[8px] mb-[5px] py-[4px] px-[8px] height-[26px] border-none  leading-5 text-[13px] w-fit inline-flex items-center justify-center rounded-[40px] font-medium cursor-pointer"
        >
          #{post.tagF}
        </button>
      )}
      {post.tagS && (
        <button
          onClick={() => clickTag(post.tagS)}
          className="bg-tag-bg-color text-tag-text bg-opacity-10 mr-[8px] mb-[5px] py-[4px] px-[8px] height-[26px] border-none  leading-5 text-[13px] w-fit inline-flex items-center justify-center rounded-[40px] font-medium cursor-pointer"
        >
          #{post.tagS}
        </button>
      )}
      {post.tagT && (
        <button
          onClick={() => clickTag(post.tagT)}
          className="bg-tag-bg-color text-tag-text bg-opacity-10 mr-[8px] mb-[5px] py-[4px] px-[8px] height-[26px] border-none leading-5 text-[13px] w-fit inline-flex items-center justify-center rounded-[40px] font-medium cursor-pointer"
        >
          #{post.tagT}
        </button>
      )}
    </div>
  );
}
