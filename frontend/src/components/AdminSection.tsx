"use client";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import AdminInput from "./ui/AdminInput";
import useDebounce from "@/hooks/useDebounce";
import UserTable from "./UserTable";
import { DecodeUser } from "@/util/type";
import RankTable from "./RankTable";
import PostTable from "./PostTable";
import { request } from "http";

export default function AdminSection() {
  const searchParams = useSearchParams();
  const page = searchParams?.get("page") ?? "user";
  const [text, setText] = useState("");
  const [currentRank, setCurrentRank] = useState("all");
  const [requestRank, setRequestRank] = useState("all");
  const [category, setCategory] = useState("all");
  const searchValue = useDebounce(text, 3000);

  const commonOptions = {
    valueList: [
      { title: "전체", value: "all" },
      { title: "일반회원", value: "1" },
      { value: "2", title: "동아리원" },
      { value: "3", title: "개발팀장" },
      { value: "4", title: "임원진" },
      { value: "5", title: "관리자" },
    ],
    onChange: (e: ChangeEvent<HTMLSelectElement>) => setCurrentRank(e.target.value),
  };

  let selectArray: any[] = [];

  switch (page) {
    case "rank": {
      selectArray = [
        { ...commonOptions, value: currentRank },
        {
          ...commonOptions,
          value: requestRank,
          onChange: (e: ChangeEvent<HTMLSelectElement>) => setRequestRank(e.target.value),
        },
      ];
      break;
    }
    case "user": {
      selectArray = [{ ...commonOptions, value: currentRank }];
      break;
    }
    case "post": {
      selectArray = [
        {
          valueList: [
            { title: "전체", value: "all" },
            { title: "Notice", value: "notice" },
            { title: "DevNews", value: "devNews" },
            { title: "QnA", value: "qna" },
          ],
          onChange: (e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value),
        },
      ];
    }
  }

  return (
    <div className="p-20 ">
      <AdminInput
        selectArray={selectArray}
        text={text}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
      />
      {page === "user" ? (
        <UserTable currentRank={currentRank} searchValue={searchValue} />
      ) : page === "rank" ? (
        <RankTable currentRank={currentRank} requestRank={requestRank} searchValue={searchValue} />
      ) : (
        <PostTable searchValue={searchValue} category={category} />
      )}
    </div>
  );
}
