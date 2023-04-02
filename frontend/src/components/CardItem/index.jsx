import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';

export default function CardItem({post}) {
    return (
        <article className='w-[300px] py-1'>
            <Image src={post.image} className='rounded' width={300} height={200} alt={post.title} style={{objectFit: "cover", width:300, height:200}}/>
            <h3 className='w-full h-[36px] mt-3 font-bold text-2xl text-ellipsis overflow-hidden whitespace-nowrap'>{post.title}</h3>
            <span className='mt-1 h-[36px] text-sm opacity-80 tracking-[-0.015em]'>{dayjs(post.createAt).format("YYYY월 M월 D일")}</span>
            <div className="flex mt-[1px] min-h-[32px]">
              {post.tagF && (
                <span className=" mr-[10px] px-[6px] height-[23px] border-none text-tag-text bg-tag-bg-color bg-opacity-10 leading-6 tracking-[-0.015em] text-[12px] w-fit inline-flex items-center justify-center rounded-[40px] font-normal">
                  #{post.tagF}
                </span>
              )}
              {post.tagS && (
                <span className="bg-tag-bg-color bg-opacity-10 mr-[10px] px-[6px] height-[26px] border-none text-tag-text leading-6 tracking-[-0.015em] text-[12px] w-fit inline-flex items-center justify-center rounded-[40px] font-normal">
                  #{post.tagS}
                </span>
              )}
              {post.tagT && (
                <span className="bg-tag-bg-color  bg-opacity-10 mr-[10px] px-[6px] height-[26px] border-none text-tag-text leading-6 tracking-[-0.015em] text-[12px] w-fit inline-flex items-center justify-center rounded-[40px] font-normal ">
                  #{post.tagT}
                </span>
              )}
            </div>
        </article>
    );
}

