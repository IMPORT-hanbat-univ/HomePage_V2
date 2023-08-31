"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Footer() {
  const pathname = usePathname();
  const isEdit = pathname?.includes("edit");
  const isAdmin = pathname?.includes("admin");
  if (isEdit || isAdmin) {
    return null;
  }
  return (
    <footer className="w-full mt-20 md:mt-36 overflow-x-hidden relative bg-black  flex flex-col items-center  -z-10">
      <div className="flex items-center gap-4 md:gap-72 md:px-60 justify-between md:py-10 w-full py-4 px-4">
        <div className="w-full md:w-auto">
          <h4 className="text-import-color  md:text-[40px] font-extrabold md:leading-[60px] tracking-[-0.6px] ">
            궁금한게 있을 땐
          </h4>
          <Link
            href="/community/qna"
            className="rounded-[10px] w-full justify-between bg-white flex items-center px-4 py-1 md:gap-4 md:px-4"
          >
            <span className="font-extrabold md:text-[40px]  md:leading-[60px] tracking-[-0.6px] ">
              Community
              <br className="md:hidden block" /> QnA
            </span>
            <Image
              src={"/images/arrow.svg"}
              alt={"화살표"}
              width={74}
              height={36}
              className="object-cover max-md:w-[37px] max-md:h-[36px]"
            />
          </Link>
        </div>

        <div className="w-full md:w-auto">
          <h4 className="text-import-color md:text-[40px] font-extrabold md:leading-[60px] tracking-[-0.6px] ">
            개발 소식이 궁금할 땐
          </h4>
          <Link
            href="/community/devNews"
            className="rounded-[10px] w-full bg-white flex items-center md:gap-4 px-2 py-1 md:px-4"
          >
            <span className="font-extrabold w-full md:text-[40px] md:leading-[60px] tracking-[-0.6px] ">
              Community
              <br className="md:hidden block" /> Dev News
            </span>
            <Image
              src={"/images/arrow.svg"}
              alt={"화살표"}
              width={74}
              height={36}
              className="object-cover max-md:w-[37px] max-md:h-[36px]"
            />
          </Link>
        </div>
      </div>
      <Link href="/" className="mt-[26px]">
        <Image width={90} height={60} src={"/images/import_logo.png"} alt="import_logo" />
      </Link>

      <div className="font-normal text-sm leading-6 justify-center flex flex-col items-center text-white opacity-80 tracking-[-0.015em] mt-5  md:mt-8">
        <span> COPYRIGHT IMPORT 2023</span>
        <span> 대전광역시 유성구 동서대로 대전광역시 유성구</span>
        <span> 동서대로 125(덕명동)</span>
        <span className="mt-8">Email : import.hanbat@gmail.com</span>
      </div>
    </footer>
  );
}
