import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";

export default function RequestLogin() {
  return (
    <section className=" w-full h-full px-4 mx-auto my-10 md:my-16 flex flex-col items-center">
      <h2 className="md:text-3xl text-xl font-semibold py-4 text-center">먼저 로그인을 해주세요!</h2>
      <LoginButton />
    </section>
  );
}
