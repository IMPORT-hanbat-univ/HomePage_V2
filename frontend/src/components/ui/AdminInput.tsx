import React, { ChangeEvent } from "react";

type Props = {
  selectArray?: {
    valueList: { title: string; value: string | number }[];
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  }[];
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function AdminInput({ selectArray, text, onChange }: Props) {
  return (
    <div className="border rounded flex itemx-center h-12 outline-none ">
      {selectArray &&
        selectArray.map(({ valueList, value, onChange }, index) => (
          <div className="h-full w-[10%]" key={index}>
            <select className="w-full h-full" value={value} onChange={onChange}>
              {valueList.map(({ value, title }) => (
                <option key={value} value={value}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        ))}
      <input className="grow text-lg px-2 outline-none" value={text} onChange={onChange} />
    </div>
  );
}
