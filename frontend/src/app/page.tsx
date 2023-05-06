// import { parse } from "cookie";
import Link from "next/link";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { DecodeUser } from "@/util/type";

export default async function Home() {
  const cookieObj: any = cookies()
    .getAll()
    .map(({ name, value }: { name: string; value: string }) => {
      return {
        [name]: value,
      };
    });

  let decodeUser: any = {};
  let error = null;
  // const cookie = header.cookie && Object.keys(header.cookie).length > 0 ? header.cookie : "";
  // console.log("cookie", cookie);

  console.log(cookieObj);
  if (cookieObj?.accessToken && cookieObj?.refreshToken) {
    fetch("http://localhost:3000/api/tokenverification", {
      method: "GET",
      headers: {
        accessToken: cookieObj.accessToken,
        refreshToken: cookieObj.refreshToken,
      },
    })
      .then((res) => {
        console.log("res", res);
        const user = jwt.decode(cookieObj.accessToken);
        if (user && Object.keys(user).length > 0) {
          decodeUser = user;
        } else {
          error = "유저 정보를 찾을 수 없습니다.";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (cookieObj?.refreshToken && !cookieObj?.accessToken) {
    fetch("http://localhost:3000/api/tokenverification", {
      method: "GET",
      headers: {
        accessToken: cookieObj.accessToken,
        refreshToken: cookieObj.refreshToken,
      },
    })
      .then((res) => {
        console.log("res", res);
        const user = jwt.decode(cookieObj.accessToken);
        if (user && Object.keys(user).length > 0) {
          decodeUser = user;
        } else {
          error = "유저 정보를 찾을 수 없습니다.";
        }
      })
      .catch((err) => {
        error = "유저 정보를 찾을 수 없습니다.";
      });
  }

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
