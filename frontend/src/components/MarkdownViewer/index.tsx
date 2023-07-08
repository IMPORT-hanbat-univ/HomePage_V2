"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { atomDark, vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";
import styles from "./MarkdownViewer.module.scss";
import ReactMarkdown from "react-markdown";

export default function MarkdownViewer({ text }: { text: string }) {
  return (
    <div className="whitespace-pre-wrap w-full h-full">
      <ReactMarkdown
        skipHtml={false}
        remarkPlugins={[remarkGfm]}
        className={styles.mdViewer}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline ? (
              <SyntaxHighlighter language={"javascript"} PreTag="code" wrapLines={true} {...props} style={vscDarkPlus}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          img: (image) => (
            <Image
              src={image.src || ""}
              alt={image.alt || ""}
              width={500}
              height={300}
              className={styles.markdown_container_img}
            />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
