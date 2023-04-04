import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import { useQuery } from "react-query";
export default function DevelopmentDetail() {
  const { data, isLoading, error } = useQuery(["devDetail"]);
  return (
    <div className="flex w-screen h-screen justify-center">
      <div className="max-w=[980px]">
        <div className="mt-[224px]  flex items-center">
          <button className="flex justify-center items-center  mr-[32px]">
            <IoHomeOutline className="w-[24px] h-[24px]" />
          </button>
          <MdArrowForwardIos className="w-[24px] h-[24px] mr-[32px]" />
          <span className=""></span>
        </div>
      </div>
    </div>
  );
}
