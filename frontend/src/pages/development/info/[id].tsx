import CommentContent from "@/components/CommentContent";
import MarkdownViewer from "@/components/MarkdownViewer";
import PostContent from "@/components/PostContent";
import { useInformationApi } from "@/recoil/information";
import { useParams } from "next/navigation";
import React from "react";

import { useQuery } from "react-query";
export default function DevelopmentDetail() {
  const params = useParams();
  const { id } = params || {};
  const info = useInformationApi();
  const { data, isLoading, error } = useQuery(["devDetail", id], () => info.getDevDetail(id), {
    staleTime: 1000 * 60 * 5,
  });
  return (
    <div className="flex justify-center">
      <div className="max-w-[980px] w-full px-3 ">
        {data?.content && (
          <PostContent
            content={data.content}
            pathArray={[{ name: "Development" }, { name: "Information", link: "/development/info" }]}
          >
            <MarkdownViewer text={data.content.content} />
          </PostContent>
        )}
        <div className="my-[90px]">{data?.comment && <CommentContent comments={data.comment} />}</div>
      </div>
    </div>
  );
}