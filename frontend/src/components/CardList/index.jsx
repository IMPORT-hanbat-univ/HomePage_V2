import usePagination from "@/hooks/usePagination";
import { useRouter } from "next/router";
import React from "react";
import Pagination from "../Pagination";
import CardItem from "../CardItem";

export default function CardList({ cardList }) {
  const router = useRouter();
  const { nowPage } = router.query;
  const currentPage = nowPage ? parseInt(nowPage) : 1;
  console.log("cardList", cardList);
  const { page, pageData, pageRangeArray } = usePagination(cardList, currentPage, 18);
  console.log("pageData", pageData);
  return (
    <section>
      <div className="grid grid-cols-1 md:grid lg:grid-cols-2 xl:grid-cols-3 gap-x-[40px] py-3">
        {pageData && pageData.length > 0 && pageData.map((item) => <CardItem post={item} key={item.id} />)}
      </div>
      <Pagination nowPage={currentPage} page={page} pageRangeArray={pageRangeArray} />
    </section>
  );
}
