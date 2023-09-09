import Link from "next/link";
import React from "react";

export default function LoginButton() {
  const loginURL =
    "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=" +
    process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID +
    "&redirect_uri=http://www.import-hanbat.com/api/auth/kakao/callback";
  return (
    <Link
      href={loginURL}
      //href={`http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/auth/kakao`}
      className="border border-import-color rounded-md px-7 py-2 lg:leading-[18px] lg:px-[42px] lg:py-[11px] bg-white"
    >
      Log in
    </Link>
  );
}
