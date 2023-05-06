// import { parse } from "cookie";
import Link from "next/link";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { DecodeUser } from "@/util/type";
import Auth from "@/api/auth";

export default async function Home() {
  const cookieObj: any = cookies()
    .getAll()
    .map(({ name, value }: { name: string; value: string }) => {
      return {
        [name]: value,
      };
    });
  const auth = new Auth();
  const { decodeUser, error } = await auth.checkUser(cookieObj);
  console.log("decode", decodeUser, "error", error);
  return (
    <>
      <div className="h-screen w-full  flex items-center justify-center flex-wrap">
        <Link href={"/notice"} className="p-3 border rounded bg-import-color text-white mr-3">
          공지사항
        </Link>
        <Link href={"/qna"} className="p-3 border rounded bg-import-color text-white mr-3">
          QnA
        </Link>
        <Link href={"/qna/1"} className="p-3 border rounded bg-import-color text-white mr-3">
          QnA 상세보기(연관게시글)
        </Link>
        <Link href={"/edit"} className="p-3 border rounded bg-import-color text-white mr-3">
          글쓰기
        </Link>
        <Link href={"/development/info"} className="p-3 border rounded bg-import-color text-white mr-3">
          개발 정보
        </Link>
        <Link href={"/development/info/1"} className="p-3 border rounded bg-import-color text-white mr-3">
          개발 정보 상세보기
        </Link>
        <Link href={"/project/patchnote/1"} className="p-3 border rounded bg-import-color text-white mr-3">
          패치노트 목록
        </Link>
        <Link href={"/project/patchnote/1/12"} className="p-3 border rounded bg-import-color text-white mr-3">
          패치노트 디테일
        </Link>
        {decodeUser && decodeUser?.nick_name ? (
          <>
            <Link href={"/"} className="p-3 border rounded bg-import-color text-white">
              로그아웃
            </Link>
            <div className="ml-3">{decodeUser?.nick_name}</div>
          </>
        ) : (
          <Link href={"http://localhost:4000/auth/kakao"} className="p-3 border rounded bg-import-color text-white">
            로그인
          </Link>
        )}
      </div>
    </>
  );
}
