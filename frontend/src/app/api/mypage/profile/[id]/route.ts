import { NextResponse } from "next/server";

export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
  return NextResponse.json({
    userId: id,
    nick_name: "박건상",
    createdAt: "2023-03-11 08:00:00",
    email: "pkss0626@naver.com",
    rank: 4,
    profileImg: null,
    department: "모바일융합공학과",
    grade: "2학년",
    blog: "https://mayrang.tistory.com/",
    github_url: "https://github.com/mayrang",
    framework: "React, Nextjs",
    language: "javascript, typescript, python",
  });
}
