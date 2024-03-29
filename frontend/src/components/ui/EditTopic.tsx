import React from "react";

type Props = {
  topic: string;
  onChange: (value: string) => void;
  category: "qna" | "information";
};

const qnaTopicList = [
  { value: "동아리" },
  { value: "기술" },
  {
    value: "기타",
  },
];

const informationTopicList = [
  { value: "교육" },
  { value: "대외활동" },
  {
    value: "기타",
  },
];

export default function EditTopic({ topic, onChange, category }: Props) {
  const valueList = category === "qna" ? qnaTopicList : informationTopicList;
  return (
    <div className="flex w-full items-cetner justify-around">
      {valueList.map(({ value }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={`px-4  py-2  shadow-sm rounded  ${
            topic === value ? "bg-import-color text-white" : "bg-white"
          }  text-lg`}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
