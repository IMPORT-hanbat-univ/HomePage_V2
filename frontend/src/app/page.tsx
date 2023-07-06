import UserNav from "@/components/UserNav";

import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="h-screen w-full  flex items-center justify-center flex-wrap">
        <Link prefetch={false} href={"about/notice"} className="p-3 border rounded bg-import-color text-white mr-3">
          공지사항
        </Link>
        <Link prefetch={false} href={"about/notice/1"} className="p-3 border rounded bg-import-color text-white mr-3">
          상세보기
        </Link>
        <Link prefetch={false} href={"/qna"} className="p-3 border rounded bg-import-color text-white mr-3">
          QnA
        </Link>
        <Link prefetch={false} href={"/qna/1"} className="p-3 border rounded bg-import-color text-white mr-3">
          QnA 상세보기(연관게시글)
        </Link>
        <Link prefetch={false} href={"/edit"} className="p-3 border rounded bg-import-color text-white mr-3">
          글쓰기
        </Link>
        <Link
          prefetch={false}
          href={"/development/info"}
          className="p-3 border rounded bg-import-color text-white mr-3"
        >
          개발 정보
        </Link>
        <Link
          prefetch={false}
          href={"/development/info/1"}
          className="p-3 border rounded bg-import-color text-white mr-3"
        >
          개발 정보 상세보기
        </Link>
        <Link
          prefetch={false}
          href={"/project/patchnote/1"}
          className="p-3 border rounded bg-import-color text-white mr-3"
        >
          패치노트 목록
        </Link>
        <Link
          prefetch={false}
          href={"/project/patchnote/1/12"}
          className="p-3 border rounded bg-import-color text-white mr-3"
        >
          패치노트 디테일
        </Link>
      </div>
    </>
  );
}
