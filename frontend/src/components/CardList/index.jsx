import usePagination from "@/hooks/usePagination";
import { useSearchParams } from "next/navigation";
import React from "react";
import Pagination from "../Pagination";
import CardItem from "../CardItem";

export default function CardList({ cardList }) {
  const searchParams = useSearchParams();
  const nowPage = searchParams.get("nowPage");
  const currentPage = nowPage ? parseInt(nowPage) : 1;
  const { page, pageData, pageRangeArray } = usePagination(cardList, currentPage, 18);
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-[40px] py-3">
        {pageData && pageData.length > 0 && pageData.map((item) => <CardItem post={item} key={item.id} />)}
      </div>
      <Pagination nowPage={currentPage} page={page} pageRangeArray={pageRangeArray} />
    </section>
  );
}
