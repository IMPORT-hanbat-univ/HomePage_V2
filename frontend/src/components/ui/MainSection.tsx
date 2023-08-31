import React from "react";
import MarqueeContainer from "./MarqueeContainer";
import Image from "next/image";
import Link from "next/link";

export default function MainSection() {
  return (
    <section className="w-full h-[calc(100vh-60px)] bg-black">
      <div className="w-full relative h-full flex justify-center">
        <div className="w-full relative h-[63vh]  lg:h-[485px]  bg-black overflow-hidden ">
          <div className="md:w-[1960px] w-[800px]  absolute md:-top-36 -left-4 h-full rotate-[-15deg]">
            <MarqueeContainer style={"-left-12"}>
              <Image
                priority
                className="md:mx-[55px] mx-[30px] w-[150px] md:w-[218px] h-[150px] md:h-[218px]"
                src="/images/git.png"
                alt="git"
                width={218}
                height={218}
              />
              <Image
                className="md:mx-[55px] mx-[30px] w-[150px] md:w-[218px] h-[150px] md:h-[218px]"
                src="/images/react.png"
                alt="react"
                width={218}
                height={218}
                priority
              />
              <Image
                className="md:mx-[55px] mx-[30px] w-[150px] md:w-[218px] h-[150px] md:h-[218px]"
                src="/images/npm.png"
                alt="npm"
                width={218}
                height={218}
                priority
              />
              <Image
                className="md:mx-[55px] mx-[30px] w-[150px] md:w-[218px] h-[150px] md:h-[218px]"
                src="/images/javascript.png"
                alt="javascript"
                width={218}
                height={218}
                priority
              />
              <Image
                className="md:mx-[55px] mx-[30px] w-[150px] md:w-[218px] h-[150px] md:h-[218px]"
                src="/images/css.png"
                alt="css"
                width={218}
                height={218}
                priority
              />
              <Image
                className="md:mx-[55px] mx-[30px] w-[150px] md:w-[218px] h-[150px] md:h-[218px]"
                src="/images/vscode.png"
                alt="vscode"
                width={218}
                height={218}
                priority
              />
            </MarqueeContainer>
            <MarqueeContainer style={" -left-12"}>
              <Image
                className="md:mx-[55px] mx-[30px] w-[150px] md:w-[218px] h-[150px] md:h-[218px]"
                src="/images/vscode.png"
                alt="vscode"
                width={218}
                height={218}
                priority
              />
              <Image
                className="md:mx-[55px] mx-[30px] w-[150px] md:w-[218px] h-[150px] md:h-[218px]"
                src="/images/flutter.png"
                alt="flutter"
                width={218}
                height={218}
                priority
              />
              <Image
                className="md:mx-[55px] mx-[30px] w-[150px] md:w-[218px] h-[150px] md:h-[218px]"
                src="/images/vue.png"
                alt="vue"
                width={218}
                height={218}
                priority
              />

              <Image
                className="md:mx-[55px] mx-[30px] w-[150px] md:w-[218px] h-[150px] md:h-[218px]"
                src="/images/nest.png"
                alt="nest"
                width={218}
                height={218}
                priority
              />
              <Image
                className="md:mx-[55px] mx-[30px] w-[150px] md:w-[218px] h-[150px] md:h-[218px]"
                src="/images/java.png"
                alt="java"
                width={218}
                height={218}
                priority
              />
              <Image
                className="md:mx-[55px] mx-[30px] w-[150px] md:w-[218px] h-[150px] md:h-[218px]"
                src="/images/mongodb.png"
                alt="mongodb"
                width={218}
                height={218}
                priority
              />
            </MarqueeContainer>
            <MarqueeContainer style={"-left-12"}>
              <Image
                className="md:mx-[55px] mx-[30px] w-[150px] md:w-[218px] h-[150px] md:h-[218px]"
                src="/images/javascript.png"
                alt="javascript"
                width={218}
                height={218}
                priority
              />
              <Image
                className="md:mx-[55px] mx-[30px] w-[150px] md:w-[218px] h-[150px] md:h-[218px]"
                src="/images/git.png"
                alt="git"
                width={218}
                height={218}
                priority
              />
              <Image
                className="md:mx-[55px] mx-[30px] w-[150px] md:w-[218px] h-[150px] md:h-[218px]"
                src="/images/nest.png"
                alt="nest"
                width={218}
                height={218}
                priority
              />
              <Image
                className="md:mx-[55px] mx-[30px] w-[150px] md:w-[218px] h-[150px] md:h-[218px]"
                src="/images/css.png"
                alt="css"
                width={218}
                height={218}
                priority
              />

              <Image
                className="md:mx-[55px] mx-[30px] w-[150px] md:w-[218px] h-[150px] md:h-[218px]"
                src="/images/vue.png"
                alt="vue"
                width={218}
                height={218}
                priority
              />
              <Image
                className="md:mx-[55px] mx-[30px] w-[150px] md:w-[218px] h-[150px] md:h-[218px]"
                src="/images/npm.png"
                alt="npm"
                width={218}
                height={218}
                priority
              />
            </MarqueeContainer>
          </div>
        </div>
        <div className="absolute bottom-16 pt-5 w-full bg-black md:bottom-28 text-center text-2xl md:text-[50px] font-extrabold md:tracking-[-0.75px] md:leading-[60px]">
          <div className="text-import-color ">
            <p>IMPORT와 함께 경험하고 성장할</p>
            <p>여러분들을 기다리고 있습니다.</p>
          </div>
          <Link
            prefetch={false}
            target="_blank"
            href="https://forms.gle/dgTANW9fcMtu9iT68"
            className="mt-7 md:mt-11 relative inline-block bg-white px-7 py-4 md:px-11 md:py-6 border-none rounded-[20px]"
          >
            <div className="md:block hidden">
              <div className="absolute md:left-[-25px] md:top-[-30px]">
                <Image
                  src={"/images/now_red.svg"}
                  alt={"now 아이콘(빨강색)"}
                  width={112}
                  height={87}
                  className="object-cover max-md:w-[67px] max-md:h-[52.2px]"
                />
              </div>
              <div className="absolute left-[-15px] top-[-15px] md:left-[-20px] md:top-[-25px]">
                <Image
                  src={"/images/now_green.svg"}
                  alt={"now 아이콘(초록색)"}
                  width={112}
                  height={87}
                  className="object-cover max-md:w-[67px] max-md:h-[52.2px]"
                />
              </div>
            </div>
            2023 하반기 지원하기
          </Link>
        </div>
      </div>
    </section>
  );
}
