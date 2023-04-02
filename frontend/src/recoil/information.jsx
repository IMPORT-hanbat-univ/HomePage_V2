import FakeInformationClient from "@/api/Info/FakeInformationClient";
import Information from "@/api/Info/Information";
import { atom, useRecoilState } from "recoil";


export const informationAtom = atom({
  key: "informationAtom",
  default: new Information(new FakeInformationClient()),
});

export const useInformationApi = () => {
  const [information, setInformation] = useRecoilState(informationAtom);
  return information;
};