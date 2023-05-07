import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function RelatedPost({ relatedList }) {
  const router = useRouter();
  const basePath = router.pathname.split("/").slice(0, -1).join("/");

  return (
    <div className="mb-3 w-full">
      <div className="py-4 px-5 border rounded-sm w-full">
        <h6 className="mb-[1em] h-[20px] text-xs text-light-gray">연관게시글</h6>
        <ul>
          {relatedList &&
            relatedList.length > 0 &&
            relatedList.map((post) => (
              <li key={post.id} className="py-2 border-b mb-2 text-sm hover:bg-zinc-50">
                <Link href={`${basePath}/${post.id}`}>
                  <span className=" overflow-hidden text-ellipsis whitespace-normal break-all line-clamp-2 max-h-14 mb-1">
                    {post.title}
                  </span>
                  <div className="flex items-center justify-between text-xs font-thin text-light-gray">
                    <span>{post.nick_name}</span>
                    <span> {dayjs(post.createAt).format("YYYY년 M월 D일")}</span>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
