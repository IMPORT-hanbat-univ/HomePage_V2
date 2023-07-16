import getClientCookie from "@/util/getClientCookie";
import { CreatePost, PostDetailType } from "@/util/type";

export async function getPostDetail(category: string, id: number) {
  let error;

  let data: PostDetailType | string = "";
  try {
    const result = await fetch(`http://${process.env.NETWORK_BACK_NODE_ADRESS}:4000/post/${id}?category=${category}`, {
      method: "GET",
      next: {
        revalidate: 0,
      },
      cache: "no-store",
    });

    const contentType = result.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await result.json();
    } else {
      data = await result.text();
    }
  } catch (err: any) {
    console.log(err);
    error = err || "공지사항 글을 가져오는 도중 발생한 에러!";
  } finally {
    return { data, error };
  }
}

export async function createPost(post: CreatePost): Promise<boolean | string> {
  try {
    const accessToken = getClientCookie("accessToken");
    const refreshToken = getClientCookie("refreshToken");
    console.log("token", accessToken, refreshToken);
    const result = await fetch("http://localhost:4000/post/edit", {
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

export async function updateNotice(post: CreatePost, postId: string): Promise<boolean | string> {
  try {
    const accessToken = getClientCookie("accessToken");
    const refreshToken = getClientCookie("refreshToken");
    console.log("token", accessToken, refreshToken);
    const result = await fetch(`http://localhost:4000/post/edit/${postId}`, {
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
