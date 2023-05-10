import React from "react";

import { cookies } from "next/headers";

import Auth from "@/api/auth";
import Link from "next/link";
import AsSyncComponent from "../AsSyncComponent";

const UserNav = AsSyncComponent(async function () {
  const cookieObj: any = cookies()
    .getAll()
    .map(({ name, value }: { name: string; value: string }) => {
      return {
        [name]: value,
      };
    });
  const auth = new Auth();
  const { decodeUser, error } = await auth.checkUser(cookieObj);
  console.log("decode", decodeUser, "error", error);
  return (
    <>
      {decodeUser && decodeUser?.nick_name ? (
        <>
          <button onClick={async () => await auth.logout(cookies)} className="p-3 border rounded bg-import-color text-white">
            로그아웃
          </button>
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
