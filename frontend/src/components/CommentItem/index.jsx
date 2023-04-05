import dayjs from "dayjs";
import React from "react";
import cls from "classnames";
import MarkdownViewer from "../MarkdownViewer";
import { BsArrowReturnRight } from "react-icons/bs";
export default function CommentItem({ comment }) {
  return (
    <div className={cls(" px-2 py-4", { "border-t": comment.sequence === null })}>
      <div className="flex items-center">
        {comment.sequence !== null && <BsArrowReturnRight className="mr-2 text-import-color" />}
        <span className="text-xl leading-6 tracking-[-0.015em] font-semibold opacity-80">{comment.nick_name}</span>
        <span className="text-sm opacity-80 font-normal leading-6 tracking-[-0.015em] ml-3">
          {dayjs(comment.createAT).format("YYYY년 M월 D일 H시 m분")}
        </span>
      </div>
      <div className={cls("mt-2", { "pl-6": comment.sequence !== null })}>
        <MarkdownViewer text={comment.content} />
      </div>
    </div>
  );
}
