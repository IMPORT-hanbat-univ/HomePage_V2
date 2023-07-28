"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const menuArray = [
  { title: "회원 관리", page: "user" },
  { title: "글 조회", page: "post" },

  { title: "레벨 관리", page: "rank" },
];

export default function AdminMenu() {
  const searchParams = useSearchParams();
  const seletedPage = searchParams?.get("page") ?? "user";
  return (
    <header className="w-full h-full bg-white ">
      <Link href="/" className="block py-8 pl-12 text-import-color font-extrabold text-3xl">
        IMPORT
      </Link>
      <menu className=" mt-12  text-xl flex flex-col items-center gap-4 ">
        {menuArray.map(({ title, page }, index) => (
          <Link
            key={index}
            href={{ pathname: "/admin", query: { page } }}
            prefetch={false}
            className={`${
              seletedPage === page && "border-l-4  font-semibold border-blue-500"
            } w-full  text-center hover:border-l-4 p-2 hover:font-semibold hover:border-blue-500`}
          >
            {title}
          </Link>
        ))}
      </menu>
    </header>
  );
}
