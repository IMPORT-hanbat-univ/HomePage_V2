import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <><a href="http://localhost:4000/auth/kakao" methods="post">
        <button>회원가입</button>
    </a>
        </>
  );
}
