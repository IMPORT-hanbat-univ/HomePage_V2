import React, {  useState } from "react";
import styles from "./WritingBox.module.css"
import TextareaAutosize from "react-textarea-autosize"
import rehypeSanitize from "rehype-sanitize";
import  "@uiw/react-md-editor/markdown-editor.css" ; 
import dynamic from "next/dynamic";


const MDEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.default), {
  ssr: false,
});

const Markdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);


export default function WritingBox(){
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
          <MDEditor height={600} preview="edit" value={text} onChange={setText} />
          <Markdown source={text} rehypePlugins={[rehypeSanitize]} style={{ whiteSpace: 'pre-wrap' }} />
        </div>

      </div>
    
      
    </div>


  );
}
