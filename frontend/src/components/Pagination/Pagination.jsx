import cls from "classnames";
import React from "react";

export default function Pagination({ page, nowPage }) {
  return (
    <nav className="flex items-center justify-center flex-wrap md:justify-between ">
      {nowPage !== 1 && (
        <a className="px-3 whitespace-nowrap inline-flex items-center justify-center border rounded-md h-9 min-w-[2.25em] text-xs order-1">
          이전 페이지
        </a>
      )}
      <ul
        className={cls("grow shrink flex-wrap flex items-center text-center text-xs", {
          "justify-center": nowPage !== 1 && nowPage === page,
        })}
      ></ul>
      {nowPage === page && (
        <a className="px-3 whitespace-nowrap inline-flex items-center justify-center border rounded-md h-9 min-w-[2.25em] text-xs order-3">
          다음 페이지
        </a>
      )}
    </nav>
  );
}
