"use client";
import React, { useState } from "react";
import ApplicationForm from "./ApplicationForm";
import Link from "next/link";

export default function RankApplication() {
  const [isSuccess, setSuccess] = useState(false);

  if (isSuccess) {
    return (
      <section className="w-full max-w-4xl px-4 mx-auto my-10 md:my-16">
        <h2 className="md:text-3xl text-xl font-semibold py-4 text-center">신청이 완료되었습니다.</h2>
        <Link href={"/"} className="text-blue-500 text-center text-base block md:text-lg">
          홈으로 이동
        </Link>
      </section>
    );
  } else {
    return <ApplicationForm setSuccess={setSuccess} />;
  }
}