import { userProfileUpdate } from "@/api/user";
import getClientCookie from "@/util/getClientCookie";
import { DetailUser } from "@/util/type";
import { getCookies } from "cookies-next";
import React, { useCallback } from "react";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      accessToken: (getClientCookie("accessToken") as string) || "",
    },
  }).then((res) => res.json());

export default function useProfile(id: number) {
  const { data, isLoading, error, mutate } = useSWR<any>(`http://localhost:3000/api/mypage/profile/${id}`, fetcher);

  const updateUserProfile = (id: number, newProfile: DetailUser, accessToken: string) => {
    if (!id || !newProfile) {
      return;
    }
    return mutate(userProfileUpdate(id, newProfile, accessToken), {
      optimisticData: newProfile,
      revalidate: true,
      rollbackOnError: true,
      populateCache: false,
    });
  };
  return { data, isLoading, error, updateUserProfile };
}
