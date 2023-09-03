"use client";
import React from "react";
import { BsDot } from "react-icons/bs";
import cls from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  selected: string;
  orderArray: { order: string; name: string }[];
};

export default function OrderCategory({ selected, orderArray }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams ? Object.fromEntries(searchParams.entries()) : {};
  const clickSort = (order: string) => {
    const queryString = new URLSearchParams({ ...query, order }).toString();

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
              { "text-black": selected === item.order },
              { "text-light-gray": selected !== item.order }
            )}
            disabled={selected === item.order}
          >
            <BsDot className="text-import-color text-lg" />
            {` ${item.name}`}
          </button>
        </li>
      ))}
    </ul>
  );
}
