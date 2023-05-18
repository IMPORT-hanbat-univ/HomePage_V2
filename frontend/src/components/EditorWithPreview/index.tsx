"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./EditorWithPreview.module.scss";
import TextareaAutosize from "react-textarea-autosize";

import { BiArrowBack } from "react-icons/bi";

import MarkdownViewer from "../MarkdownViewer";
import MarkdownEditor from "../MarkdownEditor";
import { createNotice } from "@/api/notice";
import getClientCookie from "@/util/getClientCookie";
import { useRouter } from "next/navigation";

export default function EditorWithPreview({ type, nick_name = "" }: { type: string; nick_name: string }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagText, setTagText] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);
  const router = useRouter();
  const markdownRef = useRef<HTMLInputElement>(null);

  const pressTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (tagText.trim() === "") {
        return;
      } else if (tagList.length === 3) {
        return;
      } else if (tagList.find((prevTag) => prevTag === tagText.trim())) {
        return;
      } else {
        setTagList((prev) => [...prev, tagText.trim()]);
        setTagText("");
      }
    }
  };

  useEffect(() => {
    if (markdownRef.current) {
      markdownRef.current.scrollTop = markdownRef.current.scrollHeight;
    }
  }, [content]);

  const removeTag = (tag: string) => {
    setTagList((prev) => prev.filter((prevTag) => prevTag !== tag));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const accessToken: string = getClientCookie("accessToken") || "";
    const refreshToken: string = getClientCookie("refreshToken") || "";
    const [tagF = "", tagS = "", tagT = ""] = tagList;
    if (type === "notice") {
      const result: boolean | string = await createNotice(
        {
          title,
          content,
          tagF,
          tagS,
          tagT,
          category: "notice",
          nick_name,
        },
        accessToken,
        refreshToken
      );
      if (typeof result === "boolean") {
        router.push("/");
      } else if (typeof result === "string") {
        alert(result);
        return;
      }
    }
  };

  return (
    <div className="flex">
      <div className="w-full lg:w-1/2 flex flex-col grow-0 h-screen">
        <div className="pt-8 px-4 md:px-12">
          <TextareaAutosize
            className={styles.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
          <div className={styles.bar}></div>
          <div className=" flex flex-wrap">
            {tagList.length > 0 &&
              tagList.map((tag: string) => (
                <div key={tag} className={styles.tag} onClick={() => removeTag(tag)}>
                  {tag}
                </div>
              ))}

            <input
              className={styles.tag_input}
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
              onKeyDown={pressTagInput}
              placeholder="태그를 입력하세요"
            />
          </div>
        </div>
        <div className="pl-3 md:pl-12 h-full w-full">
          <MarkdownEditor text={content} setText={setContent} hideToolbar={false} />
        </div>

        <div className="px-4 h-16 w-full flex justify-between items-center mb-2">
          <button className="h-10 py-2 px-4 flex items-center cursor-pointer bg-none rounded-sm outline-none hover:bg-zinc-100">
            <BiArrowBack className="mr-1" />
            나가기
          </button>
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="h-10 text-lg inline-flex items-center justify-center font-bold cursor-pointer outline-none border-none px-5 bg-green-300 text-white rounded-sm hover:bg-green-200"
            >
              저장하기
            </button>
          </form>
        </div>
      </div>
      <div className="w-1/2 overflow-auto h-screen overflow-y-scroll scroll-smooth hidden lg:block" ref={markdownRef}>
        <div className={styles.viewer}>
          <h1 className="mb-16 text-[2.5rem] font-extrabold">{title}</h1>
          <MarkdownViewer text={content} />
        </div>
      </div>
    </div>
  );
}
