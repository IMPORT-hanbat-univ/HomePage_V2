import React, { useRef, useState } from "react";
import styles from "./EditorWithPreview.module.css"
import TextareaAutosize from "react-textarea-autosize";
import rehypeSanitize from "rehype-sanitize";
import "@uiw/react-md-editor/markdown-editor.css";
import dynamic from "next/dynamic";
import {BsImage} from "react-icons/bs"
import {BiArrowBack} from "react-icons/bi"
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

export default function WritingBox() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tagText, setTagText] = useState("");
  const [tags, setTags] = useState([]);
  const imageRef = useRef();

  const pressTagInput = (e) => {
    if(e.key === "Enter"){
      if(tagText.trim() === ""){
        return;
      }else if(tags.length === 3){
        return;
      }else if(tags.find((prevTag) => prevTag === tagText.trim())){
        return;
      }else{
        setTags((prev) => [...prev, tagText.trim()]);
        setTagText("");
      }
   
    }

  }

  const removeTag = (tag) => {
    console.log(tag)
    setTags((prev) => prev.filter((prevTag) => prevTag !== tag))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(title, tags, text)
  }
  return (
    <div className="flex">
      <div  className="w-1/2 flex flex-col grow-0 h-screen">
  
        <div className="pt-8 pl-12 pr-12">

          <TextareaAutosize
            className={styles.title}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={styles.bar}></div>
          <div className=" flex flex-wrap">
            {tags.length > 0 && tags.map((tag) => (
              <div key={tag} className={styles.tag} onClick={() => removeTag(tag)}>{tag}</div>
            ))}
            
            <input className={styles.tag_input} value={tagText} onChange={(e) => setTagText(e.target.value)} onKeyDown={pressTagInput} />
          </div>
        </div>
        <MDEditor  
          preview="edit" 
          value={text} 
          onChange={setText} 
          components={{
          toolbar: (command, disabled, executeCommand) => {
              if(command.keyCommand === "image"){
                return <button type="button" ><BsImage  onClick={() => {imageRef.current.click()}}/></button>
              }
            }
          }} 
          className="!h-full flex-grow-0 overflow-auto"
          visibleDragbar={false}
        />
        <input type="file" style={{display: "none"}} ref={imageRef} />
        <div className="px-4 h-16 w-full flex justify-between items-center">
          <button className="h-10 py-2 px-4 flex items-center cursor-pointer bg-none rounded-sm outline-none hover:bg-zinc-100">
            <BiArrowBack className="mr-1"/>나가기
          </button>
          <form onSubmit={handleSubmit}>
            <button type="submit" className="h-10 text-lg inline-flex items-center justify-center font-bold cursor-pointer outline-none border-none px-5 bg-green-300 text-white rounded-sm hover:bg-green-200">
              저장하기
            </button>
          </form>
        </div>
      </div>
      <div className="w-1/2 overflow-auto h-screen">
        <div className={styles.viewer}>
          <h1 className="mb-16 text-[2.5rem] font-extrabold">{title}</h1>
          <Markdown source={text} rehypePlugins={[rehypeSanitize]} style={{ whiteSpace: "pre-wrap" }}/>
        </div>
       
      </div>
    </div>
  );
}
