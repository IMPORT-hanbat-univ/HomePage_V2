import getClientCookie from "@/util/getClientCookie";
import React, { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS } from "react";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      accessToken: (getClientCookie("accessToken") as string) || "",
    },
  })
    .then((res) => res.json())
    .then((res) => res.list);

export default function useMyActivity(type: "post" | "comment", userId: number) {
  const { data, isLoading, error } = useSWR(
    `http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/mypage/${
      type === "comment" ? "myComment" : "myPost"
    }/${userId}`,
    fetcher
  );
  return { data, isLoading, error };
}
