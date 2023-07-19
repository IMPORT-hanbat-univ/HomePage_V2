"use client";
import CardList from "@/components/CardList";
import TopicNav from "@/components/TopicNav";
import OrderCategory from "@/components/OrderCategory";
import PopularTag from "@/components/PopularTag";
import SearchInput from "@/components/SearchInput";
import SearchTag from "@/components/SearchTag";
import usePosts from "@/hooks/usePosts";
import getFilteredData from "@/util/getFilteredData";
import { useSearchParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import { DecodeUser } from "@/util/type";

type Props = {
  user: DecodeUser | {};
};

export default function DevelopmentInfo({ user }: Props) {
  const searchParams = useSearchParams();

  const { topic, tag, order, search } = Object.fromEntries(searchParams?.entries() ?? []);
  const seletedTopic = topic || "";
  const seletedTagList = tag ? tag.split("+") : "";
  const selectedOrder = order || "latest";
  const currentSearch = search || "";

  const { data, isLoading, error } = usePosts("information");

  const filteredData = getFilteredData(
    data,
    { topic: seletedTopic, tag: seletedTagList, search: currentSearch },
    selectedOrder
  );

  return (
    <section className="flex justify-center px-[32px] mt-20 ">
      <section className="hidden lg:block lg:w-3/12   mt-[32px] ml-[40px] max-w-[200px]">
        <div className="fixed">
          <TopicNav topicList={["전체", "동아리", "기술", "기타"]} selectedTopic={seletedTopic} />
        </div>
      </section>
      <section className="w-full lg:w-9/12 max-w-[980px]">
        <div className="py-6">
          <SearchInput />
          <SearchTag />
        </div>
        <div className="flex items-center justify-between border-b w-full py-1">
          <OrderCategory
            seleted={selectedOrder}
            orderArray={[
              { order: "latest", name: "최신순" },
              { order: "oldest", name: "오래된순" },
            ]}
          />
          {user && Object.keys(user).length > 0 && (
            <Link
              prefetch={false}
              href="/edit?category=notice"
              className="py-1 px-3 rounded w-auto  text-white border-none outline-none bg-import-color "
            >
              글쓰기
            </Link>
          )}
        </div>
        <CardList cardList={filteredData} />
      </section>

      <section className=" hidden lg:block lg:w-3/12 mt-[32px] ml-[40px] max-w-[200px]">
        <div className="fixed">
          <PopularTag data={data} />
        </div>
      </section>
    </section>
  );
}
