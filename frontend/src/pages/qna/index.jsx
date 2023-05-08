"use client";
import React from "react";
import QnAList from "@/components/QnAList";
import { useQuery } from "react-query";
import { useQnAApi } from "../../recoil/qna";
import PopularTag from "@/components/PopularTag";
import CategoryNav from "@/components/CategoryNav";
import getFilteredData from "@/util/getFilteredData";
import OrderCategory from "@/components/OrderCategory";
import SearchTag from "@/components/SearchTag";
import SearchInput from "@/components/SearchInput";
import { useSearchParams } from "next/navigation";

export default function QnAListPage() {
  const searchParams = useSearchParams();
  console.log("searchparams", Object.fromEntries(searchParams.entries()));
  const { category, tag, order, search } = searchParams ? Object.fromEntries(searchParams.entries()) : {};
  console.log("page", category, tag, order, search);
  const seletedCategory = category || "";
  const seletedTagList = tag ? tag.split("+") : "";
  const seletedOrder = order || "latest";
  const currentSearch = search || "";
  const qna = useQnAApi();
  const { data, isLoading, error } = useQuery(["qnaList"], () => qna.getList(), { staleTime: 1000 * 60 * 5 });

  const filteredData = getFilteredData(
    data,
    { category: seletedCategory, tag: seletedTagList, search: currentSearch },
    seletedOrder
  );

  return (
    <section className="flex justify-center px-[32px] mt-20">
      <section className="hidden lg:block lg:w-3/12   mt-[32px] ml-[40px] max-w-[200px]">
        <div className="fixed">
          <CategoryNav
            categoryList={["frontend", "backend", "Mobile", "Bigdata", "AI"]}
            seletedCategory={seletedCategory}
          />
        </div>
      </section>
      <section className="w-full lg:w-9/12 max-w-[980px]">
        <div className="py-6">
          <SearchInput />
          <SearchTag />
        </div>
        <div className="box-content border-b pb-3">
          <OrderCategory
            seleted={seletedOrder}
            orderArray={[
              { order: "latest", name: "최신순" },
              { order: "oldest", name: "오래된순" },
            ]}
          />
        </div>
        <QnAList qnaList={filteredData} />
      </section>

      <section className="hidden lg:block lg:w-3/12 mt-[32px] ml-[40px] max-w-[200px]">
        <div className="fixed">
          <PopularTag data={data} />
        </div>
      </section>
    </section>
  );
}
