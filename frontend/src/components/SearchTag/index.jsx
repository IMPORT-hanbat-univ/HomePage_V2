import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function SearchTag() {
    const [tagText, setTagText] = useState("")
    const [tagList, setTagList] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if(tagList.length > 0){
            router.push({pathname: router.pathname, query: {...router.query, tag: tagList.join("+")}}, undefined, {shallow: true})
        }else{
            const copyQuery = {...router.query};
            delete copyQuery.tag;
            router.push({pathname: router.pathname, query: {...copyQuery}}, undefined, {shallow: true})
        }
    }, [tagList])

    const pressTagInput = (e) => {
        if(e.key === "Enter"){
          if(tagText.trim() === ""){
            return;
          }else if(tagList.find((prevTag) => prevTag === tagText.trim())){
            return;
          }else{
            setTagList((prev) => [...prev, tagText.trim()]);
            setTagText("");
          }
       
        }
    
      }
    
    const removeTag = (tag) => {
        setTagList((prev) => prev.filter((prevTag) => prevTag !== tag))
    }

    const removeAllTag = () => {
        setTagList([])
    }
    
    return (
        <div className='flex'>
            <div className='w-full'>
                <div className='w-full h-12 px-3 pt-2 pb-1 overflow-x-hidden overflow-y-auto flex items-center border border-zinc-300 rounded'>
                    <svg className='mt-1 mr-2 overflow-hidden' width="16" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 16 16">
                        <path fill="#3E4042" fillRule="evenodd" d="M5.773 1.455c-.283 0-.518.216-.542.498L5 4.727H2.545c-.3 0-.545.244-.545.546 0 .301.244.545.545.545H4.91l-.364 4.364h-2c-.3 0-.545.244-.545.545 0 .301.244.546.545.546h1.91l-.224 2.684c-.027.317.224.588.542.588.282 0 .518-.216.541-.498l.231-2.774H9.91l-.224 2.684c-.026.317.224.588.542.588.283 0 .518-.216.542-.498L11 11.273h2.454c.302 0 .546-.245.546-.546 0-.301-.244-.545-.546-.545h-2.363l.364-4.364h2c.3 0 .545-.244.545-.545 0-.302-.244-.546-.546-.546h-1.909l.224-2.684c.027-.317-.224-.588-.542-.588-.282 0-.518.216-.541.498l-.232 2.774H6.091l.224-2.684c.026-.317-.224-.588-.542-.588zM6 5.818l-.364 4.364H10l.364-4.364H6z" clipRule="evenodd">
                        </path>
                    </svg>
                    {tagList.map((tag) => (
                        <button key={tag} onClick={() => removeTag(tag)} className='bg-gray-100 w-fit p-1 whitespace-nowrap text-xs border-none mt-2 mr-2 mb-1 inline-flex rounded item-center'>
                            {tag}
                        </button>
                    ))}
                    <input className='w-full text-[14px] border-none bg-none outline-none' value={tagText} onChange={(e) => setTagText(e.target.value)} onKeyDown={pressTagInput} placeholder='태그를 입력해주세요'/>
                </div> 
            </div>
            <button className='min-w-[96px] ml-4 h-12 px-3 text-[14px] font-semibold inline-flex justify-center items-center' onClick={removeAllTag}>
                <svg className='mr-3 overflow-hidden' width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        fill="#212529" 
                        fillRule="evenodd" 
                        clipRule="evenodd" 
                        d="M2.254 5.333C3.26 3.167 5.456 1.667 8 1.667c2.964 0 5.454 2.037 6.144 4.788.067.268.338.43.606.363.268-.067.43-.338.364-.606C14.315 3.026 11.434.667 8 .667c-2.702 0-5.061 1.46-6.333 3.634V3.167c0-.276-.224-.5-.5-.5s-.5.224-.5.5v2.5c0 .368.298.666.666.666h2.5c.276 0 .5-.223.5-.5 0-.276-.224-.5-.5-.5h-1.58zM1.856 9.545c-.067-.268-.338-.43-.606-.363-.268.067-.43.338-.364.606.799 3.186 3.68 5.545 7.114 5.545 2.702 0 5.061-1.46 6.333-3.634v1.134c0 .277.224.5.5.5.277 0 .5-.223.5-.5v-2.5c0-.368-.298-.666-.666-.666h-2.5c-.277 0-.5.224-.5.5s.223.5.5.5h1.58c-1.008 2.166-3.203 3.666-5.747 3.666-2.964 0-5.454-2.037-6.144-4.788z"
                    />
                
                </svg>
                초기화
            </button>
        </div>
    );
}

