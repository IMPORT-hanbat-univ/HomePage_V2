import { atom, useRecoilState } from "recoil";
import FakeQnAClient from "@/api/QnA/FakeQnAClient";
import QnA from "@/api/QnA/QnA";

export const qnaAtom = atom({
  key: "qnaAtom",
  dangerouslyAllowMutability: true,

  default: new QnA(new FakeQnAClient()),
});

export const useQnAApi = () => {
  const [qna, setQna] = useRecoilState(qnaAtom);
  return qna;
};
