"use client";
import React, { ChangeEvent, useRef } from "react";
import dynamic from "next/dynamic";
import { BsImage } from "react-icons/bs";
import rehypeSanitize from "rehype-sanitize";
import "@uiw/react-md-editor/markdown-editor.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.default), {
  ssr: false,
});

type Props = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  hideToolbar: boolean;
};

export default function MarkdownEditor({ text, setText, hideToolbar }: Props) {
  const imageRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (hideToolbar) {
      return;
    }

    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("fileupload", file);

      fetch(`http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/post/file`, {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          // 업로드 성공 후 처리 로직

          //app${data}
          setText((prev) => `${prev} \n ![test](http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}${data} "title")`);
        })
        .catch((error) => {
          // 업로드 실패 시 처리 로직
          console.log(error);
        });
    }
  };
  return (
    <>
      <MDEditor
        preview="edit"
        hideToolbar={hideToolbar}
        value={text}
        onChange={(newValue = "") => setText(newValue)}
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
                      imageRef.current?.click();
                    }}
                  />
                </button>
              );
            }
          },
        }}
        className="!h-full w-full flex-grow-0 overflow-auto flex flex-col"
        visibleDragbar={false}
      />
      <input onChange={handleFile} type="file" style={{ display: "none" }} ref={imageRef} />
    </>
  );
}
