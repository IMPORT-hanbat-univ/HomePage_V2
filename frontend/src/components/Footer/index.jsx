import Image from "next/image";
import Link from "next/link";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full mt-8  overflow-x-hidden bg-black h-[346px] flex flex-col items-center opacity-80 ">
      <Link href="/" className="mt-[26px]">
        <Image width={90} height={60} src={"/images/import_logo.png"} alt="import_logo" />
      </Link>
      <div className="mt-7 grid grid-cols-4 gap-x-5 items-center">
        <div className="cursor-pointer w-11 h-11 bg-gray-200 rounded-full"></div>
        <div className="cursor-pointer w-11 h-11 bg-gray-200 rounded-full"></div>
        <div className="cursor-pointer w-11 h-11 bg-gray-200 rounded-full"></div>
        <div className="cursor-pointer w-11 h-11 bg-gray-200 rounded-full"></div>
      </div>
      <div className="font-normal text-sm leading-6 justify-center flex flex-col items-center text-white opacity-80 tracking-[-0.015em]  mt-11">
        <span> COPYRIGHT IMPORT 2023</span>
        <span> 대전광역시 유성구 동서대로 대전광역시 유성구</span>
        <span> 동서대로 125(덕명동)</span>
        <span className="mt-8">Email : import.hanbat@gmail.com</span>
      </div>
    </footer>
  );
}
