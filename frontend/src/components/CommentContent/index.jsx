import React, { useState } from "react";
import MarkdownEditor from "../MarkdownEditor";
import CommentItem from "../CommentItem";

export default function CommentContent({ comments }) {
  const [parentCommentText, setParentCommentTeXt] = useState("");
  return (
    <div>
      <h2 className="text-2xl font-extrabold leading-6 tracking-[-0.15em] ml-2">댓글</h2>
      <div className="mt-[14px] border h-56 rounded-md">
        <MarkdownEditor text={parentCommentText} setText={setParentCommentTeXt} />
      </div>
      <div className="mt-5">
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
      </div>
    </div>
  );
}
