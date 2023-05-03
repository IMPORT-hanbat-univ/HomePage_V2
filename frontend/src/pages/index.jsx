import { parse } from "cookie";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "@/recoil/user";
import { ReactNotifications, Store } from "react-notifications-component";

export default function Home({ decodeUser, error }) {
  const [user, setUser] = useRecoilState(userAtom);
  useEffect(() => {
    setUser(decodeUser);
  }, [decodeUser, setUser]);

  useEffect(() => {
    console.log("err", error);
    if (error) {
      console.log(error);
      Store.addNotification({
        title: "Error",
        message: error,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
        animationOut: ["animate__animated animate__fadeOut"],
      });
    }
  }, [error]);

  return (
    <>
      {error && <ReactNotifications />}
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
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  let decodeUser = {};
  let error = null;
  const cookie = req.headers.cookie && Object.keys(req.headers.cookie).length > 0 ? req.headers.cookie : "";
  // console.log("cookie", cookie);
  const cookieObj = parse(cookie);
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
          return {
            props: {
              decodeUser: user,
            },
          };
        } else {
          return {
            props: { error: "유저 정보를 찾을 수 없습니다." },
          };
        }
      })
      .catch((err) => {
        console.log(err);
        return {
          props: {
            error: "에러 발생",
          },
        };
      });
  } else if (cookieObj?.refreshToken && !cookieObj?.accessToken) {
    fetch("http://localhost:3000/api/tokenverification", {
      method: "GET",
      headers: {
        accessToken: null,
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
  return {
    props: {
      decodeUser,
      error,
    },
  };
};
