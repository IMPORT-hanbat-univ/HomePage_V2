import { CreateComment, CreatePost, Notice, PostDetailType } from "@/util/type";

export async function getNoticeList(): Promise<Notice[] | string | null> {
  try {
    const result = await fetch(`http://localhost:4000/about/notice`, {
      method: "GET",
      next: {
        revalidate: 0,
      },
    });
    const data = await result.json();
    return data.item as Notice[] | [];
  } catch (err: any) {
    console.log(err);
    return "공지사항 목록을 불러오는 도중 발생한 에러!!";
  }
}


export async function createNotice(
  post: CreatePost,
  accessToken: string,
  refreshToken: string
): Promise<boolean | string> {
  try {
    console.log("createNotice", post);
    const result = await fetch("http://localhost:4000/about/notice/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accessToken,
        refreshToken,
      },
      body: JSON.stringify(post),
    });

    if (result.ok) {
      return result.json();
    } else {
      throw new Error("result ok false");
    }
  } catch (err: any) {
    console.log(err);
    return "글 저장 과정에서 오류가 발생했습니다.";
  }
}

export async function deleteNotice(
  postId: number,
  accessToken: string,
  refreshToken: string
): Promise<boolean | string> {
  try {
    const result = await fetch(`http://localhost:4000/about/notice/post/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accessToken,
        refreshToken,
      },
    });
    return true;
  } catch (err: any) {
    console.log(err);
    return "삭제과정에서 에러가 발생했습니다.";
  }
}

export async function updateNotice(
  post: CreatePost,
  postId: number,
  accessToken: string,
  refreshToken: string
): Promise<boolean | string> {
  try {
    console.log("createNotice", post);
    const result = await fetch(`http://localhost:4000/about/notice/post/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accessToken,
        refreshToken,
      },
      body: JSON.stringify(post),
    });

    if (result.ok) {
      return result.json();
    } else {
      throw new Error("result ok false");
    }
  } catch (err: any) {
    console.log(err);
    return "글 수정 과정에서 오류가 발생했습니다.";
  }
}

export async function createNoticeComment(
  post: CreateComment,
  accessToken: string,
  refreshToken: string,
  postId: string
): Promise<boolean | string> {
  try {
    console.log("createNotice", post);
    const result = await fetch(`http://localhost:4000/about/notice/comment/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accessToken,
        refreshToken,
      },
      body: JSON.stringify(post),
    });

    if (result.ok) {
      return result.json();
    } else {
      throw new Error("result ok false");
    }
  } catch (err: any) {
    console.log(err);
    return "댓글 저장 과정에서 오류가 발생했습니다.";
  }
}

export async function updateNoticeComment(
  post: CreateComment,
  accessToken: string,
  refreshToken: string,
  postId: string | number,
  commentId: number
): Promise<boolean | string> {
  try {
    const result = await fetch(`http://localhost:4000/about/notice/comment/${postId}/${commentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accessToken,
        refreshToken,
      },
      body: JSON.stringify(post),
    });

    if (result.ok) {
      return result.json();
    } else {
      throw new Error("result ok false");
    }
  } catch (err: any) {
    console.log(err);
    return "댓글 수정 과정에서 오류가 발생했습니다.";
  }
}

export async function deleteNoticeComment(
  postId: number | string,
  commentId: number,
  accessToken: string,
  refreshToken: string
): Promise<boolean | string> {
  try {
    const result = await fetch(`http://localhost:4000/about/notice/post/${postId}/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accessToken,
        refreshToken,
      },
    });
    return true;
  } catch (err: any) {
    console.log(err);
    return "삭제과정에서 에러가 발생했습니다.";
  }
}
