import React from "react";

import QnACard from "../QnACard";
import Pagination from "../Pagination";
import usePagination from "@/hooks/usePagination";
import { useSearchParams } from "next/navigation";

export default function QnAList({ qnaList }) {
  const searchParams = useSearchParams();
  const nowPage = searchParams.get("nowPage");
  const currentPage = nowPage ? parseInt(nowPage) : 1;

  const { page, pageData, pageRangeArray } = usePagination(qnaList, currentPage);
  return (
    <div className="flex items-center justify-center">
      <div className=" flex-shrink basis-0 grow ">
        <ul className="mb-[10px] md:mb-[30px] ">
          {pageData.map((post) => (
            <QnACard post={post} key={post.id} />
          ))}
        </ul>
        <Pagination nowPage={currentPage} page={page} pageRangeArray={pageRangeArray} />
      </div>
    </div>
  );
}
