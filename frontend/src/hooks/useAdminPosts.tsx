import { deleteAdminPost } from "@/api/post";
import { SimplePost } from "@/util/type";
import React from "react";
import useSWR from "swr";

const fetcher = async (url: string) => {
  return fetch(url, {
    method: "GET",
    credentials: "include",
  }).then((res) => res.json());
};

export default function useAdminPosts() {
  const { data, isLoading, error, mutate } = useSWR(
    `http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/admin/post`,
    fetcher
  );

  const deletePost = (category: string, postId: number, accessToken: string) => {
    if (!postId || category) {
      return;
    }
    return mutate(deleteAdminPost(category, postId, accessToken), {
      // optimisticData: newPost,
      revalidate: true,
      rollbackOnError: true,
      populateCache: false,
    });
  };
  return { data, isLoading, error, deletePost };
}
