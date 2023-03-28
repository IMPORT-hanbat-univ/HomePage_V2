import React from "react";
import QnAList from "@/components/QnAList/QnAList";
import { useQuery } from "react-query";
import { useQnAApi } from "../../recoil/qna";
import PopularTag from "@/components/PopularTag/PopularTag";
import { useRouter } from "next/router";
import CategoryNav from "@/components/CategoryNav/CategoryNav";

export default function QnAListPage() {
  const router = useRouter();
  const {category, tag} = router.query;
  const seletedCategory = category||"frontend";
  const qna = useQnAApi();
  const { data: qnaList, isLoading, error } = useQuery(["qnaList"], () => qna.getList());
  return (
    <section className="flex px-[32px]">
    <section className=" w-3/12  mt-[32px] ml-[40px] max-w-[200px]">
      <CategoryNav categoryList={["frontend", "backend", "Mobile", "Bigdata", "AI"]} seletedCategory={seletedCategory}/>
    </section>
      <div className="flex items-center justify-center w-9/12 max-w-[980px]">
        <QnAList qnaList={qnaList} />
      </div>
    <section className=" w-3/12 mt-[32px] ml-[40px] max-w-[200px]">
      <PopularTag data={qnaList}/>
    </section>
    </section>
   
  );
}
