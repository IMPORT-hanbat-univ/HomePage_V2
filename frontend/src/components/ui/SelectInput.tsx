import React from "react";

type Props = {
  id?: string;
  valueList: { name: string; value: string | undefined }[];
  currentValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function SelectInput({ id, onChange, valueList, currentValue }: Props) {
  return (
    <select id={id} onChange={onChange} className="shadow-select leading-6" value={currentValue}>
      {valueList.map(({ value, name }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
}
