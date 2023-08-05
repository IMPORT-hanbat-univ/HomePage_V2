"use client";
import { DetailUser } from "@/util/type";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import useUsers from "@/hooks/useUsers";
import getClientCookie from "@/util/getClientCookie";
type Props = {
  data: DetailUser;
};

const rank_array = [
  { title: "전체", value: "all" },
  { title: "일반회원", value: "1" },
  { value: "2", title: "동아리원" },
  { value: "3", title: "개발팀장" },
  { value: "4", title: "임원진" },
  { value: "5", title: "관리자" },
];

export default function AdminModal({ data }: Props) {
  const { updateUser } = useUsers();
  const [modifyData, setModifyData] = useState<DetailUser>(data);
  const [isModify, setIsModify] = useState(false);
  console.log("modal", data);
  const { nick_name, createdAt, email, rank, blog, department, framework, github_url, grade, language, profileImg } =
    data;
  const rank_title = rank_array.find((item) => item.value === rank.toString())?.title;
  const changeInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setModifyData({ ...modifyData, [e.target.name]: e.target.value });
  };
  const submitModify = (e: FormEvent) => {
    e.preventDefault();
    const accessToken: string = getClientCookie("accessToken") || "";
    const refreshToken: string = getClientCookie("refreshToken") || "";
    updateUser(modifyData, accessToken, refreshToken);
    setIsModify(false);
  };
  return (
    <article className="p-12 flex flex-col items-center h-full justify-around">
      <div className="text-xl">
        <div className="flex items-center gap-3 mb-6">
          <Image
            alt="profile image"
            className="object-cover rounded-full w-20 h-20"
            width={200}
            height={200}
            src={profileImg ? `http://localhost:4000${profileImg}` : "/images/import_image.jpg"}
          />
          <div className="flex flex-col gap-1 text-lg">
            <div className="flex items-center w-full">
              <label htmlFor="nick_name" className="mr-2">
                닉네임:
              </label>
              {isModify ? (
                <input
                  name="nick_name"
                  id="nick_name"
                  className="border px-1 grow border-black rounded"
                  value={modifyData.nick_name}
                  onChange={changeInput}
                />
              ) : (
                <span id="nick_name">{nick_name}</span>
              )}
            </div>
            <div className="flex items-center w-full">
              <label htmlFor="email" className="mr-2">
                Email:
              </label>
              {isModify ? (
                <input
                  name="email"
                  id="email"
                  className="border  px-1 grow  border-black rounded"
                  value={modifyData.email}
                  onChange={changeInput}
                />
              ) : (
                <span id="email">{email}</span>
              )}
            </div>
            <div className="flex items-center w-full">
              <label htmlFor="email" className="mr-2">
                Rank:
              </label>
              {isModify ? (
                <select
                  className="border grow border-black"
                  value={modifyData.rank}
                  onChange={changeInput}
                  id="rank"
                  name="rank"
                >
                  {rank_array.map(({ value, title }) => (
                    <option key={value} value={value}>
                      {title}
                    </option>
                  ))}
                </select>
              ) : (
                <span id="rank">{rank_title ? rank_title : "랭크를 찾을 수 없음"}</span>
              )}
            </div>
          </div>
        </div>

        {rank > 1 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center w-full">
              <label htmlFor="department" className="mr-2">
                학과:
              </label>
              {isModify ? (
                <input
                  name="department"
                  id="department"
                  className="border px-1 grow border-black rounded"
                  value={modifyData.department}
                  onChange={changeInput}
                />
              ) : (
                <span id="department">{department}</span>
              )}
            </div>
            <div className="flex items-center w-full">
              <label htmlFor="grade" className="mr-2">
                학년:
              </label>
              {isModify ? (
                <input
                  name="grade"
                  id="grade"
                  className="border grow px-1 border-black rounded"
                  value={modifyData.grade}
                  onChange={changeInput}
                />
              ) : (
                <span id="grade">{grade}</span>
              )}
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
                  value={modifyData.language}
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
                  value={modifyData.framework}
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
                  value={modifyData.blog}
                  onChange={changeInput}
                />
              ) : (
                <span id="blog">{blog}</span>
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
                  value={modifyData.github_url}
                  onChange={changeInput}
                />
              ) : (
                <span id="github_url">{github_url}</span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex justify-end ">
        {isModify ? (
          <button onClick={submitModify} className="px-3 py-2 bg-import-color rounded border-none">
            저장
          </button>
        ) : (
          <button onClick={() => setIsModify(true)} className="px-3 py-2 bg-import-color rounded border-none">
            수정
          </button>
        )}
      </div>
    </article>
  );
}
