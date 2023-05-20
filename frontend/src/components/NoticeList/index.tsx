"use client";
import React, { useEffect } from "react";

import NoticeCard from "../NoticeCard";
import usePagination from "@/hooks/usePagination";
import { useSearchParams } from "next/navigation";
import Pagination from "../Pagination";
import { Notice } from "@/util/type";

import Link from "next/link";

const NoticeList = ({ notices, user }: { notices: Notice[] | [] | null; user: any }) => {
  const searchParams = useSearchParams();
  const nowPage: string | null | undefined = searchParams?.get("nowPage");

  const currentPage = nowPage ? parseInt(nowPage) : 1;

  const {
    page,
    pageData = [],
    pageRangeArray,
  }: { page: number; pageData: Notice[] | []; pageRangeArray: number[] } = usePagination(notices, currentPage);

  console.log("pageData", pageData);
  return (
    <div className="p-3 flex-shrink basis-0 grow max-w-[980px]">
      <div className="mb-[32px]">
        <div className="flex items-center justify-end">
          {user && Object.keys(user).length > 0 && (
            <Link
              prefetch={false}
              href="/about/notice/edit"
              className="py-2 px-1 rounded text-white border-none outline-none bg-import-color"
            >
              글쓰기
            </Link>
          )}
        </div>
        {pageData &&
          typeof pageData !== "string" &&
          pageData.length > 0 &&
          pageData.map((post, index) => <NoticeCard order={index} post={post} key={post?.id} />)}
      </div>
      <Pagination nowPage={currentPage} pageRangeArray={pageRangeArray} page={page} id={null} />
    </div>
  );
};

export default NoticeList;
