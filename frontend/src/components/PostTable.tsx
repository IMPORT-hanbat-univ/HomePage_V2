"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { DetailUser, SimplePost } from "@/util/type";
import dayjs from "dayjs";
import getAdminFilter from "@/util/getAdminFilter";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

import { useSetRecoilState } from "recoil";
import { notificationAtom } from "@/recoil/notification";

import useMe from "@/hooks/useMe";

import useAdminPosts from "@/hooks/useAdminPosts";
import Link from "next/link";
import getClientCookie from "@/util/getClientCookie";

type Props = {
  category: string;
  searchValue: string;
};
export default function PostTable({ searchValue, category }: Props) {
  const { decodeUser: user } = useMe();
  const { data = [], isLoading, deletePost } = useAdminPosts();
  console.log("checkData", data);
  const filteredData = getAdminFilter(data, { category, searchValue });

  const target = useRef<HTMLDivElement>(null);
  const postData = useInfiniteScroll(target, filteredData);

  const setNotification = useSetRecoilState(notificationAtom);
  const handleDeletePost = (post: SimplePost) => {
    if (user.rank < 4) {
      setNotification({ notificationType: "Warning", message: "삭제 권한이 없습니다.", type: "warning" });
    }
    console.log("123123");
    const accessToken: string = getClientCookie("accessToken") || "";
    const refreshToken: string = getClientCookie("refreshToken") || "";
    try {
      deletePost(post.category, post.id, accessToken, refreshToken);
    } catch (err: any) {
      console.log(err);
      setNotification({ notificationType: "Warning", message: "탈퇴 과정에서 에러가 발생했습니다.", type: "warning" });

      return;
    }
  };
  return (
    <>
      <section className="w-full h-full overflow-hidden">
        <div className="w-full mt-8 overflow-x-hidden">
          <table className="w-full  bg-white rounded">
            <thead className="block w-full ">
              <tr className=" w-[98%] flex items-center">
                <th className="w-[15%]">닉네임</th>
                <th className="w-[15%]">생성날짜</th>
                <th className="w-[15%]">카테고리</th>
                <th className="w-[35%]">제목</th>
                <th className="w-[10%]">수정</th>
                <th className="w-[10%]">삭제</th>
              </tr>
            </thead>
            <tbody className="block overflow-auto max-h-[38rem] w-full">
              {postData &&
                postData.length > 0 &&
                postData.map((post: SimplePost) => (
                  <tr className="text-center flex items-center" key={post.id}>
                    <td className="w-[15%] cursor-pointer">{post.nick_name}</td>
                    <td className="w-[15%]">{dayjs(post.createdAt).format("YYYY/MM/DD")}</td>
                    <td className="w-[15%]">{post.category}</td>
                    <td className="w-[35%]">{post.title}</td>
                    <td className="w-[10%]">
                      <Link
                        href={`/adminedit/${post.id}?category=${post.category}`}
                        className="border-none outline-none py-1 px-2 bg-blue-500 rounded text-white"
                      >
                        수정
                      </Link>
                    </td>
                    <td className="w-[10%]">
                      <button
                        className="border-none outline-none py-1 px-2 bg-red-500 rounded text-white"
                        onClick={() => handleDeletePost(post)}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              <tr>
                <td>
                  <div
                    className={`${filteredData.length === postData?.length ? "hidden" : "block"}`}
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
