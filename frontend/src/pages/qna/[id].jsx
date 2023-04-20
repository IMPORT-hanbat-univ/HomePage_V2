import CommentContent from "@/components/CommentContent";
import MarkdownViewer from "@/components/MarkdownViewer";
import PostContent from "@/components/PostContent";
import useRelatedPost from "@/hooks/useRelatedPost";
import { useQnAApi } from "@/recoil/qna";

import { useRouter } from "next/router";
import React from "react";

import { useQuery } from "react-query";
export default function QnADetail() {
  const router = useRouter();
  const { id } = router.query;
  const qna = useQnAApi();
  const {
    data: post,
    isLoading,
    error,
  } = useQuery(["qnaDetail", id], () => qna.getDetail(id), {
    staleTime: 1000 * 60 * 5,
  });

  const { data: list } = useQuery(["qnaList"], () => qna.getList(), { staleTime: 1000 * 60 * 5 });
  const filteredData = useRelatedPost(list, post);
  console.log("result", filteredData);
  return (
    <div className="flex justify-center">
      <div className="max-w-[980px] w-full px-3 ">
        {post?.content && (
          <PostContent
            content={post.content}
            pathArray={[{ name: "Development" }, { name: "Information", link: "/development/info" }]}
          >
            <MarkdownViewer text={post.content.content} />
          </PostContent>
        )}
        <div className="my-[90px]">{post?.comment && <CommentContent comments={post.comment} />}</div>
      </div>
    </div>
  );
}
