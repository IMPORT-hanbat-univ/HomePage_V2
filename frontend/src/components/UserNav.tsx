"use client";
import React from "react";
import Link from "next/link";

import LogoutButton from "./LogoutButton";

import useMe from "@/hooks/useMe";

export default function UserNav() {
  const { decodeUser, error } = useMe();

  return (
    <div className="flex items-center justify-between w-full lg:w-60">
      {decodeUser && decodeUser?.nick_name ? (
        <>
          <div className="mr-3 inline-block">{decodeUser?.nick_name}</div>
          <LogoutButton />
        </>
      ) : (
        <Link
          href={"http://localhost:4000/auth/kakao"}
          className="border border-import-color rounded-md px-7 py-2 lg:leading-[18px] lg:px-[42px] lg:py-[11px] bg-white"
        >
          Log in
        </Link>
      )}
    </div>
  );
}
