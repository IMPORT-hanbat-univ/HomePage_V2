
import { getNoticeDetail, getNoticeList } from "@/api/notice";

import React from "react";
import PostDetail from "@/components/PostDetail";
import { PostDetailType } from "@/util/type";
import { notFound } from "next/navigation";
type Props = {
  params: {
    id: string;
  };
};

export default async function NoticePage({ params: { id } }: Props) {
  const data = await getNoticeDetail(parseInt(id));
  console.log("client data");

  if ( typeof data === "string" || Array.isArray(data) ) {
    notFound()
  }else{
    return (
      <>
   
          <PostDetail data={data} />
  
      </>
    )
  }
 
}
