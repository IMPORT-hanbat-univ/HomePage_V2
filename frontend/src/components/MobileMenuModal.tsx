"use client";
import React from "react";
import { motion } from "framer-motion";

export default function MobileMenuModal({ handleModal }: { handleModal: () => void; }) {
  const menuVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="fixed top-0 left-0 h-full w-full z-30">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={menuVariants}
        transition={{ duration: 0.3 }}
        className="h-2/5 w-full bg-import-color bg-opacity-100 mx-auto flex flex-col items-center relative"
      >
        <div className="h-[60px] flex w-full items-center justify-end px-4">
          <button onClick={handleModal}>
            <svg viewBox="0 0 24 24" height="36px" width="36px" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g id="Menu / Close_MD">
                  <path
                    id="Vector"
                    d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </g>
            </svg>
          </button>
        </div>
        뭐임!
      </motion.div>
      <div onClick={handleModal} className="bg-black opacity-25 h-3/5 w-full"></div>
    </div>
  );
}


