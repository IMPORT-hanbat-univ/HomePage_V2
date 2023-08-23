"use client";
import useMe from "@/hooks/useMe";
import React, { useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import useMyActivity from "@/hooks/useMyActivity";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import dayjs from "dayjs";
import Link from "next/link";
type Props = {
  type: "post" | "comment";
};

const categoryArray = [
  { category: "devnews", title: "Community - Dev News", url: "/community/devnews" },
  { category: "qna", title: "Community - QnA", url: "/community/qna" },
  { category: "notice", title: "About - Notice", url: "/about/notice" },
  { project: "project", title: "Project", url: "/project/patchnote" },
];

export default function ActivityTable({ type }: Props) {
  const params = useParams();
  const userId = parseInt(params?.id as string);
  const router = useRouter();
  const { decodeUser } = useMe();
  // if (!userId || userId !== decodeUser.userId) {
  //   alert("권한이 없습니다.");
  //   router.replace("/");
  // }
  const { data, isLoading, error } = useMyActivity(type, userId);
  console.log("data", data);
  const target = useRef<HTMLDivElement>(null);
  const filteredData = useInfiniteScroll(target, data);
  return (
    <div className="w-full overflow-x-hidde n py-8">
      <table className="w-full border-none bg-white rounded  ">
        <thead className="w-full block  md:text-[15px] tracking-[-0.225px]  ">
          <tr className="w-[99%]  flex items-center">
            <th className="w-[25%]">카테고리</th>
            <th className="w-[60%]">제목</th>
            <th className="w-[14%]">날짜</th>
          </tr>
        </thead>
        <tbody className="md:text-[12px]  tracking-[-0.225px] block overflow-auto max-h-[38rem] w-full">
          {filteredData &&
            filteredData.length > 0 &&
            filteredData.map((data) => (
              <tr className="text-center border-b  flex items-center  w-full border-[#EBEBEB] " key={data.id}>
                <td className="w-[25%] py-4 tracking-[-0.18px]">
                  {categoryArray.find((item) => item.category === data.category)?.title || data.category}
                </td>
                <th className="w-[60%] text-[15px] py-4">
                  <Link
                    href={`${categoryArray.find((item) => item.category === data.category)?.url ?? ""}/${
                      data?.postId ? data.postId : data.id
                    }`}
                    className="hover:text-import-color "
                  >
                    {data.title}
                  </Link>
                </th>
                <th className="w-[15%] py-4 tracking-[-0.18px]">{dayjs(data.createdAt).format("YYYY/MM/DD")}</th>
              </tr>
            ))}
          <tr>
            <td>
              <div className={`${data?.length === filteredData?.length ? "hidden" : "block"}`} ref={target}></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
