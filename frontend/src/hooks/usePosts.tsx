import React from "react";
import useSWR from "swr";

const fetcher = async (url: string) => {
  return fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => res.item);
};

export default function usePosts(category: string) {
  const { data, isLoading, error, mutate } = useSWR(`http://localhost:4000/post?category=${category}`, fetcher);
  return { data, isLoading, error };
}
