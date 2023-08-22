"use client";
import useMe from "@/hooks/useMe";
import useProfile from "@/hooks/useProfile";
import { notificationAtom } from "@/recoil/notification";
import getClientCookie from "@/util/getClientCookie";
import { DetailUser } from "@/util/type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

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

  const [frameText, setFrameText] = useState("");
  const [frameList, setFrameList] = useState<string[]>([]);
  const [languageText, setLanguageText] = useState("");
  const [languageList, setLanguageList] = useState<string[]>([]);
  const { decodeUser } = useMe();
  // if (!userId || parseInt(userId as string) !== decodeUser.userId) {
  //   alert("권한이 없습니다.");
  //   router.replace("/");
  // }
  const { data, isLoading, error, updateUserProfile } = useProfile(parseInt(userId as string));
  console.log(data);

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
      setLanguageList(language.split(","));
    }
    if (data?.framework) {
      setFrameList(framework.split(","));
    }
  }, [data]);

  if (!data) {
    return null;
  }
  const { nick_name, createdAt, email, rank, blog, department, framework, github_url, grade, language, profileImg } =
    data;

  const rank_title = rank_array.find((item) => item.value === rank.toString())?.title;

  const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (modifyData) {
      setModifyData({ ...modifyData, [e.target.name]: e.target.value });
    }
  };

  const pressTagInput = (e: React.KeyboardEvent<HTMLInputElement>, type: string) => {
    if (e.key === "Enter") {
      if (type === "framework") {
        if (frameText.trim() === "") {
          return;
        } else if (frameList.find((prevFrame) => prevFrame === frameText.trim())) {
          return;
        } else {
          setFrameList((prev) => [...prev, frameText]);
          setFrameText("");
        }
      } else {
        if (languageText.trim() === "") {
          return;
        } else if (languageList.find((prevLanguage) => prevLanguage === languageText.trim())) {
          return;
        } else {
          setLanguageList((prev) => [...prev, languageText]);
          setLanguageText("");
        }
      }
    }
  };

  const removeTag = (tag: string, type: string) => {
    if (type === "framework") {
      if (frameList.length > 1) {
        const filteredTag = frameList.filter((item) => item !== tag);

        setFrameList(filteredTag);
      } else {
        setFrameList([]);
      }
    } else {
      if (languageList.length > 1) {
        const filteredTag = languageList.filter((item) => item !== tag);

        setLanguageList(filteredTag);
      } else {
        setLanguageList([]);
      }
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
  };
  return (
    <article className=" flex flex-col h-full justify-around px-3 md:px-4 ">
      <h2 className="md:text-[25px] tracking-[-0.375px] md:mb-14 mb-6 text-[20px]">프로필</h2>
      <div className="text-xl w-full md:pl-32 ">
        <div className="flex w-full items-center md:gap-32 gap-4 mb-6 md:mb-14">
          <div className="shrink-0">
            {profileImg ? (
              <>
                <div className="md:block hidden">
                  <Image
                    alt="profile image"
                    className="object-cover rounded-full"
                    width={130}
                    height={130}
                    src={`http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}${profileImg}`}
                  />
                </div>
                <div className="md:hidden block">
                  <Image
                    alt="profile image"
                    className="object-cover rounded-full"
                    width={100}
                    height={100}
                    src={`http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}${profileImg}`}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="md:block hidden">
                  <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M127 65C127 99.2417 99.2417 127 65 127C30.7583 127 3 99.2417 3 65C3 30.7583 30.7583 3 65 3C99.2417 3 127 30.7583 127 65Z"
                      fill="white"
                      stroke="#4CD773"
                      stroke-width="6"
                    />
                  </svg>
                </div>
                <div className="md:hidden block">
                  <svg width="100" height="100" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M127 65C127 99.2417 99.2417 127 65 127C30.7583 127 3 99.2417 3 65C3 30.7583 30.7583 3 65 3C99.2417 3 127 30.7583 127 65Z"
                      fill="white"
                      stroke="#4CD773"
                      strokeWidth="6"
                    />
                  </svg>
                </div>
              </>
            )}
            <div className="mt-2 text-import-color md:text-[15px] text-[12px] w-full text-center">
              등급: {rank_title}
            </div>
          </div>

          <div className=" w-full h-full">
            <div className=" w-full md:mb-6">
              <label htmlFor="nick_name" className="md:text-[13px] text-[11px] tracking-[-0.195px] text-[#565656]">
                닉네임
              </label>

              <input
                name="nick_name"
                id="nick_name"
                className="border md:text-[15px] text-[13px] rounded-[10px] p-1 leading-6 md:leading-7 w-full block grow shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                value={modifyData?.nick_name ?? ""}
                onChange={changeInput}
              />
            </div>
            <div className=" w-full">
              <label htmlFor="nick_name" className="md:text-[13px] text-[11px] tracking-[-0.195px] text-[#565656]">
                email
              </label>

              <input
                name="email"
                id="email"
                type="email"
                className="border md:text-[15px] text-[13px] rounded-[10px] p-1 leading-6 md:leading-7 w-full block grow shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                value={modifyData?.email ?? ""}
                onChange={changeInput}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#C1C1C1] md:mb-7"></div>

        {rank > 1 && (
          <div className="flex flex-col gap-3 md:gap-6">
            <div className="flex items-center gap-4 md:gap-6">
              <div>
                <label htmlFor="grade" className="md:text-[13px] text-[11px] tracking-[-0.195px] text-[#565656]">
                  학년:
                </label>

                <select
                  className="border w-20 md:w-24  md:text-[15px] text-[13px] rounded-[10px] p-2 leading-6 md:leading-7 block grow shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                  value={modifyData?.grade ?? "1"}
                  onChange={changeInput}
                  id="grade"
                  name="grade"
                >
                  <option value="1">1학년</option>
                  <option value="2">2학년</option>
                  <option value="3">3학년</option>
                  <option value="4">4학년</option>
                  <option value="5">5학년</option>
                  <option value="졸업생">졸업생</option>
                </select>
              </div>
              <div>
                <label htmlFor="department" className="md:text-[13px] text-[11px] tracking-[-0.195px] text-[#565656]">
                  학과
                </label>

                <input
                  name="department"
                  id="department"
                  className="border md:text-[15px] text-[13px] rounded-[10px] p-1 leading-6 md:leading-7 w-52 md:w-60 block grow shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                  value={modifyData?.department}
                  onChange={changeInput}
                />
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="language" className="md:text-[13px] text-[12px] tracking-[-0.195px] text-[#565656]">
                언어:
              </label>

              <div className="w-full">
                <div className="w-full overflow-x-auto overflow-y-hidden items-center border border-[#C1C1C1] rounded-[10px] p-1  flex grow shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                  {languageList.map((language) => (
                    <button
                      key={language}
                      onClick={() => removeTag(language, "language")}
                      className="bg-[#E1E1E1] rounded-[10px]    w-fit px-2 py-1 whitespace-nowrap text-xs border-none mt-1 mr-2 mb-1 gap-2 flex item-center"
                    >
                      {language}
                      <svg
                        className=" h-4"
                        width="6"
                        height="7"
                        viewBox="0 0 6 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1 1.31274L5 6.31241" stroke="#515151" stroke-linecap="round" />
                        <path d="M1 6.3125L4.99955 1.3125" stroke="#515151" stroke-linecap="round" />
                      </svg>
                    </button>
                  ))}
                  <input
                    className="w-full md:text-[15px] text-[12px] border-none bg-none outline-none"
                    value={languageText}
                    onChange={(e) => setLanguageText(e.target.value)}
                    onKeyDown={(e) => pressTagInput(e, "language")}
                    placeholder="언어를 입력해주세요"
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="framework" className="md:text-[13px] text-[12px] tracking-[-0.195px] text-[#565656]">
                프레임워크:
              </label>

              <div className="w-full">
                <div className="w-full overflow-x-auto overflow-y-hidden items-center border border-[#C1C1C1] rounded-[10px] p-1  flex grow shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                  {frameList.map((frame) => (
                    <button
                      key={frame}
                      onClick={() => removeTag(frame, "framework")}
                      className="bg-[#E1E1E1] rounded-[10px]    w-fit px-2 py-1 whitespace-nowrap text-xs border-none mt-1 mr-2 mb-1 gap-2 flex item-center"
                    >
                      {frame}
                      <svg
                        className=" h-4"
                        width="6"
                        height="7"
                        viewBox="0 0 6 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1 1.31274L5 6.31241" stroke="#515151" stroke-linecap="round" />
                        <path d="M1 6.3125L4.99955 1.3125" stroke="#515151" stroke-linecap="round" />
                      </svg>
                    </button>
                  ))}
                  <input
                    className="w-full md:text-[15px] text-[12px] border-none bg-none outline-none"
                    value={frameText}
                    onChange={(e) => setFrameText(e.target.value)}
                    onKeyDown={(e) => pressTagInput(e, "framework")}
                    placeholder="프레임워크를 입력해주세요"
                  />
                </div>
              </div>
            </div>
            <div className=" w-full">
              <label htmlFor="blog" className="md:text-[13px] text-[12px] tracking-[-0.195px] text-[#565656]">
                블로그:
              </label>

              <input
                name="blog"
                id="blog"
                className="border md:text-[15px] text-[13px] rounded-[10px] p-1 leading-6 md:leading-7 w-full block grow shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                value={modifyData?.blog}
                onChange={changeInput}
              />
            </div>
            <div className=" w-full">
              <label htmlFor="github_url" className="md:text-[13px] text-[12px] tracking-[-0.195px] text-[#565656]">
                깃허브:
              </label>

              <input
                name="github_url"
                id="github_url"
                className="border md:text-[15px] text-[13px] rounded-[10px] p-1 leading-6 md:leading-7 w-full block grow shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                value={modifyData?.github_url}
                onChange={changeInput}
              />
            </div>
          </div>
        )}
        <div className="w-full flex justify-end mt-6 md:mt-10 ">
          <button
            onClick={submitModify}
            className={`px-2 py-1 ${
              isModify ? "bg-import-color" : "bg-[#A5E3B6]"
            } rounded-[10px]  text-white px-8 text-[12px] border-none shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]`}
          >
            저장
          </button>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#C1C1C1] my-6 md:my-10"></div>
      <h2 className="md:text-[25px] tracking-[-0.375px] md:mb-6 mb-6 text-[20px]">계정 탈퇴</h2>
      <button
        className={`mx-6 rounded-[10px] hover:bg-[#4CD773] hover:text-white  outline-none w-fit text-[12px] px-6 py-[10px]   border border-[#4CD773]`}
      >
        탈퇴하기
      </button>
    </article>
  );
}
