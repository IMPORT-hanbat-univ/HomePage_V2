import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function EditModalContainer({ children }: Props) {
  return (
    <section className="fixed  top-0 left-0 w-full h-full z-50 flex flex-col justify-center items-center bg-[#F8F9FA]">
      {children}
    </section>
  );
}
