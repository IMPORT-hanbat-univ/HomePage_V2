import { atom, useRecoilState } from "recoil";
import FakeNoticeClient from "../api/Notice/FakeNoticeClient";
import Notice from "../api/Notice/Notice";
import NoticeClient from "@/api/Notice/NoticeClient";

export const noticeAtom = atom({
  key: "noticeAtom",
  default: new Notice(new NoticeClient()),
  dangerouslyAllowMutability: true,
});

export const useNoticeApi = () => {
  const [notice, setNotice] = useRecoilState(noticeAtom);
  return notice;
};
