import React from "react";
import { useQuery } from "react-query";
import NoticeCard from "../NoticeCard";
import axios from "axios";
import usePagination from "@/hooks/usePagination";
import { useRouter } from "next/router";
import Pagination from "../Pagination";

export default function NoticeList({ notices }) {
  const router = useRouter();
  const { nowPage } = router.query;
  const currentPage = nowPage ? parseInt(nowPage) : 1;

  const { page, pageData, pageRangeArray } = usePagination(notices, currentPage);
  return (
    <div className="p-3 flex-shrink basis-0 grow max-w-[980px]">
      <div className="mb-[32px]">{pageData && pageData.map((post) => <NoticeCard post={post} key={post.id} />)}</div>
      <Pagination nowPage={currentPage} pageRangeArray={pageRangeArray} page={page} />
    </div>
  );
}
