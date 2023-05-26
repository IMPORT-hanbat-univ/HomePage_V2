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
  const handleAnimationComplete = () => {
    if (!open) {
      // 애니메이션 완료 후에 isOpen이 false인 경우에 숨김
      setOpen(false);
    }
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
          <div className="fixed top-0 left-0 h-full w-full flex z-30 lg:hidden">
            <motion.div
              className="w-2/3 h-full fixed bg-white z-40"
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
              <MobileDetailMenu
                header={"about"}
                menuArray={[
                  { title: "Introduce", link: "/" },
                  { title: "Rule", link: "/" },
                  { title: "Schedule", link: "/" },
                  { title: "Notice", link: "/about/notice" },
                ]}
              />
              <MobileDetailMenu
                header={"Community"}
                menuArray={[
                  { title: "QnA", link: "/qna" },
                  { title: "Information", link: "/" },
                ]}
              />
              <div className="w-full pl-6 pr-3 text-ellipsis text-left border-none h-14 overflow-hidden font-semibold text-lg flex items-center">
                <Link href="/">Project</Link>
              </div>
            </motion.div>
            <motion.div
              className="bg-black opacity-25 w-screen h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={handleModal}
            />
          </div>
        </AnimatePresence>
      )}
    </>
  );
}
