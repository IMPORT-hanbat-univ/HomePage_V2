import { getNoticeDetail, getNoticeList } from "@/api/notice";
import axios from "axios";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default async function NoticePage({ params: { id } }: Props) {
  const data = await getNoticeDetail(parseInt(id));
  console.log("client data");

  return <div></div>;
}
