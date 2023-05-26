import { CreatePost, Notice, PostDetailType } from "@/util/type";

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

export async function getNoticeDetail(id: number) {
  try {
    console.log(`http://${process.env.NETWORK_BACK_NODE_ADRESS}:4000/about/notice/${id}`);
    console.log("123");
    const result = await fetch(`http://${process.env.NETWORK_BACK_NODE_ADRESS}:4000/about/notice/${id}`, {
      method: "GET",
      next: {
        revalidate: 0,
      },
      cache: "no-store",
    });
    let data: any;
    const contentType = result.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await result.json();
    } else {
      data = await result.text();
    }
    console.log("data", data);
    return (data as PostDetailType | []) || (data as string);
  } catch (err: any) {
    console.log(err);
    return "공지사항 글을 가져오는 도중 발생한 에러!";
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
