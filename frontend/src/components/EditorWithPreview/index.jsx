import React, { useEffect, useRef, useState } from "react";
import styles from "./EditorWithPreview.module.css";
import TextareaAutosize from "react-textarea-autosize";
import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";
import { BsImage } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { atomDark, vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";

const MDEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.default), {
  ssr: false,
});

export default function WritingBox() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tagText, setTagText] = useState("");
  const [tagList, setTagList] = useState([]);
  const imageRef = useRef();
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
    console.log({text});
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
        <MDEditor
          preview="edit"
          value={text}
          onChange={setText}
          highlightEnable={false}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          components={{
            toolbar: (command, disabled, executeCommand) => {
              if (command.keyCommand === "image") {
                return (
                  <button type="button">
                    <BsImage
                      onClick={() => {
                        imageRef.current.click();
                      }}
                    />
                  </button>
                );
              }
            },
          }}
          className="!h-full flex-grow-0 overflow-auto pl-12"
          visibleDragbar={false}
        />
        <input type="file" style={{ display: "none" }} ref={imageRef} />
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
          <div className="whitespace-pre-wrap">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="scrollbar-hide w-full h-full"
              components={{
                code({ node, inline, className, children, ...props }) {
                  return (
                    <SyntaxHighlighter
                      language="typescript"
                      className="markdown-viewer-code"
                      PreTag="div"
                      wrapLines={true}
                      {...props}
                      style={vscDarkPlus}
                    >
                      {children}
                    </SyntaxHighlighter>
                  );
                },
                img: (image) => (
                  <Image
                    src={image.src || ""}
                    alt={image.alt || ""}
                    width={500}
                    height={300}
                    className={classes.markdown_container_img}
                  />
                ),
              }}
            >
              {text}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
