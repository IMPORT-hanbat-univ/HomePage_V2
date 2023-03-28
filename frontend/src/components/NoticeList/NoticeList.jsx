import React from "react";
import { useQuery } from "react-query";
import NoticeCard from "../NoticeCard/NoticeCard";
import axios from "axios";
import usePagination from "@/hooks/usePagination";
import { useRouter } from "next/router";
import Pagination from "../Pagination/Pagination";

export default function NoticeList() {
  const router = useRouter();
  const { nowPage } = router.query;
  const currentPage = nowPage ? parseInt(nowPage) : 1;
  const {
    data: notices,
    isLoading,
    error,
  } = useQuery(["notice"], async () => {
    const result = await axios.get("/dummy/notice.json");
    console.log(result);
    return result.data.items;
  });
  const { page, pageData, pageRangeArray } = usePagination(notices, currentPage);
  console.log(page, pageData);
  return (
    <div className="p-3 flex-shrink basis-0 grow max-w-[980px]">
      <div className="mb-[32px]">{pageData && pageData.map((post) => <NoticeCard post={post} key={post.order} />)}</div>
      <Pagination currentPage={currentPage} pageRangeArray={pageRangeArray} page={page} />
    </div>
  );
}
