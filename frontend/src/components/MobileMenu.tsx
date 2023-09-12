"use client";
import React, { ReactNode, useState } from "react";
import lazyComponent from "@/util/lazyComponent";

const MobileModal = lazyComponent(() => import("./MobileModal"));

export default function MobileMenu() {
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleModal = () => {
    setIsModal((prev) => !prev);
  };

  const handleImportMenu = () => {
    MobileModal.preload();
  };

  return (
    <>
      <button className="border-none outline-none" onMouseEnter={handleImportMenu} onClick={handleModal}>
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
      {isModal && <MobileModal onModal={handleModal} />}
    </>
  );
}
