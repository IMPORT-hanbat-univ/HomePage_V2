import React from "react";
import NoticeList from "@/components/NoticeList/NoticeList";
import { useNoticeApi } from "./../../context/noticeContext";
import { useQuery } from "react-query";

export default function NoticeListPage() {
  const notice = useNoticeApi();
  console.log(notice);
  const { data: notices, isLoading, error } = useQuery(["notice"], () => notice.getList());
  return (
    <div className="flex items-center justify-center">
      <NoticeList notices={notices} />
    </div>
  );
}
