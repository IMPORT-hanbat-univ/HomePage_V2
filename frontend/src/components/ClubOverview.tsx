import React from "react";
import ScrollAnimationContainer from "./ui/ScrollAnimationContainver";
import OverviewContainer from "./ui/OverviewContainer";
import Image from "next/image";
import ImportMobile from "../../public/images/ImportMobile.svg";
import AwsSvg from "../../public/images/aws.svg";
import ImportWeb from "../../public/images/import_web.svg";
export default function ClubOverview() {
  return (
    <section className="flex flex-col items-center md:gap-52 gap-44 mt-16 md:mt-24">
      <ScrollAnimationContainer>
        <div className="text-center ">
          <h2 className="text-3xl break-words md:text-[50px] font-extrabold leading-[60px] tracking-[-0.75px] ">
            오직 IMPORT에서 경험할 수 있는 활동
          </h2>
          <p className="md:mt-6 mt-3 text-[18px] md:text-[30px] font-medium leading-7 md:leading-[60px] tracking-[-0.45px]">
            열정 가득한 여러분들을 기다리고 있습니다.
          </p>
        </div>
      </ScrollAnimationContainer>

      <ScrollAnimationContainer>
        <OverviewContainer
          imageOrder="left"
          title={"IMPORT Web 프로젝트"}
          badgeText={"유지보수 모집중"}
          style="px-5 break-words"
          tagText={"#Next.13 #Node.js #Docker #Jenkins #mariaDB"}
          content={`해당 동아리 홈페이지 개발 프로젝트
          <br /> 단순 개발이 끝이 아닌
          <br />
          유지보수의 경험까지!`}
        >
          <Image
            src={ImportWeb}
            alt="1"
            height={385}
            width={600}
            className="max-md:w-[385px]  max-md:h-[230px] md:mt-32 mb-4 mr-3 md:mr-24 object-cover"
          />
        </OverviewContainer>
      </ScrollAnimationContainer>
      <ScrollAnimationContainer>
        <OverviewContainer
          imageOrder="right"
          title={"IMPORT Mobile 프로젝트"}
          badgeText={"진행중"}
          tagText={"#Flutter #Node.js #Docker"}
          content={`Flutter 현직자와 함께하는
          <br /> 동아리 어플 개발 프로젝트
         `}
        >
          <Image
            src={ImportMobile}
            alt="1"
            height={570}
            width={500}
            className="max-md:w-[200px] max-md:h-[230px] rotate-[-30deg] mt-8 md:ml-8 object-cover"
          />
        </OverviewContainer>
      </ScrollAnimationContainer>
      <ScrollAnimationContainer>
        <OverviewContainer
          imageOrder="left"
          title={"Cloud 현직자와 함께하는<br/> AWS 스터디"}
          badgeText={"모집중"}
          tagText={"#Cloud #AWS"}
          content={`AWS자격증을 취득을 목표로
          <br /> 시작해보는 첫걸음
         `}
        >
          <Image
            src={AwsSvg}
            alt="import mobile"
            height={450}
            width={450}
            className="max-md:w-[200px] max-md:h-[230px] mb-3 md:mr-24 object-cover"
          />
        </OverviewContainer>
      </ScrollAnimationContainer>
    </section>
  );
}
