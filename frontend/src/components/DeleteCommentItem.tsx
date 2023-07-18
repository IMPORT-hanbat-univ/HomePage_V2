import React from "react";
import cls from "classnames";
import { Comment } from "@/util/type";
export default function DeleteCommentItem({ comment }: { comment: Comment }) {
  return (
    <div className={cls(" px-2 py-4 text-neutral-400", { "border-t": comment.sequence === 0 })}>{comment.content}</div>
  );
}
