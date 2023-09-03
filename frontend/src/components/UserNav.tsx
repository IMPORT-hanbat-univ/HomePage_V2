"use client";
import React from "react";
import Link from "next/link";

import LogoutButton from "./ui/LogoutButton";

import useMe from "@/hooks/useMe";
import ProfileNav from "./ui/ProfileNav";

export default function UserNav() {
  const { decodeUser, error } = useMe();
  console.log("decodeUser", decodeUser);

  const loginURL =
    "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=" +
    process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID +
    `&redirect_uri=http://www.import-hanbat.com/api/auth/kakao/callback`;
  const handleLogin = async () => {
    console.log("handleLogin function called");
    try {
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/auth/kakao`, {
        method: "GET",
      });

      if (response.ok) {
        // Redirect or handle the response as needed
        // For example, you might redirect to the authorization URL
        window.location.href = response.url;
      } else {
        // Handle error case
        console.error("Login request failed");
      }
    } catch (error) {
      console.error("Login request failed", error);
    }
  };

  return (
    <div className="flex items-center justify-between w-full xl:w-60">
      {decodeUser && decodeUser?.nick_name ? (
        <div className="relative flex justify-between items-center w-full">
          <div className="mr-7 inline-block peer">{decodeUser?.nick_name}</div>
          <LogoutButton />
          <div className=" peer w-20 h-20 absolute"></div>
          <div className="absolute hover:block peer-hover:block hidden lg:top-8 lg:-left-32 top-14 -left-2 ">
            <ProfileNav />
          </div>
        </div>
      ) : (
        <Link
          href={loginURL}
          //href={`http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/auth/kakao`}
          className="border border-import-color rounded-md px-7 py-2 lg:leading-[18px] lg:px-[42px] lg:py-[11px] bg-white"
        >
          Log in
        </Link>
        //<button onClick={handleLogin} className="border border-import-color rounded-md px-7 py-2 lg:leading-[18px] lg:px-[42px] lg:py-[11px] bg-white">Log in</button>
      )}
    </div>
  );
}
