import getClientCookie from "@/util/getClientCookie";
import { getCookies } from "cookies-next";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    credentials: "include",

    headers: {
      accessToken: (getClientCookie("accessToken") as string) || "",
    },
  }).then((res) => res.json());

export default function useMe() {
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
