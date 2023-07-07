"use client";
import React, { useEffect } from "react";

import NoticeCard from "./NoticeCard";
import usePagination from "@/hooks/usePagination";
import { useSearchParams } from "next/navigation";
import Pagination from "./Pagination";
import { Notice } from "@/util/type";

import Link from "next/link";
import { useQuery } from "react-query";
import { getNoticeList } from "@/api/notice";
import OrderCategory from "./OrderCategory";
import getFilteredData from "@/util/getFilteredData";

const NoticeList = ({ user }: { user: any }) => {
  const searchParams = useSearchParams();

  const order = searchParams?.get("order");
  const selectedOrder = order || "latest";
  const nowPage: string | null | undefined = searchParams?.get("nowPage");

  const currentPage = nowPage ? parseInt(nowPage) : 1;
  const { data: notices, isLoading, error } = useQuery(["noticeList"], async () => await getNoticeList());
  const filteredData = getFilteredData(notices, { category: "", tag: "", search: "" }, selectedOrder);
  const {
    page,
    pageData = [],
    pageRangeArray,
  }: { page: number; pageData: Notice[] | []; pageRangeArray: number[] } = usePagination(filteredData, currentPage);

  console.log("pageData", pageData);
  return (
    <div className="p-3 flex-shrink basis-0 grow max-w-[980px]">
      <div className="mb-[32px]">
        <div className="flex items-center justify-between border-b w-full py-1">
          <OrderCategory
            seleted={selectedOrder}
            orderArray={[
              { order: "latest", name: "최신순" },
              { order: "oldest", name: "오래된순" },
            ]}
          />
          {user && Object.keys(user).length > 0 && (
            <Link
              prefetch={false}
              href="/about/edit?category=notice"
              className="py-1 px-3 rounded w-auto  text-white border-none outline-none bg-import-color "
            >
              글쓰기
            </Link>
          )}
        </div>
        {pageData &&
          typeof pageData !== "string" &&
          pageData.length > 0 &&
          pageData.map((post, index) => <NoticeCard index={index} post={post} key={post?.id} />)}
      </div>
      <Pagination nowPage={currentPage} pageRangeArray={pageRangeArray} page={page} id={null} />
    </div>
  );
};

export default NoticeList;
