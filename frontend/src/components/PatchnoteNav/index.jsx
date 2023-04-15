import usePatchnoteNav from "@/hooks/usePatchnoteNav";
import { usePatchnoteApi } from "@/recoil/patchnote";
import { useRouter } from "next/router";
import React from "react";
import cls from "classnames";
import { useQuery } from "react-query";
import Link from "next/link";

export default function PatchnoteNav() {
  const router = useRouter();
  const { patchnoteId, projectId } = router.query;
  const patchnoteApi = usePatchnoteApi();
  const {
    data: patchnoteDetail,
    isLoading,
    error,
  } = useQuery(["patchnoteDetail", patchnoteId], () => patchnoteApi.getDetail(patchnoteId));
  const { data: patchnoteList } = useQuery(["patchnoteList", projectId], () => patchnoteApi.getList(projectId));
  const { prevPatchnote, nextPatchnote } = usePatchnoteNav(patchnoteList?.patchnote, patchnoteDetail?.patchnote);
  console.log(prevPatchnote, nextPatchnote);
  return (
    <div
      className={cls(
        "flex items-center justify-between",
        { "justify-start": prevPatchnote && !nextPatchnote },
        { "justify-end": !prevPatchnote && nextPatchnote }
      )}
    >
      {prevPatchnote && (
        <Link
          className="border-2 border-blue-500 w-80 py-2 rounded-2xl px-4 text-blue-500"
          href={`/project/patchnote/${projectId}/${prevPatchnote.id}`}
        >
          <div className="font-extrabold leading-6 text-2xl tracking-[-0.015em]">이전 패치</div>
          <div className="overflow-hidden whitespace-nowrap text-ellipsis leading-6 tracking-[-0.015em] text-xl font-semibold">
            {prevPatchnote.title}
          </div>
        </Link>
      )}
      {nextPatchnote && (
        <Link
          href={`/project/patchnote/${projectId}/${nextPatchnote.id}`}
          className="border-2 border-blue-500 w-80 py-2 rounded-2xl px-4 text-blue-500"
        >
          <div className="font-extrabold leading-6 text-2xl tracking-[-0.015em]">다음 패치</div>
          <div className="overflow-hidden whitespace-nowrap text-ellipsis leading-6 tracking-[-0.015em] text-xl font-semibold">
            {nextPatchnote.title}
          </div>
        </Link>
      )}
    </div>
  );
}
