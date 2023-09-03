"use client";
import React from "react";
import cls from "classnames";
import { motion } from "framer-motion";
import dayjs from "dayjs";
export default function PatchnoteTree({ monthList, monthDataList, month, setMonth }) {
  return (
    <div className="relative w-full ml-36">
      <ul className="max-w-[500px] w-full  text-base font-thin leading-6 text-right rounded-sm relative">
        {monthList.map((monthString) => (
          <li key={monthString} className=" relative h-20  border-l-2  border-l-slate-800 ">
            <span
              onClick={() => setMonth(monthString)}
              className={cls(
                "block top-[-10px] absolute  left-[-78px] cursor-pointer p-1 text-right leading-6 font-bold",
                { "font-extrabold left-[-82px]": month === monthString }
              )}
            >
              {monthString}
            </span>
            <span
              onClick={() => setMonth(monthString)}
              className={cls("left-[-7px] block rounded-full cursor-pointer absolute w-3 h-3 bg-slate-800", {
                "bg-white shadow-black shadow-active": month === monthString,
              })}
            ></span>
          </li>
        ))}
      </ul>
      <ul className="absolute top-[-5px] left-[75px] w-64 lg:w-[320px] xl:w-[480px]  overflow-hidden whitespace-nowrap text-ellipsis mr-4">
        {monthDataList.map((monthData) => (
          <motion.li
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            key={monthData.id}
            className="hover:text-light-gray cursor-pointer"
          >
            <h3 className="mb-1 text-base font-bold leading-5 text-light-gray">
              {dayjs(monthData.createdAt).format("YYYY.MM.DD")}
            </h3>
            <h3 className="mb-8 text-base font-semibold leading-6 whitespace-nowrap  overflow-hidden  text-ellipsis">
              {monthData.title}
            </h3>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
