"use client";
import React, { ChangeEvent, useState } from "react";
import useAdmins from "@/hooks/useAdmins";
import { DetailUser } from "@/util/type";
import dayjs from "dayjs";
export default function UserTable() {
  const { data, isLoading, error } = useAdmins("user");
  const [requestLevel, setRequestLevel] = useState("1");
  console.log("data", data);
  return (
    <section>
      <div className="flex items-center gap-6 p-4">
        <select
          className="p-2"
          value={requestLevel}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setRequestLevel(e.target.value)}
        >
          <option value={1}>일반회원</option>
          <option value={2}>동아리원</option>
          <option value={3}>개발팀장</option>
          <option value={4}>임원진</option>
          <option value={5}>관리자</option>
        </select>
        <button className="px-3 py-2 bg-blue-500 border-none outline-none rounded text-white">선택 레벨 변경</button>
      </div>
      <table className="w-full bg-white rounded">
        <thead>
          <tr>
            <th className="w-[5%] py-4">
              <input type="checkbox" />
            </th>
            <th className="w-[20%]">닉네임</th>

            <th className="w-[20%]">가입일</th>
            <th className="w-[30%]">이메일</th>
            <th className="w-[15%]">레벨</th>
            <th className="w-[10%]">탈퇴</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map(({ nick_name, email, createdAt, rank }: DetailUser) => (
              <tr className="text-center">
                <td className="w-[5%] py-4">
                  <input type="checkbox" />
                </td>
                <td className="w-[20%]">{nick_name}</td>
                <td className="w-[20%]">{dayjs(createdAt).format("YYYY/MM/DD")}</td>
                <td className="w-[30%]">{email}</td>
                <td className="w-[15%]">{rank}</td>
                <td className="w-[10%]">탈퇴</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
