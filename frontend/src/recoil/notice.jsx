import { atom, useRecoilState } from "recoil";
import FakeNoticeClient from "../api/Notice/FakeNoticeClient";
import Notice from "../api/Notice/Notice";

export const noticeAtom = atom({
  key: "noticeAtom",
  default: new Notice(new FakeNoticeClient()),
  dangerouslyAllowMutability: true,
});

export const useNoticeApi = () => {
  const [notice, setNotice] = useRecoilState(noticeAtom);
  return notice;
};
