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
  userId: number;
  nick_name: string;
  rank: number;
  kakaoId: string;
};

export type SimplePost = {
  id: number;
  title: string;
  nick_name: string;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  category: string;
  tagF: string;
  rank: number;
  tagS: string;
  tagT: string;
  file?: string;
  topic?: string;
};

export interface PostDetailType {
  content: {
    id: number;
    title: string;
    content: string;
    tagF: string;
    tagS: string;
    tagT: string;
    nick_name: string;
    userId: number;
    rank?: number;
    topic?: string;
    createdAt: Date;
    updatedAt: Date;
  };
  comment: Comment[];
}

export interface CreatePost {
  title: string;
  content: string;
  existingCategory?: string;
  tagF?: string;
  tagS?: string;
  category: string;
  tagT?: string;
  topic: string;
}

export interface CreateComment {
  group: null | number;
  category: string;
  sequence: number;
  content: string | number;
}

export type Comment = {
  id: number | string;
  content: string;
  group: number; //모댓글의 순서, 0부터
  sequence: number; //대댓글속 순서, 0부터, 모댓글은 이 값을 널값으로 갖는다.,
  userKakaoId?: number;
  createdAt?: Date;
  nick_name?: string;
  updatedAt?: Date;
  userId?: number;
  rank: number;
};

export type QnASimplePost = SimplePost & { numberOfComments: number; content: string };

export type DetailUser = {
  // id 는 테스트용 임시
  //id: number;
  userId: number;
  nick_name: string;
  createdAt: Date;
  email: string;
  rank: number;
  profileImg?: string | null;
  requestRank?: number;
  department?: string;
  grade?: string;
  blog?: string;
  github_url?: string;
  framework?: string;
  language?: string;
};
