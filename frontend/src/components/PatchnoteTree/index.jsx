import React from "react";
import cls from "classnames";
import dayjs from "dayjs";
export default function PatchnoteTree({ monthList, monthDataList, month, setMonth }) {
  console.log(month);
  return (
    <div className="mb-2 relative">
      <ul className="text-base font-thin leading-6 text-right rounded-sm relative">
        {monthList.map((monthString) => (
          <li key={monthString} className="w-[500px] relative h-20  border-l-2  border-l-slate-800 ">
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
              className={cls("left-[-7px] block rounded-full absolute w-3 h-3 bg-slate-800", {
                "bg-white shadow-black shadow-active": month === monthString,
              })}
            ></span>
          </li>
        ))}
      </ul>
      <ul className="absolute top-[-5px] left-[75px] ">
        {monthDataList.map((monthData) => (
          <li key={monthData.id}>
            <h3 className="mb-1 text-base font-bold leading-5 text-light-gray">
              {dayjs(monthData.createAt).format("YYYY.MM.DD")}
            </h3>
            <h3 className="mb-8 text-base font-semibold leading-6 whitespace-pre-wrap">{monthData.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}
