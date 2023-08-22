import React from "react";
import ProfileNav from "./ProfileNav";

type Props = {
  category: string;
};

export default function MyAccount({ category }: Props) {
  return (
    <div>
      <h3 className="md:mb-10 text-[30px] font-medium tracking-[-0.45px]">내 계정</h3>
      <ProfileNav category={category} />
    </div>
  );
}
