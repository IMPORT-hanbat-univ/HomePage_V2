"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    let queryString = "";
    const query = searchParams ? Object.fromEntries(searchParams.entries()) : {};
    if (search.trim() === "") {
      const copyQuery = { ...query };
      delete copyQuery.search;
      queryString = new URLSearchParams(copyQuery).toString();
    } else {
      queryString = new URLSearchParams({ ...query, search: search.trim() }).toString();
    }
    router.push(`${pathname}?${queryString}`);
  };
  return (
    <form onSubmit={submitSearch} className="flex mb-2">
      <div className="w-full h-12 px-3 pt-2 pb-1 overflow-x-hidden overflow-y-auto flex items-center border border-zinc-300 rounded">
        <svg
          className="mt-1 mr-2 overflow-hidden"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#212529"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.5 7c0 .59-.116 1.176-.343 1.722-.226.546-.557 1.042-.975 1.46-.418.418-.914.75-1.46.975-.546.226-1.131.343-1.722.343-.59 0-1.176-.117-1.722-.343-.546-.226-1.042-.557-1.46-.975-.418-.418-.75-.914-.975-1.46C2.616 8.176 2.5 7.591 2.5 7c0-1.194.474-2.338 1.318-3.182C4.662 2.974 5.807 2.5 7 2.5c1.193 0 2.338.474 3.182 1.318C11.026 4.662 11.5 5.806 11.5 7zm-.82 4.74c-1.206.936-2.723 1.377-4.242 1.234-1.52-.143-2.928-.86-3.937-2.005C1.49 9.825.956 8.34 1.004 6.813c.047-1.526.675-2.976 1.754-4.055 1.08-1.08 2.53-1.707 4.055-1.755 1.525-.047 3.012.488 4.156 1.498 1.145 1.01 1.862 2.417 2.005 3.937.143 1.52-.298 3.036-1.234 4.242l3.04 3.04c.074.069.133.151.174.243.04.092.063.192.065.292.001.101-.017.201-.055.294-.038.094-.094.179-.165.25-.071.071-.156.127-.25.165-.093.038-.193.056-.293.054-.101-.001-.2-.023-.293-.064-.091-.041-.174-.1-.243-.174l-3.04-3.04z"
          />
        </svg>
        <input
          className="w-full text-[14px] border-none bg-none outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색어를 입력해주세요"
        />
      </div>
      <button
        type="submit"
        className="hidden md:inline-flex ml-2 md:ml-4 h-12 bg-import-color border-import-color text-xs font-semibold p-3  text-white w-[60px] md:min-w-[96px] rounded justify-center items-center"
      >
        검색
      </button>
    </form>
  );
}
