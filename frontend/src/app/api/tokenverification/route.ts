import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, res:Response) {
  

  if (req.headers.get("accessToken") && req.headers.get("refreshToken")) {
    return NextResponse.json({ success: true });
  } else if (!req.headers.get("accessToken") && req.headers.get("refreshToken")) {
    return NextResponse.json({ accessToken: "new Token", refreshToken: "new Refresh" });
  } else if (!req.headers.get("accessToken") && !req.headers.get("refreshToken")) {
    return new Error("토큰이 존재하지 않습니다.");
  } else {
    return new Error("서버 에러");
  }

}
