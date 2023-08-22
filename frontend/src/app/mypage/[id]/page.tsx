import Profile from "@/components/Profile";
import MyAccount from "@/components/ui/MyAccount";
import React from "react";
type Props = {
  params: {
    id: string;
  };
  searchParams: {
    category?: string | undefined;
  };
};
export default function MyProfile({ params: { id }, searchParams: { category } }: Props) {
  const categroyQuery = category ?? "profile";
  return (
    <div className="flex mx-auto lg:py-16 w-full lg:w-9/12 max-w-[1180px]">
      <div className="w-[20%]">
        <MyAccount category={categroyQuery} />
      </div>
      <div className="grow">
        <Profile />
      </div>
    </div>
  );
}
