import React, { useEffect, useRef, useState } from "react";
import styles from "./EditorWithPreview.module.css";
import TextareaAutosize from "react-textarea-autosize";
import "@uiw/react-md-editor/markdown-editor.css";

import { BiArrowBack } from "react-icons/bi";

import MarkdownViewer from "../MarkdownViewer";
import MarkdownEditor from "../MarkdownEditor";

export default function WritingBox() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tagText, setTagText] = useState("");
  const [tagList, setTagList] = useState([]);

  const markdownRef = useRef(null);

  const pressTagInput = (e) => {
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
  }, [text]);

  const removeTag = (tag) => {
    setTagList((prev) => prev.filter((prevTag) => prevTag !== tag));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ text });
  };

  return (
    <div className="flex">
      <div className="w-1/2 flex flex-col grow-0 h-screen">
        <div className="pt-8 pl-12 pr-12">
          <TextareaAutosize
            className={styles.title}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
          <div className={styles.bar}></div>
          <div className=" flex flex-wrap">
            {tagList.length > 0 &&
              tagList.map((tag) => (
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
        <div className="pl-12 h-full w-full">
          <MarkdownEditor text={text} setText={setText} />
        </div>

        <div className="px-4 h-16 w-full flex justify-between items-center">
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
      <div className="w-1/2 overflow-auto h-screen overflow-y-scroll scroll-smooth" ref={markdownRef}>
        <div className={styles.viewer}>
          <h1 className="mb-16 text-[2.5rem] font-extrabold">{title}</h1>
          <MarkdownViewer text={text} />
        </div>
      </div>
    </div>
  );
}
