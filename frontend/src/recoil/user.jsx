import { atom } from "recoil";

export const userAtom = atom({
  key: "userAtom",
  dangerouslyAllowMutability: true,
  default: null,
});
