import { useInformationApi } from "@/recoil/information";
import { useRouter } from "next/router";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import { useQuery } from "react-query";
export default function DevelopmentDetail() {
  const router = useRouter();
  const {id} = router.query;
  const info = useInformationApi();
  const { data, isLoading, error } = useQuery(["devDetail", id], () => info.getDevDetail(id));
  console.log(id, data);
  return (
    <div className="flex w-screen h-screen justify-center">
      <div className="max-w-[980px] w-full">
        <div className="mt-[224px]  flex items-center">
          <button className="flex justify-center items-center  mr-[32px]">
            <IoHomeOutline className="w-[24px] h-[24px]" />
          </button>
          <MdArrowForwardIos className="w-[24px] h-[24px] mr-[32px]" />
          <span className="text-[15px] font-normal leading-6 tracking-[-0.015em] opacity-80">{data?.content.category}</span>
        </div>
      </div>
    </div>
  );
}
