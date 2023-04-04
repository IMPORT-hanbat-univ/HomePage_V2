import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { BsImage } from "react-icons/bs";
import rehypeSanitize from "rehype-sanitize";

const MDEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.default), {
  ssr: false,
});

export default function MarkdownEditor({ text, setText }) {
  const imageRef = useRef();
  return (
    <>
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
    </>
  );
}
