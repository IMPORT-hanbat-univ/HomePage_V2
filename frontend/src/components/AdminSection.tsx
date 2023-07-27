"use client";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import AdminInput from "./ui/AdminInput";
import useDebounce from "@/hooks/useDebounce";
import UserTable from "./UserTable";

export default function AdminSection() {
  const searchParams = useSearchParams();
  const page = searchParams?.get("page") ?? "user";
  const [text, setText] = useState("");
  const [currentLevel, setCurrentLevel] = useState("all");
  const [requestLevel, setRequestLevel] = useState("all");
  const searchValue = useDebounce(text, 3000);

  const commonOptions = {
    valueList: [
      { title: "전체", value: "all" },
      { title: "일반회원", value: 1 },
      { value: 2, title: "동아리원" },
      { value: 3, title: "개발팀장" },
      { value: 4, title: "임원진" },
      { value: 5, title: "관리자" },
    ],
    onChange: (e: ChangeEvent<HTMLSelectElement>) => setCurrentLevel(e.target.value),
  };

  let selectArray = [];

  switch (page) {
    case "level": {
      selectArray = [
        { ...commonOptions, value: currentLevel },
        {
          ...commonOptions,
          value: requestLevel,
          onChange: (e: ChangeEvent<HTMLSelectElement>) => setRequestLevel(e.target.value),
        },
      ];
      break;
    }
    default: {
      selectArray = [{ ...commonOptions, value: currentLevel }];
    }
  }

  console.log(currentLevel, requestLevel, searchValue);

  return (
    <div className="p-20">
      <AdminInput
        selectArray={selectArray}
        text={text}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
      />
      <UserTable />
    </div>
  );
}
