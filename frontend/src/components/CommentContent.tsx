"use client";
import React, { useEffect, useState, useTransition } from "react";
import MarkdownEditor from "./MarkdownEditor";
import CommentItem from "./CommentItem";
import getCommentGroupValue from "@/util/getCommentGroupValue";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import Pagination from "./ui/Pagination";
import usePagination from "@/hooks/usePagination";
import { PostDetailType } from "@/util/type";
import getClientCookie from "@/util/getClientCookie";
import useCommentList from "@/hooks/useCommentList";
import DeleteCommentItem from "./DeleteCommentItem";
import usePost from "@/hooks/usePost";

export default function CommentContent({
  comments,
  user,
  category,
}: {
  comments: PostDetailType["comment"];
  user: any;
  category: string;
}) {
  const searchParams = useSearchParams();
  const params = useParams();
  const [isPending, startTrasition] = useTransition();
  const nowPage = searchParams?.get("nowPage");
  const currentPage = nowPage ? parseInt(nowPage) : 1;
  const router = useRouter();
  const { page, pageData, pageRangeArray } = usePagination(comments, currentPage);
  const pageComments = useCommentList(pageData);
  console.log(pageComments);
  const [parentCommentText, setParentCommentText] = useState("");
  const [newGroupValue, setNewGroupValue] = useState(null);
  const id = (params?.id as string) || "";
  const { createComment } = usePost(category, id);
  useEffect(() => {
    setNewGroupValue(getCommentGroupValue(comments));
  }, [comments]);
  console.log("comments", comments);
  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (parentCommentText.trim() === "") {
      return;
    }
    if (!getClientCookie("accessToken") && !getClientCookie("refreshToken")) {
      alert("로그인을 해주세요");

      return;
    }

    const post = {
      group: newGroupValue,
      category: category,
      sequence: 0,
      content: parentCommentText,
    };

    let result: any | string;

    startTrasition(() => {
      createComment(post, getClientCookie("accessToken"), getClientCookie("refreshToken"));
      setParentCommentText("");
    });
  };

  return (
    <div>
      {user && Object.keys(user).length > 0 && (
        <>
          <h2 className="text-2xl font-extrabold leading-6 tracking-[-0.15em] ml-2">댓글</h2>
          <form onSubmit={submitComment}>
            <div className="mt-[14px] border h-40 rounded-md">
              <MarkdownEditor text={parentCommentText} setText={setParentCommentText} hideToolbar={true} />
            </div>
            <div className="flex items-center justify-end mt-3">
              <button
                type="submit"
                className="rounded-md bg-import-color text-sm leading-6 tracking-[-0.15em] text-white py-2 px-4"
              >
                댓글 작성
              </button>
            </div>
          </form>
        </>
      )}

      <div className="mt-5" id="commentContent">
        {pageComments &&
          pageComments.length > 0 &&
          pageComments.map((comment) =>
            comment.userId ? (
              <CommentItem key={comment.id} comment={comment} category={category} user={user} comments={comments} />
            ) : (
              <DeleteCommentItem key={comment.id} comment={comment} />
            )
          )}
      </div>
      <Pagination nowPage={currentPage} page={page} pageRangeArray={pageRangeArray} id={"commentContent"} />
    </div>
  );
}
