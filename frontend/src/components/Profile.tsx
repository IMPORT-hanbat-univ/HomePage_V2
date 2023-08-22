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
    <article className=" flex flex-col h-full justify-around px-4">
      <h2 className="md:text-[25px] tracking-[-0.375px] md:mb-14 ">프로필</h2>
      <div className="text-xl w-full md:pl-32">
        <div className="flex w-full items-center md:gap-32 md:mb-14">
          <div className="shrink-0">
            {profileImg ? (
              <Image
                alt="profile image"
                className="object-cover rounded-full"
                width={130}
                height={130}
                src={`http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}${profileImg}`}
              />
            ) : (
              <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M127 65C127 99.2417 99.2417 127 65 127C30.7583 127 3 99.2417 3 65C3 30.7583 30.7583 3 65 3C99.2417 3 127 30.7583 127 65Z"
                  fill="white"
                  stroke="#4CD773"
                  stroke-width="6"
                />
              </svg>
            )}
            <div className="mt-2 text-import-color md:text-[15px] w-full text-center">등급: {rank_title}</div>
          </div>

          <div className=" w-full h-full">
            <div className=" w-full md:mb-6">
              <label htmlFor="nick_name" className="md:text-[13px] tracking-[-0.195px] text-[#565656]">
                닉네임
              </label>

              <input
                name="nick_name"
                id="nick_name"
                className="border md:text-[15px] rounded-[10px] px-1 py-1 w-full block grow shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                value={modifyData?.nick_name ?? ""}
                onChange={changeInput}
              />
            </div>
            <div className=" w-full">
              <label htmlFor="nick_name" className="md:text-[13px] tracking-[-0.195px] text-[#565656]">
                email
              </label>

              <input
                name="email"
                id="email"
                type="email"
                className="border md:text-[15px] rounded-[10px] px-1 py-1 w-full block grow shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                value={modifyData?.email ?? ""}
                onChange={changeInput}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#C1C1C1] md:mb-7"></div>

        {rank > 1 && (
          <div className="flex flex-col md:gap-6">
            <div className="flex items-center md:gap-6">
              <div>
                <label htmlFor="grade" className="md:text-[13px] tracking-[-0.195px] text-[#565656]">
                  학년:
                </label>

                <select
                  className="block border md:w-24 md:text-[15px] rounded-[10px] px-1 py-2  grow shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                  value={modifyData?.grade ?? "1"}
                >
                  <option>1학년</option>
                </select>
              </div>
              <div>
                <label htmlFor="department" className="md:text-[13px] tracking-[-0.195px] text-[#565656]">
                  학과
                </label>

                <input
                  name="department"
                  id="department"
                  className="border md:w-60 md:text-[15px] rounded-[10px] px-1 py-1  block grow shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                  value={modifyData?.department}
                  onChange={changeInput}
                />
              </div>
            </div>

            <div className="flex items-center w-full">
              <label htmlFor="language" className="mr-2">
                언어:
              </label>
              {isModify ? (
                <input
                  name="language"
                  id="language"
                  className="border px-1 grow border-black rounded"
                  value={modifyData?.language ?? ""}
                  onChange={changeInput}
                />
              ) : (
                <span id="language">{language}</span>
              )}
            </div>
            <div className="flex items-center w-full">
              <label htmlFor="framework" className="mr-2">
                프레임워크:
              </label>
              {isModify ? (
                <input
                  name="framework"
                  id="framework"
                  className="border px-1 grow border-black rounded"
                  value={modifyData?.framework}
                  onChange={changeInput}
                />
              ) : (
                <span id="framework">{framework}</span>
              )}
            </div>
            <div className="flex items-center w-full">
              <label htmlFor="blog" className="mr-2">
                블로그:
              </label>
              {isModify ? (
                <input
                  name="blog"
                  id="blog"
                  className="border px-1 grow border-black rounded"
                  value={modifyData?.blog}
                  onChange={changeInput}
                />
              ) : (
                <a href={blog} id="blog">
                  {blog}
                </a>
              )}
            </div>
            <div className="flex items-center w-full">
              <label htmlFor="github_url" className="mr-2">
                깃허브:
              </label>
              {isModify ? (
                <input
                  name="github_url"
                  id="github_url"
                  className="border px-1 grow border-black rounded"
                  value={modifyData?.github_url}
                  onChange={changeInput}
                />
              ) : (
                <a id="github_url" href={github_url}>
                  {github_url}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex justify-end ">
        <button onClick={submitModify} className="px-3 py-2 bg-import-color rounded border-none">
          저장
        </button>
      </div>
    </article>
  );
}
