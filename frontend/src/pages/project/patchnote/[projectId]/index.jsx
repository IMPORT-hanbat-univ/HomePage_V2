import CommentContent from "@/components/CommentContent";
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
  console.log(monthList, monthDataList);
  console.log(data);
  return (
    <div className="flex justify-center">
      <div className="max-w-[980px] w-full px-3 ">
        {data?.project && (
          <PostContent
            content={data.project}
            pathArray={[{ name: "Development" }, { name: "Information", link: "/development/info" }]}
          ></PostContent>
        )}
      </div>
    </div>
  );
}
