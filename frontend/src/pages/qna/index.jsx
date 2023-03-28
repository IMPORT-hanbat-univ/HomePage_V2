import React from "react";
import QnAList from "@/components/QnAList/QnAList";
import { useQuery } from "react-query";
import { useQnAApi } from "./../../context/qnaContext";

export default function QnAListPage() {
  const qna = useQnAApi();
  console.log(qna);
  const { data: qnaList, isLoading, error } = useQuery(["qnaList"], () => qna.getList());
  return (
    <div className="flex items-center justify-center">
      <QnAList qnaList={qnaList} />
    </div>
  );
}
