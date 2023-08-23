import { SimplePost } from "@/util/type";
import React from "react";
import useSWR from "swr";

const fetcher = async (url: string): Promise<SimplePost[]> => {
  return fetch(url, {
    method: "GET",
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => res.item);
};

export default function usePosts(category: string) {
  const { data, isLoading, error, mutate } = useSWR(
    `http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/post?category=${category}`,
    fetcher
  );
  return { data, isLoading, error };
}
