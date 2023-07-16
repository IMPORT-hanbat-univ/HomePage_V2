import React from "react";
import useSWR from "swr";

const categoryList = [{ name: "notice", path: "/api/information/notice" }];

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
  }).then((res) => res.json());

export default function usePost(category: string, id: string | number) {
  const categoryObj = categoryList.find((item) => item.name === category);
  if (!categoryObj) {
    return { error: "잘못된 카테고리 입니다.", data: null, isLoading: false };
  }
  const { data, isLoading, error } = useSWR(`${categoryObj.path}/${id}`);
  return { data, isLoading, error };
}
