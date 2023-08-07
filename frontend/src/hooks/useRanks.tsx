import { userRankReject, usersLevelUpdate } from "@/api/user";
import useSWR from "swr";

const fetcher = async (url: string) => {
  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
};

const URL = "http://localhost:4000/amdin/rankManagement";

export default function useRanks() {
  const { data, isLoading, error, mutate } = useSWR(URL, fetcher);
  const updateUsersLevel = (
    users: { userId: number; rank: number; requestRank?: number }[],
    accessToken: string,
    refreshToken: string
  ) => {
    if (!users || users.length === 0) {
      return;
    }
    return mutate(usersLevelUpdate(users, accessToken, refreshToken, "user"), {
      revalidate: true,
      rollbackOnError: true,
      populateCache: false,
    });
  };

  const rankRejectUser = (userId: number, accessToken: string, refreshToken: string) => {
    if (!userId) {
      return;
    }
    return mutate(userRankReject(userId, accessToken, refreshToken), {
      // optimisticData: newPost,
      revalidate: true,
      rollbackOnError: true,
      populateCache: false,
    });
  };

  return { data, isLoading, error, updateUsersLevel, rankRejectUser };
}
