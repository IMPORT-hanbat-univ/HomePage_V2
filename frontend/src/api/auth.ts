import { getCookie, getCookies } from "cookies-next";
import jwt from "jsonwebtoken";

export async function logout(accessToken: string, refreshToken: string) {
  try {
    await fetch("http://localhost:4000/auth/logout", {
      method: "GET",
      headers: {
        accessToken: accessToken || "",
        refreshToken: refreshToken || "",
      },
    });
    return;
  } catch (err: any) {
    console.log(err);
    return "로그아웃 과정에서 에러 발생!!";
  }
}

export async function checkUser(accessToken: string, refreshToken: string) {
  let decodeUser: any = {};
  let error = null;
  // const cookie = header.cookie && Object.keys(header.cookie).length > 0 ? header.cookie : "";
  // console.log("cookie", cookie);

  try {
    const res = await fetch(
      `http://${process.env.NETWORK_BACK_NODE_ADRESS ?? "localhost"}:4000/auth/tokenverification`,
      {
        method: "GET",
        headers: {
          accessToken: accessToken || "",
          refreshToken: refreshToken || "",
        },
      }
    );
    //console.log("res", res);
    if (res.ok) {
      console.log("result", res);
      const user = await res.json();
      console.log("result", res, user);

      if (user && Object.keys(user).length > 0) {
        decodeUser = user;
      } else {
        throw new Error("유저 정보를 찾을 수 없습니다.");
      }
    } else {
      throw new Error("유저 정보를 찾을 수 없습니다.");
    }
  } catch (err: any) {
    console.log(err);
    error = "유저 정보를 찾을 수 없습니다.";
  }

  return { decodeUser, error };
}
