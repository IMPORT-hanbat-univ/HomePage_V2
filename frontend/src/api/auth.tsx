import jwt from "jsonwebtoken";

export default class Auth {


  async logout(cookieObj: any){
    try{
   
      await fetch("http://localhost:4000/api/logout", {
        method: "GET",
        headers: {
          accessToken: cookieObj.accessToken,
          refreshToken: cookieObj.refreshToken
        }
      })
      return;
      
    }catch(err:any){
      console.log(err);
      return "로그아웃 과정에서 에러 발생!!"
    }
  }
  async checkUser(cookieObj: any) {
    let decodeUser: any = {};
    let error = null;
    // const cookie = header.cookie && Object.keys(header.cookie).length > 0 ? header.cookie : "";
    // console.log("cookie", cookie);

    try {
      if (cookieObj?.accessToken && cookieObj?.refreshToken) {
        const res = await fetch("http://localhost:4000/api/tokenverification", {
          method: "GET",
          headers: {
            accessToken: cookieObj.accessToken,
            refreshToken: cookieObj.refreshToken,
          },
          next: {
            revalidate: 0,
          },
        });
        console.log("res", res);
        const user = jwt.decode(cookieObj.accessToken);
        if (user && Object.keys(user).length > 0) {
          decodeUser = user;
        } else {
          throw new Error("유저 정보를 찾을 수 없습니다.");
        }
      } else if (cookieObj?.refreshToken && !cookieObj?.accessToken) {
        const res = await fetch("http://localhost:4000/api/tokenverification", {
          method: "GET",
          headers: {
            accessToken: cookieObj.accessToken,
            refreshToken: cookieObj.refreshToken,
          },
          next: {
            revalidate: 0,
          },
        });
        console.log("res", res);
        const user = jwt.decode(cookieObj.accessToken);
        if (user && Object.keys(user).length > 0) {
          decodeUser = user;
        } else {
          throw new Error("유저 정보를 찾을 수 없습니다.");
        }
      }
    } catch (err: any) {
      console.log(err);
      error = "유저 정보를 찾을 수 없습니다.";
    }

    return { decodeUser, error };
  }
}
