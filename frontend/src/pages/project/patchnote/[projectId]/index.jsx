import CommentContent from "@/components/CommentContent";
import PatchnoteTree from "@/components/PatchnoteTree";
import PostContent from "@/components/PostContent";
import usePatchnoteList from "@/hooks/usePatchnoteList";
import { usePatchnoteApi } from "@/recoil/patchnote";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function PatchnoteList() {
  const router = useRouter();
  const patchnoteApi = usePatchnoteApi();
  const { projectId } = router.query;

  const { data, isLoading, error } = useQuery(["patchnoteList", projectId], () => patchnoteApi.getList(projectId));
  const { month, setMonth, monthList, monthDataList } = usePatchnoteList(data?.patchnote);

  return (
    <div className="flex justify-center">
      <div className="max-w-[980px] w-full px-3 ">
        {data?.project && (
          <PostContent content={data.project} pathArray={[{ name: "Project" }, { name: "Patchnote", link: "/" }]}>
            <div className="flex flex-col items-center justify-center">
              <PatchnoteTree monthList={monthList} monthDataList={monthDataList} month={month} setMonth={setMonth} />
              <Link
                href={`/project/${data.project.id}`}
                className="my-20 text-lg font-extrabold leading-6 tracking-[-0.015em] bg-blue-500 rounded-full text-white px-3 py-3"
              >
                프로젝트 소개 보러가기
              </Link>
            </div>
          </PostContent>
        )}
      </div>
    </div>
  );
}
