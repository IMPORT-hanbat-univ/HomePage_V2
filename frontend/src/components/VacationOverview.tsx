import Image from "next/image";
import React from "react";
import ScrollAnimationContainer from "./ui/ScrollAnimationContainver";
import CarouselContainer from "./ui/CarouselCantainer";

export default function VacationOverview() {
  return (
    <ScrollAnimationContainer>
      <section className="md:mt-48  mt-24 w-full">
        <h2 className="text-center font-extrabold md:text-[50px] text-2xl md:leading-[60px] leading-7 tracking-[-0.75px] ">
          방학을 알차게 즐기고 싶을땐
        </h2>
        <div className="md:block hidden mt-20">
          <div className="flex items-center justify-around  gap-12">
            <div>
              <Image
                src={"/images/sideproject.svg"}
                alt="사이드 프로젝트"
                height={350}
                width={350}
                className="object-cover "
              />
              <div className="px-4 flex flex-col justify-between pt-3 pb-5 gap-1 rounded-[20px] bg-[#D3E3FA] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full  ">
                <span className="font-normal text-lg  tracking-[-0.27px] w-full">난이도별 미션을 수행하는</span>
                <h4 className="opacity-80 text-[40px]  font-extrabold leading-[50px]  tracking-[-0.6px]">
                  SIDE 프로젝트
                </h4>
                <span className="w-fit  rounded-[20px] mt-2 bg-[#232641] font-bold text-white px-2 text-base ">
                  모집예정
                </span>
              </div>
            </div>
            <div>
              <Image
                src={"/images/codingtest_study.svg"}
                alt="코딩테스트 스터디"
                height={350}
                width={350}
                className="object-cover "
              />
              <div className="px-4 flex flex-col justify-between pt-3 pb-5 gap-1 rounded-[20px] bg-[#F6F6E2] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full  ">
                <span className="font-normal text-lg  tracking-[-0.27px] w-full">차근차근 알아가는</span>
                <h4 className="opacity-80 text-[35px]  font-extrabold leading-[50px]  tracking-[-0.6px]">
                  코딩테스트 스터디
                </h4>
                <span className="w-fit  rounded-[20px] mt-2 bg-[#232641] font-bold text-white px-2 text-base ">
                  모집예정
                </span>
              </div>
            </div>

            <div>
              <Image
                src={"/images/github_til.svg"}
                alt="잔디심기 챌린지"
                height={350}
                width={350}
                className="object-cover "
              />
              <div className="px-4 flex flex-col justify-between pt-3 pb-5 gap-1 rounded-[20px] bg-[#EADEFA] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full  ">
                <span className="font-normal text-lg  tracking-[-0.27px] w-full">매일매일 GitHub 잔디를 채워보자!</span>
                <h4 className="opacity-80 text-[40px]  font-extrabold leading-[50px]  tracking-[-0.6px]">
                  잔디 심기 챌린지
                </h4>
                <span className="w-fit  rounded-[20px] mt-2 bg-[#232641] font-bold text-white px-2 text-base ">
                  모집예정
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden block mt-8">
          <CarouselContainer>
            <div className="w-90  md:ml-2 ">
              <Image
                src={"/images/sideproject.svg"}
                alt="사이드 프로젝트"
                height={200}
                priority
                width={200}
                className="object-cover mx-auto"
              />
              <div className="px-4 flex flex-col justify-between pt-3 pb-5 gap-1 rounded-[20px] bg-[#D3E3FA] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full  ">
                <span className="font-normal text-lg  tracking-[-0.27px] w-full">난이도별 미션을 수행하는</span>
                <h4 className="opacity-80 text-[40px]  font-extrabold leading-[50px]  tracking-[-0.6px]">
                  SIDE 프로젝트
                </h4>
                <span className="w-fit  rounded-[20px] mt-2 bg-[#232641] font-bold text-white px-2 text-base ">
                  모집예정
                </span>
              </div>
            </div>
            <div className="w-90  md:ml-2">
              <Image
                src={"/images/codingtest_study.svg"}
                alt="코딩테스트 스터디"
                height={200}
                width={200}
                priority
                className="object-cover mx-auto"
              />
              <div className="px-4 flex flex-col justify-between pt-3 pb-5 gap-1 rounded-[20px] bg-[#F6F6E2] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full  ">
                <span className="font-normal text-lg  tracking-[-0.27px] w-full">차근차근 알아가는</span>
                <h4 className="opacity-80 text-[33px]  font-extrabold leading-[50px]  tracking-[-0.6px]">
                  코딩테스트 스터디
                </h4>
                <span className="w-fit  rounded-[20px] mt-2 bg-[#232641] font-bold text-white px-2 text-base ">
                  모집예정
                </span>
              </div>
            </div>

            <div className="w-90 md:ml-2">
              <Image
                src={"/images/github_til.svg"}
                alt="잔디심기 챌린지"
                height={200}
                width={200}
                priority
                className="object-cover mx-auto"
              />
              <div className="px-4 flex flex-col justify-between pt-3 pb-5 gap-1 rounded-[20px] bg-[#EADEFA] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full  ">
                <span className="font-normal text-lg  tracking-[-0.27px] w-full">매일매일 GitHub 잔디를 채워보자!</span>
                <h4 className="opacity-80 text-[35px]  font-extrabold leading-[50px]  tracking-[-0.6px]">
                  잔디 심기 챌린지
                </h4>
                <span className="w-fit  rounded-[20px] mt-2 bg-[#232641] font-bold text-white px-2 text-base ">
                  모집예정
                </span>
              </div>
            </div>
          </CarouselContainer>
        </div>
      </section>
    </ScrollAnimationContainer>
  );
}
