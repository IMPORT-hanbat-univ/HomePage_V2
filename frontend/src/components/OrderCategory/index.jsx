"use client";
import React from "react";
import { BsDot } from "react-icons/bs";
import cls from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function OrderCategory({ seleted, orderArray }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams ? Object.fromEntries(searchParams.entries()) : {};
  const clickSort = (order) => {
    const queryString = new URLSearchParams({ ...query, order }).toString();
    console.log("order", `${pathname}?${queryString}`);
    router.push(`${pathname}?${queryString}`);
  };
  return (
    <ul className="w-auto flex items-center ">
      {orderArray.map((item) => (
        <li key={item.order}>
          <button
            onClick={() => clickSort(item.order)}
            className={cls(
              "p-2 h-7 text-xs flex items-center font-semibold",
              { "text-black": seleted === item.order },
              { "text-light-gray": seleted !== item.order }
            )}
            disabled={seleted === item.order}
          >
            <BsDot className="text-import-color text-lg" />
            {` ${item.name}`}
          </button>
        </li>
      ))}
    </ul>
  );
}
