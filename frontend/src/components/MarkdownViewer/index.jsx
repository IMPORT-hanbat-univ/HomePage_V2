import React from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { atomDark, vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export default function MarkdownViewer({text}) {
    return (
        <div className="whitespace-pre-wrap w-full h-full">
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
    );
}

