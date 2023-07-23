import Link from "next/link";
import React from "react";

const menuArray = [
  { title: "글 조회", category: "post" },
  { title: "회원 관리", category: "user" },
];

export default function AdminMenu() {
  return (
    <header className="w-full h-full p-4">
      <h2 className="pt-8 text-import-color font-extrabold text-3xl">IMPORT</h2>
      <menu className="pl-2 flex flex-col items-center gap-4 ">
        {menuArray.map(({ title, category }) => (
          <Link href={{ pathname: "/admin", query: { category } }} prefetch={false}>
            {title}
          </Link>
        ))}
      </menu>
    </header>
  );
}
