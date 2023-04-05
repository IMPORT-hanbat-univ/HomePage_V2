import PostContent from "@/components/PostContent";
import { useInformationApi } from "@/recoil/information";
import { useRouter } from "next/router";
import React from "react";

import { useQuery } from "react-query";
export default function DevelopmentDetail() {
  const router = useRouter();
  const { id } = router.query;
  const info = useInformationApi();
  const { data, isLoading, error } = useQuery(["devDetail", id], () => info.getDevDetail(id));
  console.log(id, data);
  return (
    <div className="flex justify-center">
      <div className="max-w-[980px] w-full">
        {data?.content && (
          <PostContent
            content={data.content}
            pathArray={[{ name: "Development" }, { name: "Information", link: "/development/info" }]}
          />
        )}
      </div>
    </div>
  );
}
