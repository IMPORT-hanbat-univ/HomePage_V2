import { Comment } from "@/util/type";
import React, { useEffect, useState } from "react";

export default function useCommentList(comments: Comment[]) {
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  useEffect(() => {
    if (comments && comments.length > 0) {
      const sortComments = comments.sort((a, b) => a.group - b.group || a.sequence - b.sequence);
      const mapComments: Comment[] = [...sortComments];
      console.log(mapComments);
      if (mapComments[0].sequence !== 0) {
        mapComments.splice(0, 0, {
          id: `삭제된 댓글_${mapComments[0].group}`,
          sequence: 0,
          group: mapComments[0].group,
          content: "삭제된 댓글입니다.",
        });
      }
      for (let i = 1; i < mapComments.length; i++) {
        const prevComment = mapComments[i - 1];
        const currrentComment = mapComments[i];
        if (prevComment.group !== currrentComment.group && currrentComment.sequence !== 0) {
          mapComments.splice(i, 0, {
            id: `삭제된 댓글_${currrentComment.group}`,
            sequence: 0,
            group: currrentComment.group,
            content: "삭제된 댓글입니다.",
          });
        }
      }
      setCommentList(mapComments);
    }
  }, [comments]);
  return commentList;
}
