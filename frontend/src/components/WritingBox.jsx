import React from "react";
import { Editor } from "@toast-ui/react-editor";

export default function WritingBox() {
  return (
    <div>
      <Editor height="600px" initialEditType="markdown" />
    </div>
  );
}
