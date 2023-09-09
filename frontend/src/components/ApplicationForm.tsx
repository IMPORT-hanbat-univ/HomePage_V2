"use client";
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import ClubInput from "./ui/ClubInput";
import ClubTagInput from "./ui/ClubTagInput";
import { notificationAtom } from "@/recoil/notification";
import { useSetRecoilState } from "recoil";
import { rankUp } from "@/api/user";
import getClientCookie from "@/util/getClientCookie";
import useMe from "@/hooks/useMe";
import { DecodeUser } from "@/util/type";
import RequestLogin from "./ui/RequestLogin";
import { MoonLoader } from "react-spinners";

type Props = {
  setSuccess: Dispatch<SetStateAction<boolean>>;
};

export default function ApplicationForm({ setSuccess }: Props) {
  const { decodeUser, isLoading }: { decodeUser: DecodeUser; isLoading: boolean } = useMe();
  const [applicationData, setApplicationData] = useState({
    grade: "1학년",
    department: "",
    framework: "",
    language: "",
    github_url: "",
    email: "",
    blog: "",
  });
  const [frameList, setFrameList] = useState<string[]>([]);
  const [languageList, setLanguageList] = useState<string[]>([]);
  const [frameText, setFrameText] = useState<string>("");
  const [languageText, setLanguageText] = useState<string>("");

  const setNotification = useSetRecoilState(notificationAtom);

  useEffect(() => {
    setApplicationData((prev) => {
      return { ...prev, framework: frameList.join(","), language: languageList.join(",") };
    });
  }, [frameList, languageList]);

  const changeInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setApplicationData({ ...applicationData, [e.target.name]: e.target.value });
  };

  const submitApplication = async (e: FormEvent) => {
    e.preventDefault();
    if (applicationData.department.trim() === "") {
      return;
    }

    try {
      const data = { ...applicationData, userId: decodeUser.userId, nick_name: decodeUser.nick_name };
      const accessToken = getClientCookie("accessToken");
      const result = await rankUp(data, accessToken);
      if (result) {
        setSuccess(true);
      } else {
        setNotification({
          type: "warning",
          message: "등업 신청과정에서 에러가 발생했습니다.",
          notificationType: "Warning",
        });
      }
    } catch (err) {
      console.log(err);
      setNotification({
        type: "warning",
        message: "등업 신청과정에서 에러가 발생했습니다.",
        notificationType: "Warning",
      });
    }
  };
  if (isLoading) {
    return (
      <section className="w-screen h-screen flex items-center justify-center">
        <MoonLoader color="#14D476" size={50} />
      </section>
    );
  } else {
    return !decodeUser ? (
      <RequestLogin />
    ) : (
      <>
        <section className="release w-full max-w-4xl px-4 mx-auto my-6 md:my-12">
          <h2 className="px-4 py-6 md:py-10  text-2xl md:text-4xl font-bold">등업 신청서</h2>
          <div className="flex flex-col gap-3 md:gap-6">
            <div className="w-full">
              <ClubInput
                label={"email"}
                type={"email"}
                value={applicationData.email}
                name={"email"}
                onChange={changeInput}
              />
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <div>
                <ClubInput isSelect name={"grade"} value={applicationData.grade} onChange={changeInput} label="학년">
                  <option value="1학년">1학년</option>
                  <option value="2학년">2학년</option>
                  <option value="3학년">3학년</option>
                  <option value="4학년 이상">4학년 이상</option>
                  <option value="휴학생">휴학생</option>
                  <option value="졸업생">졸업생</option>
                </ClubInput>
              </div>
              <div>
                <ClubInput label="학과" name="department" value={applicationData.department} onChange={changeInput} />
              </div>
            </div>

            <div className="w-full">
              <ClubTagInput
                label="언어"
                name="language"
                tagList={languageList}
                value={languageText}
                setValue={setLanguageText}
                setTagList={setLanguageList}
              />
            </div>
            <div className="w-full">
              <ClubTagInput
                label="프레임워크"
                name="framework"
                tagList={frameList}
                value={frameText}
                setValue={setFrameText}
                setTagList={setFrameList}
              />
            </div>
            <div className=" w-full">
              <ClubInput name="blog" label="블로그" value={applicationData.blog} onChange={changeInput} />
            </div>
            <div className=" w-full">
              <ClubInput name="github_url" label="깃허브" value={applicationData.github_url} onChange={changeInput} />
            </div>
          </div>
          <div className="w-full flex justify-end mt-6 md:mt-10 ">
            <button
              onClick={submitApplication}
              className={` py-2 bg-import-color rounded-[10px]  text-white px-8 text-[12px] border-none `}
            >
              저장
            </button>
          </div>
        </section>
      </>
    );
  }
}
