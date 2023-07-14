"use client";
import React, { useState } from "react";
import SelectIinput from "./ui/SelectIinput";
import { useSearchParams } from "next/navigation";
type Props = {
  title: string;
  tagList: string[];
  content: string;
  onClose: () => void;
};

const aboutList = [
  { name: "Introduce", value: "introduce" },
  { name: "Rule", value: "rule" },
  { name: "Schedule", value: "schedule" },
  { name: "Notice", value: "notice" },
];

const communityList = [
  { name: "QnA", value: "qna" },
  { name: "Information", value: "information" },
];

const projectList = [
  { name: "Project", value: "project" },
  { name: "Patchnote", value: "patch" },
];

const selectCategoryList = [
  { category: "introduce", path: "about", categoryList: aboutList },
  { category: "rule", path: "about", categoryList: aboutList },
  { category: "schedule", path: "about", categoryList: aboutList },
  { category: "notice", path: "about", categoryList: aboutList },
  { category: "qnq", path: "community", categoryList: communityList },
  { category: "information", path: "community", categoryList: communityList },
  { category: "project", path: "project", categoryList: projectList },
  { category: "patchnote", path: "project", categoryList: projectList },
];

export default function EditModal({ title, tagList, content, onClose }: Props) {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams?.get("category");
  const selectCategory = selectCategoryList.find((item) => item.category === categoryQuery);
  const [categoryList, setCategoryList] = useState<{ name: string; value: string }[] | []>(
    selectCategory?.categoryList ?? []
  );
  const [path, setPath] = useState<string>(selectCategory?.path ?? "");
  const [category, setCategory] = useState<string>(categoryQuery ?? "");

  const handlePathChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPath = e.target.value;
    setPath(newPath);
    setCategory("");
    setCategoryList(selectCategoryList.find((item) => item.path === newPath)?.categoryList ?? []);
  };
  return (
    <article className="w-full p-8 max-w-4xl gap-4 h-full my-auto flex flex-col  justify-center">
      <h4 className="text-lg mb-3 md:mb-6 font-extrabold py-4 border-b-2 border-b-black">상세 설정</h4>

      <p className="text-2xl md:text-3xl whitespace-nowrap  overflow-hidden  text-ellipsis  font-semibold">{title}</p>
      <div className="py-4 border-y ">
        <label htmlFor="category" className="block mb-2">
          카테고리
        </label>
        <SelectIinput
          onChange={handlePathChange}
          valueList={[
            { name: "카테고리를 선택해주세요", value: "" },
            { name: "About", value: "about" },
            { name: "Community", value: "community" },
            { name: "Project", value: "project" },
          ]}
          currentValue={path}
        />
      </div>
      {path.trim() !== "" && categoryList.length > 0 && (
        <div className="py-1 border-y">
          <label htmlFor="category">카테고리</label>
          <SelectIinput onChange={(e) => setPath(e.target.value)} valueList={categoryList} currentValue={category} />
        </div>
      )}
    </article>
  );
}
