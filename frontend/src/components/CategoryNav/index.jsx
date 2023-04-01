import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import cls from "classnames";

export default function CategoryNav({ categoryList, seletedCategory }) {
  const router = useRouter();
  const { pathname, query } = router;
  return (
    <nav className="w-full ">
      <h6 className="mb-[1em] h-[20px] text-xs text-light-gray">카테고리</h6>
      <ul>
        {categoryList &&
          categoryList.length > 0 &&
          categoryList.map((category) => (
            <li key={category} className="py-2 px-3">
              <Link
                className={cls("text-base cursor-pointer hover:text-opacity-40", {
                  "text-lg font-semibold text-import-color": category === seletedCategory,
                })}
                href={{ pathname, query: { ...query, category: category } }}
              >
                {category}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}
