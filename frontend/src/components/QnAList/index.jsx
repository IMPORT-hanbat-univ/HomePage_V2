import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import QnACard from "../QnACard";
import Pagination from "../Pagination";
import usePagination from "@/hooks/usePagination";

export default function QnAList({ qnaList }) {
  const router = useRouter();
  const { nowPage } = router.query;
  const currentPage = nowPage ? parseInt(nowPage) : 1;

  const { page, pageData, pageRangeArray } = usePagination(qnaList, currentPage);
  return (
    <div className="flex items-center justify-center">
      <div className=" flex-shrink basis-0 grow ">
        <ul className="mb-[30px] ">
          {pageData.map((post) => (
            <QnACard post={post} key={post.id} />
          ))}
        </ul>
        <Pagination nowPage={currentPage} page={page} pageRangeArray={pageRangeArray} />
      </div>
    </div>
  );
}
