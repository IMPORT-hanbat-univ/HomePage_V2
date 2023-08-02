import AdminSection from "@/components/AdminSection";
import AdminMenu from "@/components/ui/AdminMenu";
import React from "react";
import { cookies } from "next/headers";
import { checkUser } from "@/api/auth";
export default async function AdminPage() {
  const cookieObj = cookies();
  const { decodeUser } = await checkUser(
    cookieObj.get("accessToken")?.value || "",
    cookieObj.get("refreshToken")?.value || ""
  );

  return (
    <div className="w-full flex bg-neutral-100">
      <div className="w-1/6 min-w-[200px] h-screen">
        <AdminMenu />
      </div>
      <div className="w-5/6">
        <AdminSection user={decodeUser} />
      </div>
    </div>
  );
}
