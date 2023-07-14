import React from "react";

type Props = {
  valueList: { name: string; value: string | undefined }[];
  currentValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function SelectIinput({ onChange, valueList, currentValue }: Props) {
  return (
    <select onChange={onChange} className="shadow-select leading-6" value={currentValue}>
      {valueList.map(({ value, name }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
}
