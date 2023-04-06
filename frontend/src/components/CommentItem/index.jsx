import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import cls from "classnames";
import MarkdownViewer from "../MarkdownViewer";
import { BsArrowReturnRight } from "react-icons/bs";
import MarkdownEditor from "../MarkdownEditor";
import getCommentSequenceValue from "@/util/getCommentSequenceValue";
export default function CommentItem({ comment, comments }) {
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [newSequenceValue, setNewSequenceValue] = useState(null);
  const [modifyText, setModifyText] = useState(comment?.content ?? "");
  const [isModify, setIsModify] = useState(false);

  useEffect(() => {
    setNewSequenceValue(getCommentSequenceValue(comments, comment.group))
  }, [ comments, comment]);

  const handleReplyButton = () => {
    setShowReplyInput((prev) => !prev)
  }

  const handleModify = () => {
    setIsModify((prev) => !prev)
  }

  const submitComment = (e) => {
    e.preventDefault();

    if(replyText.trim() === ""){
      return;

    }
    console.log(1)
    if(!newSequenceValue){
      return;
    }
    // 로그인여부도 추가를 해야겠지요를레히요
    console.log({
      group: comment.group,
      sequence: newSequenceValue,
      content: replyText
    })
  }
  return (
    <div className={cls(" px-2 py-4", { "border-t": comment.sequence === null })}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {comment.sequence !== null && <BsArrowReturnRight className="mr-2 text-import-color" />}
          <span className="text-xl leading-6 tracking-[-0.015em] font-semibold opacity-80">{comment.nick_name}</span>
          <span className="text-sm opacity-80 font-normal leading-6 tracking-[-0.015em] ml-3">
            {dayjs(comment.createAT).format("YYYY년 M월 D일 H시 m분")}
          </span>
        </div>
        {isModify ? (
          <div className="flex items-center">
            <button onClick={handleModify} className="font-normal text-sm leading-6 tracking-[-0.015em] opacity-50 mr-2">
              취소
            </button>
          </div>
        ):(
          <div className="flex items-center">
          <button onClick={handleModify} className="font-normal text-sm leading-6 tracking-[-0.015em] opacity-50 mr-2">
            수정
          </button>
          <button className="font-normal text-sm leading-6 tracking-[-0.015em] opacity-50">삭제</button>
        </div>
        )}
        
       
      </div>
      <div className={cls("mt-2 ", { "pl-6": comment.sequence !== null })}>
        {isModify ? (
           <form onSubmit={submitComment} className="mt-1">
           <div className="mt-[14px] border h-40 rounded-md">
             <MarkdownEditor text={modifyText} setText={setModifyText} hideToolbar={true} />
           </div>
           <div className="flex items-center justify-end mt-3">
             <button className="rounded-md bg-import-color text-sm leading-6 tracking-[-0.15em] text-white py-2 px-4">답글 작성</button>
           </div>
        </form>
        ): <MarkdownViewer text={comment.content} />
        }
      </div>
      {comment.sequence === null && !isModify && (
      <div className="flex items-center justify-end">
        <button className="text-base leading-6 tracking-[-0.015em] font-normal text-import-color opacity-80" onClick={handleReplyButton}>{showReplyInput ? "숨기기" : "답글 달기"}</button>
      </div>
      )}
      {comment.sequence === null && showReplyInput && (
         <form onSubmit={submitComment} className="mt-1">
          <div className="mt-[14px] border h-40 rounded-md">
            <MarkdownEditor text={replyText} setText={setReplyText} hideToolbar={true} />
          </div>
          <div className="flex items-center justify-end mt-3">
            <button className="rounded-md bg-import-color text-sm leading-6 tracking-[-0.15em] text-white py-2 px-4">답글 작성</button>
          </div>
       </form>
      )}
    </div>
  );
}
