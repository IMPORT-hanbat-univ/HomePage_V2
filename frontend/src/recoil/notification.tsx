import { NotificationType } from "@/util/type";
import { atom } from "recoil";

export const notificationAtom = atom<NotificationType>({
  key: "notificationAtom",
  default: {
    notificationType: null,
    message: null,
    type: undefined,
  },
});
