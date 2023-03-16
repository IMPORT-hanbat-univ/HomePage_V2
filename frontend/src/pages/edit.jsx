
import dynamic from "next/dynamic";
import React from "react";

const WritingBox = dynamic(() => import("@/components/WritingBox/WritingBox"), {
    ssr: false
})

export default function Edit() {
  return (
    <div>
      <WritingBox />
    </div>
  );
}
