import CardList from "@/components/CardList";
import CategoryNav from "@/components/CategoryNav";
import OrderCategory from "@/components/OrderCategory";
import PopularTag from "@/components/PopularTag";
import SearchInput from "@/components/SearchInput";
import SearchTag from "@/components/SearchTag";
import { useInformationApi } from "@/recoil/information";
import getFilteredData from "@/util/getFilteredData";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

export default function DevelopmentInfo() {
  const router = useRouter();
  const { category, tag, order, search } = router.query;
  const seletedCategory = category || "";
  const seletedTagList = tag ? tag.split("+") : "";
  const seletedOrder = order || "latest";
  const currentSearch = search || "";

  const info = useInformationApi();
  const { data, isLoading, error } = useQuery(["devInfoList"], () => info.getDevList(), { staleTime: 1000 * 60 * 5 });

  const filteredData = getFilteredData(
    data,
    { category: seletedCategory, tag: seletedTagList, search: currentSearch },
    seletedOrder
  );

  return (
    <section className="flex justify-center px-[32px] mt-20 ">
      <section className=" w-3/12  mt-[32px] ml-[40px] max-w-[200px]">
        <div className="fixed">
          <CategoryNav
            categoryList={["frontend", "backend", "Mobile", "Bigdata", "AI"]}
            seletedCategory={seletedCategory}
          />
        </div>
      </section>
      <section className=" w-9/12 max-w-[980px]">
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
        <CardList cardList={filteredData} />
      </section>

      <section className=" w-3/12 mt-[32px] ml-[40px] max-w-[200px] ">
        <div className="fixed">
          <PopularTag data={data} />
        </div>
      </section>
    </section>
  );
}
