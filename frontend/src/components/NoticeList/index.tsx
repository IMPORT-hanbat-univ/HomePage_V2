"use client";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import NoticeCard from "../NoticeCard";
import usePagination from "@/hooks/usePagination";
import { useSearchParams } from "next/navigation";
import Pagination from "../Pagination";
import { Notice } from "@/util/type";
import { notFound } from "next/navigation";
import { getNoticeList } from "@/api/notice";

export default function NoticeList() {
  const { data: notices, isLoading, error } = useQuery(["noticeList"], async () => await getNoticeList());

  const searchParams = useSearchParams();
  const nowPage: string | null | undefined = searchParams?.get("nowPage");

  const currentPage = nowPage ? parseInt(nowPage) : 1;
  if (typeof notices === "string") {
    notFound();
  }
  const {
    page,
    pageData = [],
    pageRangeArray,
  }: { page: number; pageData: Notice[] | []; pageRangeArray: number[] } = usePagination(notices, currentPage);

  console.log("pageData", pageData);
  return (
    <div className="p-3 flex-shrink basis-0 grow max-w-[980px]">
      <div className="mb-[32px]">
        {pageData &&
          typeof pageData !== "string" &&
          pageData.length > 0 &&
          pageData.map((post, index) => <NoticeCard order={index} post={post} key={post?.id} />)}
      </div>
      <Pagination nowPage={currentPage} pageRangeArray={pageRangeArray} page={page} id={null} />
    </div>
  );
}
