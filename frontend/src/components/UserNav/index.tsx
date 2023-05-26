import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import AsSyncComponent from "../AsSyncComponent";
import { checkUser, logout } from "@/api/auth";
import LogoutButton from "../LogoutButton";

const UserNav = AsSyncComponent(async function () {
  const cookieObj = cookies();
  const { decodeUser, error } = await checkUser(
    cookieObj.get("accessToken")?.value || "",
    cookieObj.get("refreshToken")?.value || ""
  );
  console.log("decode", decodeUser, "error", error);

  return (
    <>
      {decodeUser && decodeUser?.nick_name ? (
        <div className="flex items-center justify-between w-full lg:w-60">
          <div className="mr-3 inline-block">{decodeUser?.nick_name}</div>
          <LogoutButton />
        </div>
      ) : (
        <Link
          href={"http://localhost:4000/auth/kakao"}
          className="border border-import-color rounded-md px-7 py-2 lg:leading-[18px] lg:px-[42px] lg:py-[11px] bg-white"
        >
          Log in
        </Link>
      )}
    </>
  );
});

export default UserNav;
