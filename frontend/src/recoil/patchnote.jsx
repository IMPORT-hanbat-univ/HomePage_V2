import FakePatchnoteClient from "@/api/patchnote/FakePatchnoteClient";
import Patchnote from "@/api/patchnote/patchnote";
import { atom, useRecoilState } from "recoil";

export const patchnoteAtom = atom({
  key: "patchnoteAtom",
  default: new Patchnote(new FakePatchnoteClient()),
  dangerouslyAllowMutability: true,
});

export const usePatchnoteApi = () => {
  const [patchnote, setPatchnote] = useRecoilState(patchnoteAtom);
  return patchnote;
};
