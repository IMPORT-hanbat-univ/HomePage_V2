import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Link href={"/notice"} className="p-3 border rounded bg-import-color text-white mr-3" >공지사항</Link>
      <Link href={"/qna"} className="p-3 border rounded bg-import-color text-white mr-3" >큐엔에이</Link>
      <Link href={"/edit"} className="p-3 border rounded bg-import-color text-white mr-3" >글쓰기</Link>
      <Link href={"/development/info"} className="p-3 border rounded bg-import-color text-white mr-3" >개발 정보</Link>
      <Link href={"/development/info/1"} className="p-3 border rounded bg-import-color text-white" >개발 정보 상세보기</Link>
    </div>
  );
}
