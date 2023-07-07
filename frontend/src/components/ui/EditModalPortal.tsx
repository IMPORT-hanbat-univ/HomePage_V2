"use client";
import React from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
};

export default function EditModalPortal({ children }: Props) {
  // broswer 환경일때만 ssr방지
  if (typeof window === "undefined") {
    return null;
  }
  const editModalElement = document.getElementById("edit-modal");
  return createPortal(children, editModalElement as Element);
}
