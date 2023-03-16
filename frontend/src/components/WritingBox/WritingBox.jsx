import React, { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import rehypeRaw from "rehype-raw";


export default function WritingBox() {
  const [text, setText] = useState("");
  console.log(text)
  return (
    <div>
      <ReactQuill theme="snow" value={text} onChange={setText}/>
      {text}
      <ReactMarkdown children={text} skipHtml={true} rehypePlugins={[rehypeRaw]}/>
    </div>
  
  );
}
