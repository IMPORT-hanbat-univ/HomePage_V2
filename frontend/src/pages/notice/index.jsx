import React from "react";
import NoticeList from "@/components/NoticeList";
import { useQuery } from "react-query";
import { useNoticeApi } from "@/recoil/notice";

export default function NoticeListPage() {
  const notice = useNoticeApi();
  const { data: notices, isLoading, error } = useQuery(["notice"], () => notice.getList());
  return (
    <div className="flex items-center justify-center">
      <NoticeList notices={notices} />
    </div>
  );
}
