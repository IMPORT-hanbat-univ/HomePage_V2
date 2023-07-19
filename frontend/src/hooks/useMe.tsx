import { getCookie } from "cookies-next";
import React, { useCallback } from "react";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: {
      accessToken: (getCookie("accessToken") as string) || "",
      refreshToken: (getCookie("refreshToken") as string) || "",
    },
  }).then((res) => res.json());

export default function useMe() {
  const {
    data: decodeUser,
    isLoading,
    error,
    mutate,
  } = useSWR<any>(`http://localhost:4000/auth/tokenverification`, fetcher);

  return { decodeUser, isLoading, error };
}