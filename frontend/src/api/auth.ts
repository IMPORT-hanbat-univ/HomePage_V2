import jwt from "jsonwebtoken";

interface CookieObject {
  accessToken?: string;
  refreshToken?: string;
  [key: string]: any; // 추가 속성이 있을 수 있으므로 인덱스 시그니처를 사용합니다.
}

export async function logout(cookieObj: CookieObject[] | []) {
  console.log("cookieObj", cookieObj);
  if (cookieObj.length > 0) {
    const { refreshToken = "", accessToken = "" } = (cookieObj as CookieObject[]).reduce<CookieObject>(
      (acc: any, cur: any) => {
        if (cur?.accessToken) {
          return { ...acc, accessToken: cur["accessToken"] };
        } else if (cur?.refreshToken) {
          return { ...acc, refreshToken: cur["refreshToken"] };
        }
      },
      {}
    );

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
  return;
}
export async function checkUser(cookieObj: CookieObject[] | []) {
  let decodeUser: any = {};
  let error = null;
  // const cookie = header.cookie && Object.keys(header.cookie).length > 0 ? header.cookie : "";
  // console.log("cookie", cookie);

  if (cookieObj.length > 0) {
    const { refreshToken = "", accessToken = "" } = (cookieObj as CookieObject[]).reduce<CookieObject>(
      (acc: any, cur: any) => {
        if (cur?.accessToken) {
          return { ...acc, accessToken: cur["accessToken"] };
        } else if (cur?.refreshToken) {
          return { ...acc, refreshToken: cur["refreshToken"] };
        }
      },
      {}
    );

    try {
      const res = await fetch(`http://${process.env.NETWORK_BACK_NODE_ADRESS}:4000/api/tokenverification`, {
        method: "GET",
        headers: {
          accessToken: accessToken || "",
          refreshToken: refreshToken || "",
        },
        next: {
          revalidate: 0,
        },
      });
      //console.log("res", res);
      if (res.ok) {
        const token = res.headers.get("accessToken") || "";
        const user = jwt.decode(token);
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
  }
  return { decodeUser, error };
}
