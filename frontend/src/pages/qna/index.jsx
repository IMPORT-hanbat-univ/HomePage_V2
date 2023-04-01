import React from "react";
import QnAList from "@/components/QnAList";
import { useQuery } from "react-query";
import { useQnAApi } from "../../recoil/qna";
import PopularTag from "@/components/PopularTag";
import { useRouter } from "next/router";
import CategoryNav from "@/components/CategoryNav";
import getFilteredData from "@/util/getFilteredData";
import OrderCategory from "@/components/OrderCategory";
import SearchTag from "@/components/SearchTag";
import SearchInput from "@/components/SearchInput";

export default function QnAListPage() {
  const router = useRouter();
  const { category, tag, order, search } = router.query;
  const seletedCategory = category || "";
  const seletedTagList = tag ? tag.split("+") : "";
  const seletedOrder = order || "latest";
  const currentSearch = search || "";
  const qna = useQnAApi();
  const { data, isLoading, error } = useQuery(["qnaList"], () => qna.getList(), { staleTime: 1000 * 60 * 5});

  const filteredData = getFilteredData(data, { category: seletedCategory, tag: seletedTagList, search: currentSearch }, seletedOrder);
  
  return (
    <section className="flex px-[32px] mt-20">
      <section className=" w-3/12  mt-[32px] ml-[40px] max-w-[200px]">
        <CategoryNav
          categoryList={["frontend", "backend", "Mobile", "Bigdata", "AI"]}
          seletedCategory={seletedCategory}
        />
      </section>
      <section className=" w-9/12 max-w-[980px]">
        <div className="py-6">
          <SearchInput />
          <SearchTag />
        </div>
        <div className="box-content border-b pb-3">
        <OrderCategory seleted={seletedOrder} orderArray={[{order:"latest", name: "최신순"}, {order:"oldest", name: "오래된순"}]} />
        </div>
        <QnAList qnaList={filteredData} />
      </section>
     
      <section className=" w-3/12 mt-[32px] ml-[40px] max-w-[200px]">
        <PopularTag data={data} />
      </section>
    </section>
  );
}
