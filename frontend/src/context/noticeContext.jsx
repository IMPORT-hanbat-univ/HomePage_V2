import { createContext, useContext } from "react";
import FakeNoticeClient from "./../api/Notice/FakeNoticeClient";
import Notice from "./../api/Notice/Notice";

export const NoticeContext = createContext();
const fakeNoticeClient = new FakeNoticeClient();
const notice = new Notice(fakeNoticeClient);
console.log("context notice", notice);

export function NoticeContextProvider({ children }) {
  return <NoticeContext.Provider value={notice}>{children}</NoticeContext.Provider>;
}

export const useNoticeApi = () => useContext(NoticeContext);
