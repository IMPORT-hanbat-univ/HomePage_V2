"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import useAdmins from "@/hooks/useUsers";
import { DecodeUser, DetailUser } from "@/util/type";
import dayjs from "dayjs";
import getAdminFilter from "@/util/getAdminFilter";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useUsers from "@/hooks/useUsers";
import getClientCookie from "@/util/getClientCookie";
import { useSetRecoilState } from "recoil";
import { notificationAtom } from "@/recoil/notification";
import ModalPortal from "./ui/ModalPortal";
import AdminModalContainer from "./ui/AdminModalContainer";
import AdminModal from "./AdminModal";
import useRanks from "@/hooks/useRanks";
import useMe from "@/hooks/useMe";
import { useSWRConfig } from "swr";

type Props = {
  currentRank: string;
  searchValue: string;
};
export default function RankTable({ currentRank, searchValue }: Props) {
  const [changeRank, setChangeRank] = useState("1");
  const [showModal, setShowModal] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const { decodeUser: user } = useMe();
  const { mutate } = useSWRConfig();
  const [detailUser, setDetailUser] = useState<null | DetailUser>(null);
  const [levelUser, setLevelUser] = useState<{ userId: number; rank: number; requestRank?: number }[]>([]);
  const { data, isLoading, error, updateUsersLevel, rankRejectUser } = useRanks();
  const filteredData = getAdminFilter(data, { currentRank, searchValue });

  const target = useRef<HTMLDivElement>(null);
  const userData = useInfiniteScroll(target, filteredData);
  console.log("result", userData);
  const setNotification = useSetRecoilState(notificationAtom);
  const handleWithdrawl = (userId: number) => {
    const accessToken: string = getClientCookie("accessToken") || "";
    const refreshToken: string = getClientCookie("refreshToken") || "";
    if (user.rank < 5) {
      setNotification({ notificationType: "Warning", message: "탈퇴 권한이 없습니다.", type: "warning" });
    }

    try {
    } catch (err: any) {
      console.log(err);
      setNotification({ notificationType: "Warning", message: "탈퇴 과정에서 에러가 발생했습니다.", type: "warning" });

      return;
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setDetailUser(null);
  };
  const openModal = (data: DetailUser) => {
    setShowModal(true);
    setDetailUser(data);
  };
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
    const refreshToken: string = getClientCookie("refreshToken") || "";
    if (user.rank < 4) {
      setNotification({ notificationType: "Warning", message: "반려 권한이 없습니다.", type: "warning" });
    }

    try {
      rankRejectUser(userId, accessToken, refreshToken);
    } catch (err: any) {
      console.log(err);
      setNotification({ notificationType: "Warning", message: "반려 과정에서 에러가 발생했습니다.", type: "warning" });

      return;
    }
  };
  const handleChangeRank = () => {
    const accessToken: string = getClientCookie("accessToken") || "";
    const refreshToken: string = getClientCookie("refreshToken") || "";
    const newLevelUsers = levelUser.map((item) => ({ ...item, changeRank: parseInt(changeRank) }));
    updateUsersLevel(newLevelUsers, accessToken, refreshToken);
    mutate(`http://localhost:4000/auth/tokenverification`);
    setLevelUser([]);
    setIsAllChecked(false);
  };

  return (
    <>
      {detailUser && showModal && (
        <ModalPortal>
          <AdminModalContainer onClose={closeModal}>
            <AdminModal data={detailUser} />
          </AdminModalContainer>
        </ModalPortal>
      )}

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
                    <td className="w-[20%] cursor-pointer" onClick={() => openModal(user)}>
                      {user.nick_name}
                    </td>
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
