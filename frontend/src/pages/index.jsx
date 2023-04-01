import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const clickPaqe = (path) => {
    router.push(`/${path}`)
  }
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <button className="p-3 border rounded bg-import-color text-white mr-3" onClick={() => clickPaqe("notice")}>공지사항</button>
      <button className="p-3 border rounded bg-import-color text-white mr-3" onClick={() => clickPaqe("qna")}>큐엔에이</button>
      <button className="p-3 border rounded bg-import-color text-white" onClick={() => clickPaqe("edit")}>글쓰기</button>

    </div>
  );
}
