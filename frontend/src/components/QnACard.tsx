import React from "react";
import dayjs from "dayjs";
import { FaComment } from "react-icons/fa";
import TagList from "./TagList";
import { QnASimplePost, SimplePost } from "@/util/type";

type Props = {
  post: QnASimplePost;
};

export default function QnACard({ post }: Props) {
  const { tagF, tagS, tagT } = post;
  console.log(post, !(tagF.trim() === "" && tagS.trim() === "" && tagT.trim() === ""));
  return (
    <li className="max-w-[980px] border-b border-b-zinc-400 hover:bg-gray-100">
      <a className="cursor-pointer ">
        <div className="flex md:py-[18px] md:px-[16px] py-[18px] border-b-zinc-300">
          <div className="flex-auto w-full">
            <div className="flex flex-col md:mb-[4px] md:items-center items-start">
              <div className="flex items-center">
                <span className="font-bold overflow-hidden text-ellipsis line-clamp-1 md:hidden">{post.topic}</span>
              </div>
              <h3 className="w-full overflow-hidden text-ellipsis whitespace-normal leading-6 max-h-12 text-left break-all line-clamp-2">
                {post.title}
              </h3>
            </div>
            <p className="h-[24px] overflow-hidden text-ellipsis whitespace-normal leading-6 max-h-6 text-left break-all box line-clamp-1 text-xs">
              {post.content}
            </p>
            {!(tagF.trim() === "" && tagS.trim() === "" && tagT.trim() === "") && (
              <div className=" mt-[4px] md:mt-[8px]">
                <TagList post={post} disabled={false} />
              </div>
            )}

            <div className="!flex overflow-hidden line-clamp-1 whitespace-nowrap mt-1 md:mt-4 justify-between text-[12px] font-normal text-light-gray">
              <div className="flex-auto w-0 max-w-[520px] min-w-0 flex items-center">
                <span className="shrink overflow-ellipsis whitespace-nowrap inline-block">{post.nick_name}</span>
                <span className=" shrink-0 inline-block">&nbsp;·&nbsp;</span>
                <span className=" shrink-0 inline-block">{dayjs(post.createdAt).format("YYYY년MM월DD일")}</span>
                <span className=" shrink-0 md:inline-block hidden">&nbsp;·&nbsp;</span>
                <span className=" shrink-0 md:inline-block hidden">{post.topic}</span>
              </div>
              <div className="flex min-w-0 items-center">
                <dl className="flex">
                  <dt className="absolute hidden">답변</dt>
                  <dd className="flex items-center">
                    <FaComment className="font-[12px] mr-[4px]" />
                    <span className=" text-xs font-bold inline-block">{post.numberOfComments}</span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
}
