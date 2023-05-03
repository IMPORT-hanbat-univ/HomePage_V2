import { NextResponse } from "next/server";

export async function GET(req, res) {
  console.log("request", req.headers.accessToken);

  if (req.headers.accessToken && req.headers.refreshToken) {
    return NextResponse.json({ success: true });
  } else if (!req.headers.accessToken && req.headers.refreshToken) {
    return NextResponse.json({ accessToken: "new Token", refreshToken: "new Refresh" });
  } else if (!req.headers.accessToken && !req.headers.refreshToken) {
    return NextResponse.json({ error: "토큰이 존재하지 않습니다." });
  } else {
    return NextResponse.json({ error: "유효하지 않은 토큰입니다" });
  }
}
