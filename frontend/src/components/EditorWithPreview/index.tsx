"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./EditorWithPreview.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { BiArrowBack } from "react-icons/bi";
import MarkdownViewer from "../MarkdownViewer";
import MarkdownEditor from "../MarkdownEditor";
import { useRouter } from "next/navigation";

import { useSetRecoilState } from "recoil";
import { notificationAtom } from "@/recoil/notification";

import ModalPortal from "../ui/ModalPortal";
import EditModalContainer from "../ui/EditModalContainer";
import EditModal from "../EditModal";
import useMe from "@/hooks/useMe";

type Props = {
  initTitle?: string;
  initContent?: string;
  initTagList?: string[];
  initTopic?: string;
};

export default function EditorWithPreview({ initContent, initTitle, initTagList, initTopic }: Props) {
  const { decodeUser, error } = useMe();
  const [title, setTitle] = useState(initTitle ?? "");
  const [content, setContent] = useState(initContent ?? "");
  const [tagText, setTagText] = useState("");
  const [tagList, setTagList] = useState<string[]>(initTagList ?? []);
  const [modal, setModal] = useState(false);
  const setNotification = useSetRecoilState(notificationAtom);
  const markdownRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  
  if (!decodeUser || Object.keys(decodeUser).length === 0 || error || decodeUser.rank < 4) {
    //router.replace("/");
    console.log("decodeUser", decodeUser)
  }
  const nick_name:string = decodeUser?.nick_name || ""
  //const nick_name: string = decodeUser.nick_name;
  //const nick_name: string = decodeUser?.nick_name;
  console.log("nick_name!!!!!!!!!!",nick_name)
  const pressTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (tagText.trim() === "") {
        return;
      } else if (tagList.length === 3) {
        setNotification({ notificationType: "Warning", message: "태그는 3개까지만 추가 가능합니다.", type: "warning" });
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

  const handleOpenModal = () => {
    if (!nick_name) {
      alert("작성 권한이 없습니다.");
      return;
    }
    if (title.trim() === "") {
      setNotification({ notificationType: "Warning", message: "제목은 비워둘 수 없습니다.", type: "warning" });
      return;
    } else if (content.trim() === "") {
      setNotification({ notificationType: "Warning", message: "내용은 비워둘 수 없습니다.", type: "warning" });
      return;
    }
    setModal(true);
  };

  return (
    <>
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
            <button
              onClick={() => {
                router.back();
              }}
              className="h-10 py-2 px-4 flex items-center cursor-pointer bg-none rounded-sm outline-none hover:bg-zinc-100"
            >
              <BiArrowBack className="mr-1" />
              나가기
            </button>

            <button
              onClick={handleOpenModal}
              className="h-10 text-lg inline-flex items-center justify-center font-bold cursor-pointer outline-none border-none px-5 bg-green-300 text-white rounded-sm hover:bg-green-200"
            >
              완료
            </button>
          </div>
        </div>
        <div className="w-1/2 overflow-auto h-screen overflow-y-scroll scroll-smooth hidden lg:block" ref={markdownRef}>
          <div className={styles.viewer}>
            <h1 className="mb-16 text-[2.5rem] font-extrabold">{title}</h1>
            <MarkdownViewer text={content} />
          </div>
        </div>
      </div>
      {modal && (
        <ModalPortal>
          <EditModalContainer>
            <EditModal
              nick_name={nick_name}
              initTopic={initTopic}
              onClose={() => setModal(false)}
              title={title}
              tagList={tagList}
              content={content}
            />
          </EditModalContainer>
        </ModalPortal>
      )}
    </>
  );
}
