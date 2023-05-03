import CommentContent from "@/components/CommentContent";
import MarkdownViewer from "@/components/MarkdownViewer";
import PostContent from "@/components/PostContent";
import RelatedPost from "@/components/RelatedPost";
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
    <section className="flex justify-center px-[32px] mt-20">
      <section className="w-full xl:w-9/12 max-w-[980px]  px-3 ">
        {post?.content && (
          <PostContent
            content={post.content}
            pathArray={[{ name: "Development" }, { name: "Information", link: "/development/info" }]}
          >
            <MarkdownViewer text={post.content.content} />
          </PostContent>
        )}
        <div className="my-[90px]">{post?.comment && <CommentContent comments={post.comment} />}</div>
      </section>
      <section className="hidden xl:block xl:w-3/12 mt-44 ml-[40px] max-w-[320px]">
        <div className="absolute max-w-[300px] mt-20">
          {filteredData && filteredData.length > 0 && <RelatedPost relatedList={filteredData} />}
        </div>
      </section>
    </section>
  );
}
