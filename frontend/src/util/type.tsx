import { NOTIFICATION_TYPE } from "react-notifications-component";

export type EmailFormData = {
  emailAdress: string;
  subject: string;
  message: string;
};

export type NotificationType = {
  notificationType: string | null;
  message: string | null;
  type: NOTIFICATION_TYPE | undefined;
};

export type DecodeUser = {
  nick_name: string;
};
