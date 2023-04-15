import CommentContent from "@/components/CommentContent";
import PatchnoteTree from "@/components/PatchnoteTree";
import PostContent from "@/components/PostContent";
import usePatchNoteList from "@/hooks/usePatchNoteList";
import { usePatchnoteApi } from "@/recoil/patchnote";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";

export default function PatchnoteList() {
  const router = useRouter();
  const patchnoteApi = usePatchnoteApi();
  const [month, setMonth] = useState(dayjs().format("YYYY.MM"));
  const { projectId } = router.query;

  const { data, isLoading, error } = useQuery(["patchnoteList", projectId], () => patchnoteApi.getList(projectId));
  const { monthList, monthDataList } = usePatchNoteList(data?.patchnote, month);

  return (
    <div className="flex justify-center">
      <div className="max-w-[980px] w-full px-3 ">
        {data?.project && (
          <PostContent content={data.project} pathArray={[{ name: "Project" }, { name: "Patchnote", link: "/" }]}>
            <div className="flex items-center justify-center">
              <PatchnoteTree monthList={monthList} monthDataList={monthDataList} month={month} setMonth={setMonth} />
            </div>
          </PostContent>
        )}
      </div>
    </div>
  );
}
