"use client";
import dayjs from "dayjs";
import React, { useEffect, useState, useTransition } from "react";
import cls from "classnames";
import MarkdownViewer from "../MarkdownViewer";
import { BsArrowReturnRight } from "react-icons/bs";
import MarkdownEditor from "../MarkdownEditor";
import getCommentSequenceValue from "@/util/getCommentSequenceValue";
import { PostDetailType } from "@/util/type";
import getClientCookie from "@/util/getClientCookie";
import { useParams, useRouter } from "next/navigation";
import { createNoticeComment } from "@/api/notice";
export default function CommentItem({
  comment,
  comments,
  user,
  category,
}: {
  comment: PostDetailType["comment"][0];
  comments: PostDetailType["comment"];
  user: any;
  category: string;
}) {
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [newSequenceValue, setNewSequenceValue] = useState(0);
  const [modifyText, setModifyText] = useState(comment?.content ?? "");
  const [isModify, setIsModify] = useState(false);
  const params = useParams();
  const [isPending, startTrasition] = useTransition();
  const router = useRouter();
  useEffect(() => {
    setNewSequenceValue(getCommentSequenceValue(comments, comment.group));
  }, [comments, comment]);

  const handleReplyButton = () => {
    setShowReplyInput((prev) => !prev);
  };

  const handleModify = () => {
    setIsModify((prev) => !prev);
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (replyText.trim() === "") {
      return;
    }
    if (!getClientCookie("accessToken") && !getClientCookie("refreshToken")) {
      alert("로그인을 해주세요");
      return;
    }

    if (isNaN(newSequenceValue)) {
      return;
    }
    const post = {
      group: comment.group,
      category,
      sequence: newSequenceValue,
      content: replyText,
    };
    const id = (params?.id as string) || "";
    let result: any | string;
    switch (category) {
      case "notice": {
        console.log("post", post);
        result = await createNoticeComment(post, getClientCookie("accessToken"), getClientCookie("refreshToken"), id);
        console.log("result", result);
      }
    }
    if (typeof result === "string") {
      alert({ notificationType: "Warning", message: result, type: "warning" });

      return;
    } else {
      console.log("result", result);
      startTrasition(() => {
        setReplyText("");
        setShowReplyInput(false);
        router.refresh();
      });
    }
  };

  return (
    <div className={cls(" px-2 py-4", { "border-t": comment.sequence === 0 })}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {comment.sequence !== 0 && <BsArrowReturnRight className="mr-2 text-import-color" />}
          <span className="text-xl leading-6 tracking-[-0.015em] font-semibold opacity-80">{comment.nick_name}</span>
          <span className="text-sm opacity-80 font-normal leading-6 tracking-[-0.015em] ml-3">
            {dayjs(comment.createdAt).format("YYYY년 M월 D일 H시 m분")}
          </span>
        </div>
        {isModify ? (
          <div className="flex items-center">
            <button
              onClick={handleModify}
              className="font-normal text-sm leading-6 tracking-[-0.015em] opacity-50 mr-2"
            >
              취소
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <button
              onClick={handleModify}
              className="font-normal text-sm leading-6 tracking-[-0.015em] opacity-50 mr-2"
            >
              수정
            </button>
            <button className="font-normal text-sm leading-6 tracking-[-0.015em] opacity-50">삭제</button>
          </div>
        )}
      </div>
      <div className={cls("mt-2 ", { "pl-6": comment.sequence !== 0 })}>
        {isModify ? (
          <form onSubmit={submitComment} className="mt-1">
            <div className="mt-[14px] border h-40 rounded-md">
              <MarkdownEditor text={modifyText} setText={setModifyText} hideToolbar={true} />
            </div>
            <div className="flex items-center justify-end mt-3">
              <button className="rounded-md bg-import-color text-sm leading-6 tracking-[-0.15em] text-white py-2 px-4">
                답글 작성
              </button>
            </div>
          </form>
        ) : (
          <div className="pl-4">
            <MarkdownViewer text={comment.content} />
          </div>
        )}
      </div>
      {comment.sequence === 0 && !isModify && user && Object.keys(user).length > 0 && (
        <div className="flex items-center justify-end">
          <button
            className="text-base leading-6 tracking-[-0.015em] font-normal text-import-color opacity-80"
            onClick={handleReplyButton}
          >
            {showReplyInput ? "숨기기" : "답글 달기"}
          </button>
        </div>
      )}
      {comment.sequence === 0 && showReplyInput && (
        <form onSubmit={submitComment} className="mt-1">
          <div className="mt-[14px] border h-40 rounded-md">
            <MarkdownEditor text={replyText} setText={setReplyText} hideToolbar={true} />
          </div>
          <div className="flex items-center justify-end mt-3">
            <button className="rounded-md bg-import-color text-sm leading-6 tracking-[-0.15em] text-white py-2 px-4">
              답글 작성
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
