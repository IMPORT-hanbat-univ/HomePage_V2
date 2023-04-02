import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

export default function CardItem({post}) {
    const router = useRouter();
    const {tag} = router.query
    const clickTag = (seletedTag) => {
      if(tag&&tag.trim() !== ""){
        if(tag.includes(seletedTag)){
          return;
        }
        const newTag = `${tag}+${seletedTag}`
        router.push({pathname: router.pathname, query: {...router.query, tag: newTag}}, undefined, {shallow: true})
      }else{
        router.push({pathname: router.pathname, query: {...router.query, tag: seletedTag}}, undefined, {shallow: true})
      }
    
    }
    return (
        <article className='w-[300px] py-1'>
            <Image src={post.image} className='rounded' width={300} height={200} alt={post.title} style={{objectFit: "cover", width:300, height:200}}/>
            <h3 className='w-full h-[36px] mt-3 font-bold text-2xl leading-9 tracking-[-0.015em]  text-ellipsis overflow-hidden whitespace-nowrap'>{post.title}</h3>
            <span className='mt-1 h-[36px] text-sm opacity-80 tracking-[-0.015em]'>{dayjs(post.createAt).format("YYYY월 M월 D일")}</span>
            <div className="flex mt-[1px] min-h-[32px]">
              {post.tagF && (
                <button onClick={() => clickTag(post.tagF)} className="text-tag-text bg-tag-bg-color bg-opacity-10 mr-[10px] px-[8px] height-[23px] border-none  leading-6 tracking-[-0.015em] text-[12px] w-fit inline-flex items-center justify-center rounded-[40px] font-normal">
                  #{post.tagF}
                </button>
              )}
              {post.tagS && (
                <button onClick={() => clickTag(post.tagS)} className="text-tag-text bg-tag-bg-color bg-opacity-10 mr-[10px]  px-[8px] height-[26px] border-none  leading-6 tracking-[-0.015em] text-[12px] w-fit inline-flex items-center justify-center rounded-[40px] font-normal">
                  #{post.tagS}
                </button>
              )}
              {post.tagT && (
                <button onClick={() => clickTag(post.tagT)} className="text-tag-text bg-tag-bg-color  bg-opacity-10 mr-[10px] px-[8px] height-[26px] border-none  leading-6 tracking-[-0.015em] text-[12px] w-fit inline-flex items-center justify-center rounded-[40px] font-normal ">
                  #{post.tagT}
                </button>
              )}
            </div>
        </article>
    );
}

