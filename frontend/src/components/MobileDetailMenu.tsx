"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
export default function MobileDetailMenu({
  header,
  menuArray,
}: {
  header: string;
  menuArray: { title: string; link: string }[];
}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="mt-2 w-full">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full pl-6 pr-3 text-ellipsis text-left border-none h-14 overflow-hidden font-semibold text-lg"
      >
        {header}
      </button>
      {isOpen && (
        <motion.ul
          className="pl-10 pr-2 text-ellipsis overflow-hidden w-full"
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {menuArray.map(({ title, link }) => (
            <motion.li
              className="mt-1 text-base"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Link href={link}>{title}</Link>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
