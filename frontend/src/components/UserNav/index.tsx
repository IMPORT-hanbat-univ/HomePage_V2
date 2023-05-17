import React from "react";
import {cookies} from "next/headers"
import Link from "next/link";
import AsSyncComponent from "../AsSyncComponent";
import { checkUser, logout } from "@/api/auth";
import LogoutButton from "../LogoutButton";

const UserNav = AsSyncComponent(async function () {

  const cookieObj = cookies();
  const { decodeUser, error } = await checkUser(cookieObj.get("accessToken")?.value || "", cookieObj.get("refreshToken")?.value|| "");
  console.log("decode", decodeUser, "error", error);

  return (
    <>
      {decodeUser && decodeUser?.nick_name ? (
        <>
          <LogoutButton />
          <div className="ml-3">{decodeUser?.nick_name}</div>
        </>
      ) : (
        <Link href={"http://localhost:4000/auth/kakao"} className="p-3 border rounded bg-import-color text-white">
          로그인
        </Link>
      )}
    </>
  );
});

export default UserNav;
