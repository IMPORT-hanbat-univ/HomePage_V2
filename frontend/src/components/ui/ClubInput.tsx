"use client";
import React, { ChangeEvent, ReactNode } from "react";

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  value: string;
  label: string;
  name: string;
  type?: "text" | "email";
  isSelect?: boolean;
  children?: ReactNode;
};

export default function ClubInput({ onChange, value, name, label, type = "text", children, isSelect = false }: Props) {
  return (
    <>
      <label htmlFor={name} className="md:text-[13px] text-[11px] tracking-[-0.195px] text-[#565656]">
        {label}
      </label>
      {isSelect ? (
        children ? (
          <select
            className="border w-20 md:w-24  md:text-[15px] text-[13px] rounded-[10px] p-2 leading-6 md:leading-7 block grow "
            value={value}
            onChange={onChange}
            name={name}
            id={name}
          >
            {children}
          </select>
        ) : (
          <></>
        )
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          className="border md:text-[15px] text-[13px] rounded-[10px] p-1 leading-6 md:leading-7 w-full block grow "
          value={value}
          onChange={onChange}
        />
      )}
    </>
  );
}
