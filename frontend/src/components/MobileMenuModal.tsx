"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Poppins } from "next/font/google";

const hanuman = Poppins({
  weight: "600",
  subsets: ["latin"],
  style: "normal",
});

export default function MobileMenuModal({ isModal, handleModal }: { isModal: boolean; handleModal: () => void }) {
  return (
    <AnimatePresence>
      <div className="fixed top-0 left-0 h-full w-full flex z-30">
        <motion.div
          className="w-1/2 h-full fixed bg-white z-40"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 0.5 }}
        >
          <div className=" flex w-full items-center px-3 ">
            <Link href="/" className="text-xl text-import-color ">
              <span className={hanuman.className}>#IMPORT</span>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="bg-black opacity-25 w-screen h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
        />
      </div>
    </AnimatePresence>
  );
}
