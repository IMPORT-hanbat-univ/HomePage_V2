import React from "react";
import useSWR from "swr";

const fetcher = async (url: string) => {
  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
};

export default function useAdmins(page: string) {
  let url = "http://localhost:3000/api/admin/userManagement";
  const { data, isLoading, error, mutate } = useSWR(url, fetcher);
  return { data, isLoading, error };
}
