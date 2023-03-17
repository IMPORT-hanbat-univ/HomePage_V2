import React, { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import TextareaAutosize from "react-textarea-autosize"
import rehypeRaw from "rehype-raw";
import styles from './WritingBox.module.css'
import remarkGfm from 'remark-gfm';
import remarkHtml from "remark-html";

export default function WritingBox() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  
  return (
    <div className="flex">
      <div className="w-1/2">
        <div className="max-h-[540px]">
          <div className="pt-8 pl-12 pr-12">
            <TextareaAutosize className={styles.title} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className={styles.bar}></div>
            <div className=" flex flex-wrap">
              <input className={styles.tag_input}/>
            </div>
          </div>
        </div>
      <textarea className={styles.editor} value={text} onChange={(e) => setText(e.target.value)} />

      </div>
    
      {text && (
        <ReactMarkdown 
        className="markdown" 
        plugins={[remarkGfm, remarkHtml]}
        linkTarget="_blank"
        rehypePlugins={[rehypeRaw]}
      >
        {text}
      </ReactMarkdown>
      )}
      
    </div>
  
  );
}
