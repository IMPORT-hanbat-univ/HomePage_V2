"use client";
import React from "react";
import CommentContent from "@/components/CommentContent";
import MarkdownViewer from "@/components/MarkdownViewer";
import PostContent from "@/components/PostContent";
import { useRouter, useSearchParams } from "next/navigation";

import { useQuery } from "react-query";
import { usePatchnoteApi } from "@/recoil/patchnote";
import PatchnoteNav from "@/components/PatchnoteNav";

export default function PatchnoteDetail() {
  const searchParams = useSearchParams();
  const { patchnoteId, projectId } = searchParams ? Object.fromEntries(searchParams.entries()) : {};
  const patchnoteApi = usePatchnoteApi();
  const {
    data: patchnoteDetail,
    isLoading,
    error,
  } = useQuery(["patchnoteDetail", patchnoteId], () => patchnoteApi.getDetail(patchnoteId));
  return (
    <div className="flex justify-center">
      <div className="max-w-[980px] w-full px-3 ">
        {patchnoteDetail?.patchnote && (
          <PostContent
            content={patchnoteDetail.patchnote}
            pathArray={[{ name: "Project" }, { name: "Patchnote", link: `/project/patchnote/${projectId}` }]}
          >
            <MarkdownViewer text={patchnoteDetail.patchnote.content} />
            <div className="mt-20">
              <PatchnoteNav />
            </div>
          </PostContent>
        )}
        <div className="my-[90px]">
          {patchnoteDetail?.comment && <CommentContent comments={patchnoteDetail.comment} />}
        </div>
      </div>
    </div>
  );
}
