import React from "react";

type Props = {
  topic: string;
  onChange: (value: string) => void;
};

const valueList = [
  { value: "club", title: "동아리" },
  { value: "technology", title: "기술" },
  {
    value: "etc",
    title: "기타",
  },
];

export default function NoticeEditTopic({ topic, onChange }: Props) {
  return (
    <div className="flex w-full items-cetner justify-around">
      {valueList.map(({ value, title }) => (
        <button
          type="button"
          onClick={() => onChange(value)}
          className={`px-4  py-2  shadow-sm rounded  ${
            topic === value ? "bg-import-color text-white" : "bg-white"
          }  text-lg`}
        >
          {title}
        </button>
      ))}
    </div>
  );
}
