"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AsSyncComponent from "./AsSyncComponent";
import { checkUser, logout } from "@/api/auth";
import LogoutButton from "./LogoutButton";
import { getCookie } from "cookies-next";
import axios from "axios";
import jwt from "jsonwebtoken";
import useMe from "@/hooks/useMe";

export default function UserNav() {
  // const [decodeUser, setDecodeUser] = useState<any>();

  const { decodeUser, error } = useMe();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await checkUser(getCookie("accessToken") as string, getCookie("refreshToken") as string);
  //       const { decodeUser, error } = response;

  //       if (decodeUser) {
  //         setDecodeUser(decodeUser);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  console.log("decode", decodeUser, "error", typeof window);

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
