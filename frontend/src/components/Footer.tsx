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
    <footer className="w-full mt-8  overflow-x-hidden relative bg-black  flex flex-col items-center opacity-80 -z-10">
      <div className="flex items-center md:px-60 justify-between md:py-10 w-full py-4 px-4">
        <div>
          <h4 className="text-import-color  md:text-[40px] font-extrabold md:leading-[60px] tracking-[-0.6px] ">
            궁금한게 있을 땐
          </h4>
          <div className="rounded-[10px] bg-white flex items-center md:gap-4 md:px-4">
            <span className="font-extrabold md:text-[40px]  md:leading-[60px] tracking-[-0.6px] ">Community QnA</span>
            <div className="md:block hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="74" height="36" viewBox="0 0 74 36" fill="none">
                <path d="M74 18L44 0.679491L44 35.3205L74 18ZM0 21L47 21V15L0 15L0 21Z" fill="#4CD773" />
              </svg>
            </div>
            <div className="md:hidden block">
              <svg xmlns="http://www.w3.org/2000/svg" width="37" height="36" viewBox="0 0 74 36" fill="none">
                <path d="M74 18L44 0.679491L44 35.3205L74 18ZM0 21L47 21V15L0 15L0 21Z" fill="#4CD773" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-import-color md:text-[40px] font-extrabold md:leading-[60px] tracking-[-0.6px] ">
            개발 소식이 궁금할 땐
          </h4>
          <div className="rounded-[10px] bg-white flex items-center md:gap-4 md:px-4">
            <span className="font-extrabold md:text-[40px] md:leading-[60px] tracking-[-0.6px] ">
              Community Dev News
            </span>
            <div className="md:block hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="74" height="36" viewBox="0 0 74 36" fill="none">
                <path d="M74 18L44 0.679491L44 35.3205L74 18ZM0 21L47 21V15L0 15L0 21Z" fill="#4CD773" />
              </svg>
            </div>
            <div className="md:hidden block">
              <svg xmlns="http://www.w3.org/2000/svg" width="37" height="36" viewBox="0 0 74 36" fill="none">
                <path d="M74 18L44 0.679491L44 35.3205L74 18ZM0 21L47 21V15L0 15L0 21Z" fill="#4CD773" />
              </svg>
            </div>
          </div>
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
