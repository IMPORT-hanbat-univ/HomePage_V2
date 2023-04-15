import { parse } from "cookie";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "@/recoil/user";

export default function Home({ decodeUser }) {
  const [user, setUser] = useRecoilState(userAtom);
  useEffect(() => {
    setUser(decodeUser);
  }, [decodeUser, setUser]);

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-wrap">
      <Link href={"/notice"} className="p-3 border rounded bg-import-color text-white mr-3">
        공지사항
      </Link>
      <Link href={"/qna"} className="p-3 border rounded bg-import-color text-white mr-3">
        큐엔에이
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
      {user ? (
        <>
          <Link href={"/"} className="p-3 border rounded bg-import-color text-white">
            로그아웃
          </Link>
          <div className="ml-3">{user.nick_name}</div>
        </>
      ) : (
        <Link href={"http://localhost:4000/auth/kakao"} className="p-3 border rounded bg-import-color text-white">
          로그인
        </Link>
      )}
    </div>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const cookie = req.headers.cookie && Object.keys(req.headers.cookie).length > 0 ? req.headers.cookie : "";
  console.log("cookie", cookie);
  const cookieObj = parse(cookie);
  console.log(cookieObj);
  if (cookieObj?.accessToken && cookieObj?.refreshToken) {
    const user = jwt.decode(cookieObj.accessToken);
    console.log(user);
    if (user && Object.keys(user).length > 0) {
      return {
        props: {
          decodeUser: user,
        },
      };
    }
  }
  return {
    props: {},
  };
};
