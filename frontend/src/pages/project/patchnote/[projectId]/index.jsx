import { usePatchnoteApi } from "@/recoil/patchnote";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

export default function PatchnoteList() {
  const router = useRouter();
  const patchnoteApi = usePatchnoteApi();
  const { projectId } = router.query;
  const { data, isLoading, error } = useQuery(["patchnoteList", projectId], () => patchnoteApi.getList(projectId));
  console.log(data);
  return <div></div>;
}
