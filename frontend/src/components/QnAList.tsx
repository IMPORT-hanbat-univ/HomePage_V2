"use client";
import React from "react";

import PopularTag from "@/components/PopularTag";

import getFilteredData from "@/util/getFilteredData";
import OrderCategory from "@/components/OrderCategory";
import SearchTag from "@/components/SearchTag";
import SearchInput from "@/components/SearchInput";
import { useSearchParams } from "next/navigation";
import usePosts from "@/hooks/usePosts";
import TopicNav from "./TopicNav";
import { DecodeUser, QnASimplePost } from "@/util/type";
import QnAPostList from "./QnAPostList";
import Link from "next/link";
type Props = {
  user: DecodeUser | {};
};

export default function QnAList({ user }: Props) {
  const searchParams = useSearchParams();
  const {
    topic = "",
    tag = "",
    order = "latest",
    search = "",
  } = searchParams ? Object.fromEntries(searchParams.entries()) : {};

  const selectedTopic = topic;
  const seletedTagList = tag.split("+");

  const selectedOrder = order;
  const currentSearch = search;
  const { data, isLoading, error } = usePosts("qna");
  const filteredData: QnASimplePost[] = getFilteredData(
    data,
    { topic: selectedTopic, tag: seletedTagList, search: currentSearch },
    selectedOrder
  );

  return (
    <section className="flex justify-center px-[32px] mt-20">
      <section className="hidden lg:block lg:w-3/12   mt-[32px] ml-[40px] max-w-[200px]">
        <div className="fixed">
          <TopicNav topicList={["전체", "동아리", "기술", "기타"]} selectedTopic={selectedTopic} />
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
              href="/edit?category=qna"
              className="py-1 px-3 rounded w-auto  text-white border-none outline-none bg-import-color "
            >
              글쓰기
            </Link>
          )}
        </div>
        <QnAPostList qnaList={filteredData} />
      </section>

      <section className="hidden lg:block lg:w-3/12 mt-[32px] ml-[40px] max-w-[200px]">
        <div className="fixed">
          <PopularTag data={data} />
        </div>
      </section>
    </section>
  );
}
