"use client";
import React, { useState, useTransition } from "react";
import SelectIinput from "./ui/SelectIinput";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import EditTopic from "./ui/EditTopic";
import { useSetRecoilState } from "recoil";
import { notificationAtom } from "@/recoil/notification";
import { createPost, updatePost } from "@/api/post";
import Notification from "./Notification";
import { ClipLoader } from "react-spinners";
import { BiArrowBack } from "react-icons/bi";

type Props = {
  title: string;
  tagList: string[];
  content: string;
  initTopic?: string;
  onClose: () => void;
  nick_name: string;
  file?: string;
};

const aboutList = [
  { name: "세부 카테고리를 선택해주세요", value: "" },
  { name: "Introduce", value: "introduce" },
  { name: "Rule", value: "rule" },
  { name: "Schedule", value: "schedule" },
  { name: "Notice", value: "notice" },
];

const communityList = [
  { name: "세부 카테고리를 선택해주세요", value: "" },
  { name: "QnA", value: "qna" },
  { name: "Information", value: "information" },
];

const projectList = [
  { name: "세부 카테고리를 선택해주세요", value: "" },
  { name: "Project", value: "project" },
  { name: "Patchnote", value: "patch" },
];

const selectCategoryList = [
  { category: "introduce", path: "about", categoryList: aboutList },
  { category: "rule", path: "about", categoryList: aboutList },
  { category: "schedule", path: "about", categoryList: aboutList, route: "/about/schedule" },
  { category: "notice", path: "about", categoryList: aboutList, route: "/about/notice" },
  { category: "qnq", path: "community", categoryList: communityList },
  { category: "information", path: "community", categoryList: communityList },
  { category: "project", path: "project", categoryList: projectList },
  { category: "patchnote", path: "project", categoryList: projectList },
];

export default function EditModal({ title, file, initTopic, tagList, content, onClose, nick_name }: Props) {
  const searchParams = useSearchParams();
  const params = useParams();
  const categoryQuery = searchParams?.get("category");
  const selectCategory = selectCategoryList.find((item) => item.category === categoryQuery);
  const [categoryList, setCategoryList] = useState<{ name: string; value: string }[] | []>(
    selectCategory?.categoryList ?? []
  );
  const [path, setPath] = useState<string>(selectCategory?.path ?? "");
  const [category, setCategory] = useState<string>(categoryQuery ?? "");
  const [topic, setTopic] = useState(initTopic ?? "");
  const setNotification = useSetRecoilState(notificationAtom);
  const [isPending, startTrasition] = useTransition();
  const router = useRouter();

  const handlePathChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPath = e.target.value;
    setPath(newPath);
    setCategory("");
    setCategoryList(selectCategoryList.find((item) => item.path === newPath)?.categoryList ?? []);
  };

  const handleTopic = (value: string) => {
    setTopic(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [tagF = "", tagS = "", tagT = ""] = tagList;
    if (!nick_name) {
      setNotification({ notificationType: "Warning", message: "작성권한이 없습니다.", type: "warning" });

      return;
    } else if (category.trim() === "") {
      setNotification({ notificationType: "Warning", message: "카테고리를 선택해주세요.", type: "warning" });

      return;
    }

    let result: any | string;
    try {
      const post = {
        title,
        content,
        tagF,
        tagS,
        tagT,
        file,
        category,
        topic,
      };
      console.log("check", post);
      const postId = params?.id;
      if (postId) {
        result = await updatePost(post, postId as string);
      } else {
        result = await createPost(post);
      }
      console.log("result", result);
      if (!result.content || typeof result === "string") {
        setNotification({ notificationType: "Warning", message: result, type: "warning" });

        return;
      } else {
        const content = result.content;
        startTrasition(() => {
          if (category === "project") {
            router.replace(`/${category}/${content.id}`);
          } else {
            router.replace(`/${path}/${category}/${content.id}`);
          }
        });
      }
    } catch (err) {
      console.log(err);
      setNotification({
        notificationType: "Warning",
        message: "글 저장 과정에서 에러가 발생했습니다.",
        type: "warning",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-8 max-w-4xl h-full my-auto flex flex-col  justify-center">
      <h4 className="text-lg mb-3 md:mb-6 font-extrabold py-4 border-b-2 border-b-black">상세 설정</h4>

      <p className="text-2xl md:text-3xl mb-4 whitespace-nowrap  overflow-hidden  text-ellipsis  font-semibold">
        {title}
      </p>
      <div className="py-4 border-y ">
        <label htmlFor="category" className="block mb-2">
          카테고리
        </label>
        <SelectIinput
          id="category"
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
        <div className="py-4 border-y">
          <label htmlFor="detail-category" className="block mb-2">
            세부 카테고리
          </label>
          <SelectIinput
            id="detail-category"
            onChange={(e) => setCategory(e.target.value)}
            valueList={categoryList}
            currentValue={category}
          />
        </div>
      )}
      {(category === "qna" || category === "information") && (
        <div className="py-4 border-y">
          <label htmlFor="detail-category" className="block mb-2">
            토픽
          </label>
          {category === "qna" && <EditTopic category={category} topic={topic} onChange={handleTopic} />}
          {category === "information" && <EditTopic category={category} topic={topic} onChange={handleTopic} />}
        </div>
      )}
      <div className="flex items-center justify-between mt-4">
        <button
          type="button"
          onClick={() => onClose()}
          className="h-10 text-lg inline-flex items-center justify-center font-semibold outline-none border-none bg-none hover:bg-zinc-200 px-5 bg-newt rounded-sm "
        >
          <BiArrowBack className="mr-1" />
          뒤로가기
        </button>
        {category.trim() !== "" &&
          !(category === "qna" && topic.trim() === "") &&
          (isPending ? (
            <div className="h-10 text-lg inline-flex items-center justify-center font-bold outline-none border-none px-5 bg-import-color text-white rounded-sm ">
              <ClipLoader size={20} className="mr-1" /> 저장하기
            </div>
          ) : (
            <button
              disabled={isPending}
              type="submit"
              className="h-10 text-lg inline-flex items-center justify-center font-bold cursor-pointer outline-none border-none px-5 bg-import-color text-white rounded-sm hover:bg-green-400"
            >
              저장하기
            </button>
          ))}
      </div>
    </form>
  );
}
