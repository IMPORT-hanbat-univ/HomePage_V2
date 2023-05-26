import React from "react";
import UserNav from "../UserNav";
import Link from "next/link";
import HeaderLogoSvg from "../HeaderLogoSvg";
import Image from "next/image";
import { Poppins } from "next/font/google";

const hanuman = Poppins({
  weight: "600",
  subsets: ["latin"],
  style: "normal",
});

export default function DesktopHeader() {
  return (
    <header className="w-full">
      <div className="h-[60px] fixed z-10 flex bg-white justify-between items-center px-[75px] w-full">
        <div className="flex items-center">
          {/* <HeaderLogoSvg /> */}
          <Link href="/" className="text-3xl text-import-color mr-8">
            <span className={hanuman.className}>#IMPORT</span>
          </Link>
          <menu className="flex relative justify-between items-center text-base leading-4 gap-4">
            <div className="p-6 group relative">
              <span className="relative group-hover:text-import-color">About</span>
              <div className="absolute hidden group-hover:block top-14 bg-white z-20 hover:block shadow-md p-4 border h-auto w-36">
                <div className="gap-y-4 flex flex-col justify-center">
                  <Link href="/" className="hover:text-import-color">
                    Introduce
                  </Link>
                  <Link href="/" className="hover:text-import-color">
                    Rule
                  </Link>
                  <Link href="/" className="hover:text-import-color">
                    Schedule
                  </Link>
                  <Link href="/about/notice" className="hover:text-import-color">
                    Notice
                  </Link>
                </div>
                <div className="absolute top-[-5px] left-[15%] transform -translate-x-1/2 w-2 h-2 bg-white border-t border-r border-gray-300 rotate-[-45deg]"></div>
              </div>
            </div>
            <div className="p-6 group relative ">
              <span className="relative group-hover:text-import-color">Community</span>
              <div className="absolute hidden group-hover:block top-14 bg-white z-20 hover:block shadow-md p-4 border h-auto w-36">
                <div className="gap-y-4 flex flex-col justify-center">
                  <Link href="/qna" className="hover:text-import-color">
                    QnA
                  </Link>
                  <Link href="/development" className="hover:text-import-color">
                    Information
                  </Link>
                </div>
                <div className="absolute top-[-5px] left-[30%] transform -translate-x-1/2 w-2 h-2 bg-white border-t border-r border-gray-300 rotate-[-45deg]"></div>
              </div>
            </div>
            <div className="p-6 group ">
              <Link href="/project" className="relative group-hover:text-import-color">
                Project
              </Link>
            </div>
          </menu>
        </div>
        <div>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
