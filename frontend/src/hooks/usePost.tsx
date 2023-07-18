import { createPostComment, deletePostComment, updatePostComment } from "@/api/post";
import { Comment, CreateComment } from "@/util/type";
import React, { useCallback } from "react";
import useSWR from "swr";

const fetcher = async (url: string) => {
  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
};

export default function usePost(category: string, id: string | number) {
  const { data, isLoading, error, mutate } = useSWR(`http://localhost:4000/post/${id}?category=${category}`, fetcher);

  const createComment = (comment: CreateComment, accessToken: string, refreshToken: string) => {
    if (!data) {
      return;
    }
    const newPost = {
      ...data,
      comment: [...data.comment, comment],
    };
    return mutate(createPostComment(comment, accessToken, refreshToken, data.content.id), {
      // optimisticData: newPost,
      revalidate: true,
      rollbackOnError: true,
      populateCache: false,
    });
  };

  const deleteComment = (commentId: number | string, accessToken: string, refreshToken: string) => {
    return mutate(deletePostComment(data.id, commentId, accessToken, refreshToken), {
      revalidate: true,
      rollbackOnError: true,
      populateCache: false,
    });
  };

  const updateComment = (
    commentId: number | string,
    comment: CreateComment,
    accessToken: string,
    refreshToken: string
  ) => {
    return mutate(updatePostComment(comment, accessToken, refreshToken, data.content.id, commentId), {
      revalidate: true,
      rollbackOnError: true,
      populateCache: false,
    });
  };

  return { data, isLoading, error, createComment, deleteComment, updateComment };
}
