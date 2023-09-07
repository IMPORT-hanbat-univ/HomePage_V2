"use client";
import { userProfileWithDrawal } from "@/api/user";
import useMe from "@/hooks/useMe";
import useProfile from "@/hooks/useProfile";
import { notificationAtom } from "@/recoil/notification";
import getClientCookie from "@/util/getClientCookie";
import { DetailUser } from "@/util/type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useSetRecoilState } from "recoil";
import ClubInput from "./ui/ClubInput";
import ClubTagInput from "./ui/ClubTagInput";

const rank_array = [
  { title: "일반", value: "1" },
  { value: "2", title: "동아리 부원" },
  { value: "3", title: "개발팀장" },
  { value: "4", title: "임원진" },
  { value: "5", title: "관리자" },
];

export default function Profile() {
  const params = useParams();
  const userId = params?.id;
  const router = useRouter();
  const [isModify, setIsModify] = useState(false);
  const [modifyData, setModifyData] = useState<DetailUser | null>(null);
  const setNotification = useSetRecoilState(notificationAtom);
  const [isPending, startTransition] = useTransition();
  const [frameText, setFrameText] = useState("");
  const [frameList, setFrameList] = useState<string[]>([]);

  const [languageText, setLanguageText] = useState("");
  const [languageList, setLanguageList] = useState<string[]>([]);
  const { decodeUser, isLoading: isUserLoading } = useMe();

  const id: string = (params?.id as string | undefined) || "";
  if (!isUserLoading && (!decodeUser || decodeUser.userId !== parseInt(id))) {
    router.replace("/");
  }
  const {
    data,
    isLoading,
    updateUserProfile,
  }: {
    data: DetailUser;
    isLoading: boolean;
    updateUserProfile: (id: number, newProfile: DetailUser, accessToken: string) => Promise<any> | undefined;
  } = useProfile(parseInt(userId as string));

  useEffect(() => {
    if (data) {
      setModifyData(data);
    }
  }, [data]);

  useEffect(() => {
    setModifyData((prev) => {
      if (prev) {
        return { ...prev, framework: frameList.join(","), language: languageList.join(",") };
      } else {
        return null;
      }
    });
  }, [frameList, languageList]);

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(modifyData)) {
      setIsModify(true);
    } else {
      setIsModify(false);
    }
  }, [data, modifyData]);

  useEffect(() => {
    if (data?.language) {
      setLanguageList(data.language.split(","));
    }
    if (data?.framework) {
      setFrameList(data.framework.split(","));
    }
  }, [data]);

  if (!isLoading && !data) {
    return null;
  }

  const rank_title = rank_array.find((item) => parseInt(item.value) === data?.rank)?.title;

  const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (modifyData) {
      setModifyData({ ...modifyData, [e.target.name]: e.target.value });
    }
  };

  const submitModify = (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken: string = getClientCookie("accessToken") || "";

    if (!accessToken || parseInt(userId as string) !== decodeUser.userId) {
      setNotification({ notificationType: "Warning", message: "수정 권한이 없습니다.", type: "warning" });
      return;
    }
    if (!modifyData) {
      setNotification({ notificationType: "Warning", message: "올바른 수정 데이터가 필요합니다.", type: "warning" });
      return;
    }
    updateUserProfile(parseInt(userId as string), modifyData, accessToken);
    setIsModify(false);

    window.location.reload();
  };

  const handleWithDrawal = () => {
    if (!userId || !decodeUser?.id || parseInt(userId as string) !== decodeUser.userId) {
      setNotification({ notificationType: "Warning", message: "계정 탈퇴 권한이 없습니다. ", type: "warning" });
      router.replace("/");
    }
    startTransition(async () => {
      const accessToken = getClientCookie("accessToken") || "";
      const result = await userProfileWithDrawal(accessToken);
      if (result) {
        router.replace("/");
      } else {
        setNotification({
          notificationType: "Warning",
          message: "탈퇴 과정에서 에러가 발생했습니다. ",
          type: "danger",
        });
      }
    });
  };
  return (
    <article className=" flex flex-col h-full justify-around px-3 md:px-4 ">
      <h2 className="md:text-[25px] tracking-[-0.375px] md:mb-14 mb-6 text-[20px]">프로필</h2>
      <div className="text-xl w-full md:pl-32 ">
        <div className="flex w-full items-center md:gap-32 gap-4 mb-6 md:mb-14">
          <div className="shrink-0">
            {data?.profileImg ? (
              <>
                <div className="md:block hidden">
                  <Image
                    alt="profile image"
                    className="object-cover rounded-full"
                    width={130}
                    height={130}
                    src={`http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}${data.profileImg}`}
                  />
                </div>
                <div className="md:hidden block">
                  <Image
                    alt="profile image"
                    className="object-cover rounded-full"
                    width={100}
                    height={100}
                    src={`http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}${data.profileImg}`}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="md:block hidden relative w-[130px]   group  h-[130px] rounded-full">
                  <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M127 65C127 99.2417 99.2417 127 65 127C30.7583 127 3 99.2417 3 65C3 30.7583 30.7583 3 65 3C99.2417 3 127 30.7583 127 65Z"
                      fill="white"
                      stroke="#4CD773"
                      strokeWidth="6"
                    />
                    <path
                      d="M86.75 43.375C86.75 55.1801 77.1801 64.75 65.375 64.75C53.5699 64.75 44 55.1801 44 43.375C44 31.5699 53.5699 22 65.375 22C77.1801 22 86.75 31.5699 86.75 43.375Z"
                      stroke="#4CD773"
                      strokeWidth="6"
                    />
                    <path
                      d="M25 112V112C37.8135 73.5595 92.1865 73.5595 105 112V112"
                      stroke="#4CD773"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="group-hover:flex hidden absolute top-0 left-0 z-10 h-[130px] w-[130px]  items-center justify-center text-[15px] text-white rounded-full opacity-60 bg-[#041f00]">
                    변경
                  </div>
                </div>
                <div className="md:hidden block relative w-[100px]   group  h-[100px] rounded-full">
                  <svg width="100" height="100" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M127 65C127 99.2417 99.2417 127 65 127C30.7583 127 3 99.2417 3 65C3 30.7583 30.7583 3 65 3C99.2417 3 127 30.7583 127 65Z"
                      fill="white"
                      stroke="#4CD773"
                      strokeWidth="6"
                    />
                    <path
                      d="M86.75 43.375C86.75 55.1801 77.1801 64.75 65.375 64.75C53.5699 64.75 44 55.1801 44 43.375C44 31.5699 53.5699 22 65.375 22C77.1801 22 86.75 31.5699 86.75 43.375Z"
                      stroke="#4CD773"
                      strokeWidth="6"
                    />
                    <path
                      d="M25 112V112C37.8135 73.5595 92.1865 73.5595 105 112V112"
                      stroke="#4CD773"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="group-hover:flex hidden absolute top-0 left-0 z-10 h-[100px] w-[100px]  items-center justify-center text-[12px] text-white rounded-full opacity-60 bg-[#041f00]">
                    변경
                  </div>
                </div>
              </>
            )}

            <div className="mt-2 text-import-color md:text-[15px] text-[12px] w-full text-center">
              등급: {rank_title}
            </div>
          </div>

          <div className=" w-full h-full">
            <div className="w-full md:mb-6">
              <ClubInput
                label={"닉네임"}
                name={"nick_name"}
                value={modifyData?.nick_name || ""}
                onChange={changeInput}
              />
            </div>
            <div className="w-full">
              <ClubInput
                label={"email"}
                type={"email"}
                value={modifyData?.email || ""}
                name={"email"}
                onChange={changeInput}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#C1C1C1] md:mb-7"></div>

        {data?.rank > 0 && (
          <div className="flex flex-col gap-3 md:gap-6">
            <div className="flex items-center gap-4 md:gap-6">
              <div>
                <ClubInput
                  isSelect
                  name={"grade"}
                  value={modifyData?.grade || "1학년"}
                  onChange={changeInput}
                  label="학년"
                >
                  <option value="1학년">1학년</option>
                  <option value="2학년">2학년</option>
                  <option value="3학년">3학년</option>
                  <option value="4학년 이상">4학년 이상</option>
                  <option value="휴학생">휴학생</option>
                  <option value="졸업생">졸업생</option>
                </ClubInput>
              </div>
              <div>
                <ClubInput label="학과" name="department" value={modifyData?.department || ""} onChange={changeInput} />
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
              <ClubInput name="blog" label="블로그" value={modifyData?.blog || ""} onChange={changeInput} />
            </div>
            <div className=" w-full">
              <ClubInput name="github_url" label="깃허브" value={modifyData?.github_url || ""} onChange={changeInput} />
            </div>
          </div>
        )}
        <div className="w-full flex justify-end mt-6 md:mt-10 ">
          <button
            onClick={submitModify}
            disabled={!isModify}
            className={` py-1 ${
              isModify ? "bg-import-color" : "bg-[#A5E3B6]"
            } rounded-[10px]  text-white px-8 text-[12px] border-none `}
          >
            저장
          </button>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#C1C1C1] my-6 md:my-10"></div>
      <h2 className="md:text-[25px] tracking-[-0.375px] md:mb-6 mb-6 text-[20px]">계정 탈퇴</h2>
      <button
        disabled={isPending}
        onClick={handleWithDrawal}
        className={`mx-6 rounded-[10px] hover:bg-[#4CD773] hover:text-white  outline-none w-fit text-[12px] px-6 py-[10px]   border border-[#4CD773]`}
      >
        탈퇴하기
      </button>
    </article>
  );
}
