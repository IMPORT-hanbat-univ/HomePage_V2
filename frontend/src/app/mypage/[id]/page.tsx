import { checkUser } from "@/api/auth";
import MyActivity from "@/components/MyActivity";
import Profile from "@/components/Profile";
import MyAccount from "@/components/ui/MyAccount";
import { cookies } from "next/headers";
import React from "react";
type Props = {
  params: {
    id: string;
  };
  searchParams: {
    category?: string | undefined;
  };
};
export default async function MyProfile({ params: { id }, searchParams: { category } }: Props) {
  const categroyQuery = category ?? "profile";
  const cookieObj = cookies();
  const { decodeUser, error } = await checkUser(cookieObj.get("accessToken")?.value || "");
  return (
    <div className="flex md:flex-row flex-col items-center md:items-start md:mx-auto py-6 md:py-16 w-full gap-6 md:gap-3 md:w-9/12 max-w-[1180px]">
      <div className="w-auto md:w-[20%] mx-auto">
        <MyAccount category={categroyQuery} />
      </div>
      <div className="grow">{categroyQuery === "activity" ? <MyActivity /> : <Profile />}</div>
    </div>
  );
}
