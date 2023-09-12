"use client";
import React from "react";
import Link from "next/link";
import MobileDetailMenu from "./MobileDetailMenu";
import { AnimatePresence, motion } from "framer-motion";
import UserNav from "./UserNav";

import { Poppins } from "next/font/google";

const hanuman = Poppins({
  weight: "600",
  subsets: ["latin"],
  style: "normal",
});

type Props = {
  onModal: () => void;
};

export default function MobileModal({ onModal }: Props) {
  const handleAlert = () => {
    alert("오픈 준비중 입니다.");
  };
  return (
    <AnimatePresence>
      <div className="fixed top-0 left-0 h-full w-full flex  lg:hidden  ">
        <div className="z-20">
          <motion.div
            className="w-2/3 h-full fixed bg-white"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.5 }}
          >
            <div className=" flex flex-col w-full items-center p-5 border-b  h-auto">
              <Link href="/" className="text-xl text-import-color ">
                <span className={hanuman.className}>#IMPORT</span>
              </Link>
              <div className="mt-6 w-full">
                {" "}
                <div className="w-full">
                  <UserNav />
                </div>
              </div>
            </div>
            <MobileDetailMenu header={"about"} menuArray={[{ title: "Notice", link: "/about/notice" }]} />
            <MobileDetailMenu
              header={"Community"}
              menuArray={[
                { title: "QnA", link: "/community/qna" },
                { title: "DevNews", link: "/community/devNews" },
              ]}
            />
            <div className="w-full pl-6 pr-3 text-ellipsis text-left border-none h-14 overflow-hidden font-semibold text-lg flex items-center">
              <button onClick={handleAlert}>Project</button>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="bg-black opacity-25 w-screen h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          exit={{ opacity: 0 }}
          onClick={onModal}
        />
      </div>
    </AnimatePresence>
  );
}
