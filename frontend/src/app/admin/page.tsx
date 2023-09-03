import AdminSection from "@/components/AdminSection";
import AdminMenu from "@/components/ui/AdminMenu";
import useMe from "@/hooks/useMe";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default async function AdminPage() {
  return (
    <div className="w-full flex bg-neutral-100">
      <div className="w-1/6 min-w-[200px] h-screen">
        <AdminMenu />
      </div>
      <div className="w-5/6">
        <AdminSection />
      </div>
    </div>
  );
}
