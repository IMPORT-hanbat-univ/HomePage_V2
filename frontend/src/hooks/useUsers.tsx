import { userWithdraw } from "@/api/user";
import React from "react";
import useSWR from "swr";

const fetcher = async (url: string) => {
  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
};

export default function useUsers(page: string) {
  let url = "http://localhost:3000/api/admin/userManagement";
  const { data, isLoading, error, mutate } = useSWR(url, fetcher);

  const withdrawlUser = (userId: number, accessToken: string, refreshToken: string) => {
    if (!userId) {
      return;
    }
    return mutate(userWithdraw(userId, accessToken, refreshToken), {
      // optimisticData: newPost,
      revalidate: true,
      rollbackOnError: true,
      populateCache: false,
    });
  };
  return { data, isLoading, error, withdrawlUser };
}
