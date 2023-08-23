"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  title: string;
  children: React.ReactNode;
  isFirst?: boolean;
};

export default function Question({ title, children, isFirst = false }: Props) {
  const [isOpen, setIsOpen] = useState(isFirst);
  return (
    <motion.div className="shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-[20px] bg-[#FBFFFC] py-2 px-5 md:py-4 md:px-10">
      <motion.button
        className="flex items-center w-full justify-between font-bold md:text-[24px] text-[15px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>
          <span className="text-base md:text-[20px] text-import-color">Q. </span>
          {title}
        </p>
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          initial={false}
          animate={isOpen ? "open" : "closed"}
        >
          <svg width="15" height="15" viewBox="0 0 20 20">
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </motion.div>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="p-4 md:text-[20px] text-[13px] font-bold leading-[25px] md:leading-[30px] tracking-[-0.3px] ">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
