import React, { useEffect, useState } from "react";
import MarkdownEditor from "../MarkdownEditor";
import CommentItem from "../CommentItem";
import getCommentGroupValue from "@/util/getCommentGroupValue";

export default function CommentContent({ comments }) {
  const [parentCommentText, setParentCommentTeXt] = useState("");
  const [newGroupValue, setNewGroupValue] = useState(null);

  useEffect(() => {
    setNewGroupValue(getCommentGroupValue(comments))
  }, [ comments]);

  const submitComment = (e) => {
    e.preventDefault();
   
    if(parentCommentText.trim() === ""){
      return;

    }
    // 로그인여부도 추가를 해야겠지요를레히요
    console.log({
      group: newGroupValue,
      sequence: null,
      content: parentCommentText
    })
  }
  return (
    <div>
      <h2 className="text-2xl font-extrabold leading-6 tracking-[-0.15em] ml-2">댓글</h2>
      <form onSubmit={submitComment}>
        <div className="mt-[14px] border h-40 rounded-md">
          <MarkdownEditor text={parentCommentText} setText={setParentCommentTeXt} hideToolbar={true} />
        </div>
        <div className="flex items-center justify-end mt-3">
          <button type="submit" className="rounded-md bg-import-color text-sm leading-6 tracking-[-0.15em] text-white py-2 px-4">댓글 작성</button>
        </div>
      </form>
    
      <div className="mt-5">
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => <CommentItem key={comment.id} comment={comment} comments={comments}/>)}
      </div>
    </div>
  );
}
