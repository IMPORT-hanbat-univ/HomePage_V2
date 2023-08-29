"use client";
import React, { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Poppins } from "next/font/google";
import Link from "next/link";
import MobileDetailMenu from "./MobileDetailMenu";

const hanuman = Poppins({
  weight: "600",
  subsets: ["latin"],
  style: "normal",
});

export default function MobileMenu({ children }: { children: ReactNode }) {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    setIsModal((prev) => !prev);
  };

  const handleAlert = () => {
    alert("오픈 준비중 입니다.");
  };

  return (
    <>
      <button className="border-none outline-none" onClick={handleModal}>
        <svg width="44px" height="44px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M4 18L20 18" stroke="#000000" strokeWidth="2" strokeLinecap="round"></path>
            <path d="M4 12L20 12" stroke="#000000" strokeWidth="2" strokeLinecap="round"></path>
            <path d="M4 6L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round"></path>
          </g>
        </svg>
      </button>
      {isModal && (
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
                  <div className="mt-6 w-full">{children}</div>
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
              onClick={handleModal}
            />
          </div>
        </AnimatePresence>
      )}
    </>
  );
}
