import getClientCookie from "@/util/getClientCookie";
import { getCookies } from "cookies-next";
import React, { useCallback } from "react";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      accessToken: (getClientCookie("accessToken") as string) || "",
      refreshToken: (getClientCookie("refreshToken") as string) || "",
    },
  }).then((res) => res.json());

export default function useMe() {
  console.log("cookie check", getCookies());
  const { data, isLoading, error, mutate } = useSWR<any>(
    `http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/auth/tokenverification`,
    fetcher
  );
  let decodeUser = null;
  if (!error) {
    decodeUser = data;
  }
  return { decodeUser, isLoading, error, mutate };
}
