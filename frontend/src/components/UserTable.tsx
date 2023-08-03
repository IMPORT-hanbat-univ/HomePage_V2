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

type Props = {
  currentRank: string;
  searchValue: string;
  user: DecodeUser;
};
export default function UserTable({ currentRank, searchValue, user }: Props) {
  const { data, isLoading, error, withdrawlUser } = useUsers();
  const [requestLevel, setRequestLevel] = useState("1");
  const [showModal, setShowModal] = useState(false);
  const [detailUser, setDetailUser] = useState<null | DetailUser>(null);
  const filteredData = getAdminFilter(data, { currentRank, searchValue });
  const target = useRef<HTMLDivElement>(null);
  const userData = useInfiniteScroll(target, filteredData);
  console.log("result", userData);
  const setNotification = useSetRecoilState(notificationAtom);
  const handleWithdrawl = (userId: number) => {
    if (user.rank < 5) {
      setNotification({ notificationType: "Warning", message: "삭제 권한이 없습니다.", type: "warning" });
    }
    const accessToken: string = getClientCookie("accessToken") || "";
    const refreshToken: string = getClientCookie("refreshToken") || "";
    try {
      withdrawlUser(userId, accessToken, refreshToken);
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
        <div className="w-full overflow-x-hidden">
          <table className="w-full  bg-white rounded">
            <thead className="block w-full ">
              <tr className=" w-[98%] flex items-center">
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
            <tbody className="block overflow-auto max-h-[38rem] w-full">
              {userData &&
                userData.length > 0 &&
                userData.map((user: DetailUser) => (
                  <tr className="text-center flex items-center">
                    <td className="w-[5%] py-4">
                      <input type="checkbox" />
                    </td>
                    <td className="w-[20%] cursor-pointer" onClick={() => openModal(user)}>
                      {user.nick_name}
                    </td>
                    <td className="w-[20%]">{dayjs(user.createdAt).format("YYYY/MM/DD")}</td>
                    <td className="w-[30%]">{user.email}</td>
                    <td className="w-[15%]">{user.rank}</td>
                    <td className="w-[10%]">
                      <button
                        className="border-none outline-none py-1 px-2 bg-red-500 rounded text-white"
                        onClick={() => handleWithdrawl(user.userId)}
                      >
                        탈퇴
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
