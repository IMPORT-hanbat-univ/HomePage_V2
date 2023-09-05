"use client";
import React, { useState } from "react";
import ActivityTable from "./ActivityTable";
import useMe from "@/hooks/useMe";
import { useRouter, useParams } from "next/navigation";
export default function MyActivity() {
  const [type, setType] = useState<"post" | "comment">("post");
  const { decodeUser, isLoading } = useMe();
  const router = useRouter();
  const params = useParams();
  const id: string = (params?.id as string | undefined) || "";
  if (!isLoading && (!decodeUser || decodeUser.userId !== parseInt(id))) {
    router.replace("/");
  }
  const handleType = (value: "post" | "comment") => {
    setType(value);
  };
  return (
    <article className=" flex flex-col h-full justify-around px-3 md:px-4 ">
      <h2 className="md:text-[25px] tracking-[-0.375px] md:mb-14 mb-6 text-[20px]">나의 활동</h2>
      <div className="flex font-semibold text-[12px] w-fit tracking-[-0.18px] mx-auto items-center rounded-[20px] p-[2px] bg-import-color shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <button
          onClick={() => handleType("post")}
          disabled={type === "post"}
          className={`rounded-[20px] ${type === "post" ? "text-import-color bg-white" : "text-white"} px-8 py-3`}
        >
          내가 쓴 글
        </button>
        <button
          onClick={() => handleType("comment")}
          disabled={type === "comment"}
          className={`${type === "comment" ? "text-import-color bg-white" : "text-white"}  px-8 py-3 rounded-[20px]`}
        >
          내가 쓴 댓글
        </button>
      </div>
      <ActivityTable type={type} />
    </article>
  );
}
