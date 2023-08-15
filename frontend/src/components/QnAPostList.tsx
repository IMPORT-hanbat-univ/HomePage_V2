"use client";
import React from "react";
import Link from "next/link";
import QnACard from "./QnACard";
import Pagination from "./ui/Pagination";
import usePagination from "@/hooks/usePagination";
import { useSearchParams, usePathname } from "next/navigation";
import { QnASimplePost } from "@/util/type";

type Props = {
  qnaList: QnASimplePost[];
};

export default function QnAPostList({ qnaList }: Props) {
  const searchParams = useSearchParams();
  const nowPage = searchParams?.get("nowPage");
  const currentPage = nowPage ? parseInt(nowPage) : 1;
  const pathname = usePathname() ?? "";
  const { page, pageData, pageRangeArray } = usePagination(qnaList, currentPage);

  return (
    <div className="flex items-center justify-center">
      <div className=" flex-shrink basis-0 grow ">
        <ul className="mb-[10px] md:mb-[30px] ">
          {pageData.map((post) => (
            <Link href={`${pathname}/${post.id}`} key={post.id}>
              <QnACard post={post} key={post.id} />
            </Link>
          ))}
        </ul>
        <Pagination nowPage={currentPage} page={page} pageRangeArray={pageRangeArray} />
      </div>
    </div>
  );
}
