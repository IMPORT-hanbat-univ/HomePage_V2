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

export type Notice = {
  id: number;
  title: string;
  nick_name: string;
  createAt: Date | string;
};

export type PostDetailType = {

  content: {
    id: number;
    title: string;
    content: string;
    nick_name: string;
    createdAt: Date;
    updatedAt: Date;
  };
  comment: {
    id: number;
    content: string;
    group: number; //모댓글의 순서, 0부터
    sequence: number; //대댓글속 순서, 0부터, 모댓글은 이 값을 널값으로 갖는다.,
    userKakaoId: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
} 
