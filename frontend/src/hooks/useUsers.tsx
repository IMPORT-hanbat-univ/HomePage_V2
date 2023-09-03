import { userUpdate, userWithdraw, usersLevelUpdate } from "@/api/user";
import { DetailUser } from "@/util/type";
import React from "react";
import useSWR from "swr";

const fetcher = async (url: string) => {
  return fetch(url, {
    method: "GET",
    credentials: "include",
  }).then((res) => res.json());
};

export default function useUsers() {
  let url = `http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/admin/userManagement`;
  const { data, isLoading, error, mutate } = useSWR(url, fetcher);

  const withdrawlUser = (userId: number, accessToken: string) => {
    if (!userId) {
      return;
    }
    return mutate(userWithdraw(userId, accessToken), {
      // optimisticData: newPost,
      revalidate: true,
      rollbackOnError: true,
      populateCache: false,
    });
  };
  const updateUser = (user: DetailUser, accessToken: string) => {
    if (!user || !user.userId) {
      return;
    }
    const newUsers = data?.map((item: DetailUser) => (item.userId === user.userId ? user : item));

    return mutate(userUpdate(user.userId, user, accessToken), {
      optimisticData: newUsers,
      revalidate: true,
      rollbackOnError: true,
      populateCache: false,
    });
  };

  const updateUsersLevel = (users: { userId: number; rank: number; requestRank?: number }[], accessToken: string) => {
    if (!users || users.length === 0) {
      return;
    }
    return mutate(usersLevelUpdate(users, accessToken, "user"), {
      revalidate: true,
      rollbackOnError: true,
      populateCache: false,
    });
  };
  return { data, isLoading, error, withdrawlUser, updateUser, updateUsersLevel };
}
