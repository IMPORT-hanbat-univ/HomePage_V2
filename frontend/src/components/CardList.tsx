"use client";
import usePagination from "@/hooks/usePagination";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import Pagination from "./ui/Pagination";
import CardItem from "./CardItem";
import { SimplePost } from "@/util/type";
import Link from "next/link";
type Props = {
  cardList: SimplePost[];
};

export default function CardList({ cardList }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const nowPage = searchParams?.get("nowPage");
  const currentPage = nowPage ? parseInt(nowPage) : 1;
  const { page, pageData, pageRangeArray } = usePagination(cardList, currentPage, 18);
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-[40px] py-3">
        {pageData &&
          pageData.length > 0 &&
          pageData.map((item) => (
            <Link href={`${pathname}/${item.id}`} key={item.id}>
              <CardItem post={item} />
            </Link>
          ))}
      </div>
      <Pagination nowPage={currentPage} page={page} pageRangeArray={pageRangeArray} />
    </section>
  );
}
