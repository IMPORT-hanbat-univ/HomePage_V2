import FakeQnAClient from "@/api/QnA/FakeQnAClient";
import QnA from "@/api/QnA/QnA";
import { createContext, useContext } from "react";

export const QnAContext = createContext();
const fakeQnAClient = new FakeQnAClient();
const qna = new QnA(fakeQnAClient);
console.log("qna", qna);
export function QnAContextProvider({ children }) {
  return <QnAContext.Provider value={qna}>{children}</QnAContext.Provider>;
}

export const useQnAApi = () => useContext(QnAContext);
