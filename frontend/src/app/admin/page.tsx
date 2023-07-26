import AdminSection from "@/components/AdminSection";
import AdminMenu from "@/components/ui/AdminMenu";
import React from "react";

export default function AdminPage() {
  return (
    <div className="w-screen flex bg-neutral-100">
      <div className="w-1/6 min-w-[200px] h-screen">
        <AdminMenu />
      </div>
      <div className="w-full">
        <AdminSection />
      </div>
    </div>
  );
}
