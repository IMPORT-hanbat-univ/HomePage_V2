"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import { DecodeUser, DetailUser } from "@/util/type";
import dayjs from "dayjs";
import getAdminFilter from "@/util/getAdminFilter";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

import getClientCookie from "@/util/getClientCookie";
import { useSetRecoilState } from "recoil";
import { notificationAtom } from "@/recoil/notification";

import useRanks from "@/hooks/useRanks";

import { useSWRConfig } from "swr";

type Props = {
  currentRank: string;
  searchValue: string;
  requestRank: string;
  user: DecodeUser;
};
export default function RankTable({ currentRank, searchValue, requestRank, user }: Props) {
  const [changeRank, setChangeRank] = useState("1");

  const [isAllChecked, setIsAllChecked] = useState(false);

  const { mutate } = useSWRConfig();

  const [levelUser, setLevelUser] = useState<{ userId: number; rank: number; requestRank?: number }[]>([]);
  const { data, isLoading, error, updateUsersLevel, rankRejectUser } = useRanks();
  const filteredData = getAdminFilter(data, { currentRank, requestRank, searchValue });

  const target = useRef<HTMLDivElement>(null);
  const userData = useInfiniteScroll(target, filteredData);

  const setNotification = useSetRecoilState(notificationAtom);

  const changeCheckbox = (e: ChangeEvent<HTMLInputElement>, user: DetailUser) => {
    if (e.target.checked) {
      setIsAllChecked(true);
      setLevelUser((prev) => [...prev, { userId: user.userId, rank: user.rank, requestRank: user.requestRank }]);
    } else {
      setIsAllChecked(false);
      setLevelUser((prev) => prev.filter((item) => item.userId !== user.userId));
    }
  };

  const handleCheckAllUsers = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setLevelUser(userData.map((item) => ({ userId: item.userId, rank: item.rank, requestRank: item.requestRank })));
    } else {
      setLevelUser([]);
    }
  };

  const handleRejectRank = (userId: number) => {
    const accessToken: string = getClientCookie("accessToken") || "";

    if (user.rank < 4) {
      setNotification({ notificationType: "Warning", message: "반려 권한이 없습니다.", type: "warning" });
    }

    try {
      rankRejectUser(userId, accessToken);
    } catch (err: any) {
      console.log(err);
      setNotification({ notificationType: "Warning", message: "반려 과정에서 에러가 발생했습니다.", type: "warning" });

      return;
    }
  };
  const handleChangeRank = () => {
    const accessToken: string = getClientCookie("accessToken") || "";

    const newLevelUsers = levelUser.map((item) => ({ ...item, changeRank: parseInt(changeRank) }));
    updateUsersLevel(newLevelUsers, accessToken);
    mutate(`http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/auth/tokenverification`);
    setLevelUser([]);
    setIsAllChecked(false);
  };

  return (
    <>
      <section className="w-full h-full overflow-hidden">
        <div className="flex items-center gap-6 p-4 ">
          <select
            className="p-2"
            value={changeRank}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setChangeRank(e.target.value)}
          >
            <option value={1}>일반회원</option>
            <option value={2}>동아리원</option>
            <option value={3}>개발팀장</option>
            <option value={4}>임원진</option>
            <option value={5}>관리자</option>
          </select>
          <button
            onClick={handleChangeRank}
            className="px-3 py-2 bg-blue-500 border-none outline-none rounded text-white"
          >
            선택 레벨 변경
          </button>
        </div>
        <div className="w-full overflow-x-hidden">
          <table className="w-full  bg-white rounded">
            <thead className="block w-full ">
              <tr className=" w-[98%] flex items-center">
                <th className="w-[5%] py-4">
                  <input type="checkbox" checked={isAllChecked} onChange={handleCheckAllUsers} />
                </th>
                <th className="w-[20%]">닉네임</th>
                <th className="w-[20%]">요청일</th>
                <th className="w-[25%]">email</th>
                <th className="w-[10%]">현재레벨</th>
                <th className="w-[10%]">요청레벨</th>
                <th className="w-[10%]">반려</th>
              </tr>
            </thead>
            <tbody className="block overflow-auto max-h-[38rem] w-full">
              {userData &&
                userData.length > 0 &&
                userData.map((user: DetailUser) => (
                  <tr className="text-center flex items-center">
                    <td className="w-[5%] py-4">
                      <input
                        type="checkbox"
                        checked={levelUser.find((item) => item.userId === user.userId) ? true : false}
                        onChange={(e) => changeCheckbox(e, user)}
                      />
                    </td>
                    <td className="w-[20%] cursor-pointer">{user.nick_name}</td>
                    <td className="w-[20%]">{dayjs(user.createdAt).format("YYYY/MM/DD")}</td>
                    <td className="w-[25%]">{user.email}</td>
                    <td className="w-[10%]">{user.rank}</td>
                    <td className="w-[10%]">{user.requestRank}</td>
                    <td className="w-[10%]">
                      <button
                        className="border-none outline-none py-1 px-2 bg-red-500 rounded text-white"
                        onClick={() => handleRejectRank(user.userId)}
                      >
                        반려
                      </button>
                    </td>
                  </tr>
                ))}
              <tr>
                <td>
                  <div
                    className={`${filteredData.length === userData?.length ? "hidden" : "block"}`}
                    ref={target}
                  ></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
