import React from "react";
import EditorWithPreview from "@/components/EditorWithPreview"
import { checkUser } from "@/api/auth";
import { cookies } from "next/headers";
import {redirect} from "next/navigation"

export default async function EditPage() {
  const cookieObj: any = cookies()
  .getAll()
  .map(({ name, value }: { name: string; value: string }) => {
    return {
      [name]: value,
    };
  });
  const {decodeUser, error} = await checkUser(cookieObj);
  if(!decodeUser||Object.keys(decodeUser).length === 0){
    redirect("/");
  }
  return (
    <div>
      <EditorWithPreview type={"notice"} />
    </div>
  );
}
