import cls from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function Pagination({ page, nowPage, pageRangeArray }) {
  const router = useRouter();
  const { pathname, query } = router;
  return (
    <nav className="flex items-center justify-center flex-wrap md:justify-between ">
      {nowPage !== 1 && (
        <a className="px-3 whitespace-nowrap inline-flex items-center justify-center border rounded-md h-9 min-w-[2.25em] text-xs order-1">
          이전 페이지
        </a>
      )}
      <ul className="grow shrink flex-wrap flex items-center text-center text-xs justify-center order-2">
        {nowPage > 10 && (
          <>
            <li>
              <Link
                href={{ pathname, query: { ...query, nowPage: 1 } }}
                className=" min-w-[2.25em] inline-flex items-center justify-center m-1 px-2 py-1   text-[1em] border rounded-sm"
              >
                1
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname, query: { ...query, nowPage: pageRangeArray[0] - 10 } }}
                className=" min-w-[2.25em] inline-flex items-center justify-center m-1 px-2 py-1   text-[1em] border rounded-sm"
              >
                ...
              </Link>
            </li>
          </>
        )}
        {pageRangeArray.map((item) => {
          return nowPage === item ? (
            <li key={item}>
              <a className="text-white bg-import-color min-w-[2.25em] inline-flex items-center justify-center m-1 px-2 py-1   text-[1em] border rounded-sm">
                {item}
              </a>
            </li>
          ) : (
            <li key={item}>
              <Link
                href={{ pathname, query: { ...query, nowPage: item } }}
                className=" min-w-[2.25em] inline-flex items-center justify-center m-1 px-2 py-1   text-[1em] border rounded-sm"
              >
                {item}
              </Link>
            </li>
          );
        })}
        {pageRangeArray?.length > 0 && pageRangeArray[pageRangeArray.length - 1] < page && (
          <li>
            <Link
              href={{ pathname, query: { ...query, nowPage: pageRangeArray[0] + 10 } }}
              className=" min-w-[2.25em] inline-flex items-center justify-center m-1 px-2 py-1   text-[1em] border rounded-sm"
            >
              ...
            </Link>
          </li>
        )}
      </ul>
      {nowPage !== page && (
        <a className="px-3 whitespace-nowrap inline-flex items-center justify-center border rounded-md h-9 min-w-[2.25em] text-xs order-3">
          다음 페이지
        </a>
      )}
    </nav>
  );
}
