import React from "react";
import EditorWithPreview from "@/components/EditorWithPreview";
import { checkUser } from "@/api/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
type Props = {
  searchParams: {
    category?: string | undefined;
  };
};

export default async function EditPage({ searchParams: { category } }: Props) {
  const cookieObj = cookies();
  const { decodeUser, error } = await checkUser(
    cookieObj.get("accessToken")?.value || "",
    cookieObj.get("refreshToken")?.value || ""
  );

  if (!decodeUser || Object.keys(decodeUser).length === 0) {
    redirect("/");
  }
  return (
    <div className="fixed z-20 inset-0 ">
      <EditorWithPreview nick_name={decodeUser?.nick_name} />
    </div>
  );
}
