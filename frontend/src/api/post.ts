import getClientCookie from "@/util/getClientCookie";
import { CreateComment, CreatePost, PostDetailType, SimplePost } from "@/util/type";

export async function getPostList(category: string): Promise<SimplePost[] | string | null> {
  try {
    const result = await fetch(`http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/post?category=${category}`, {
      method: "GET",
      credentials: "include",
      next: {
        revalidate: 0,
      },
    });
    const data = await result.json();
    return data.item as SimplePost[] | [];
  } catch (err: any) {
    console.log(err);
    return "공지사항 목록을 불러오는 도중 발생한 에러!!";
  }
}

export async function getPostDetail(category: string, id: number) {
  let error;

  let data: PostDetailType | string = "";
  try {
    const result = await fetch(`http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/post/${id}?category=${category}`, {
      method: "GET",
      credentials: "include",
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

export async function deletePost(category: string, postId: number, accessToken: string): Promise<boolean | string> {
  try {
    const result = await fetch(
      `http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/post/deleted/${postId}?category=${category}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          accessToken,
        },
      }
    );
    return true;
  } catch (err: any) {
    console.log(err);
    return "삭제과정에서 에러가 발생했습니다.";
  }
}

export async function createPost(post: CreatePost): Promise<boolean | string> {
  try {
    const accessToken = getClientCookie("accessToken");

    const result = await fetch(`http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/post/edit`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        accessToken,
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

export async function updatePost(post: CreatePost, postId: string): Promise<boolean | string> {
  try {
    const accessToken = getClientCookie("accessToken");

    const result = await fetch(`http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/post/edit/${postId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        accessToken,
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

export async function createPostComment(
  post: CreateComment,
  accessToken: string,

  postId: string
): Promise<boolean | string> {
  try {
    console.log("createNotice", post);
    const result = await fetch(
      `http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/post/comment/${postId}
    `,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          accessToken,
        },
        body: JSON.stringify(post),
      }
    );

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

export async function updatePostComment(
  post: CreateComment,
  accessToken: string,

  postId: string | number,
  commentId: number | string
): Promise<boolean | string> {
  try {
    const result = await fetch(
      `http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/post/comment/${postId}/${commentId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          accessToken,
        },
        body: JSON.stringify(post),
      }
    );

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

export async function deletePostComment(
  postId: number | string,
  commentId: number | string,
  category: string,
  accessToken: string
): Promise<boolean | string> {
  try {
    const result = await fetch(
      `http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/post/deleted/${postId}/${commentId}?category=${category}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accessToken,
        },
      }
    );
    return true;
  } catch (err: any) {
    console.log(err);
    return "삭제과정에서 에러가 발생했습니다.";
  }
}

export async function updateAdminPost(post: CreatePost, postId: string): Promise<boolean | string> {
  try {
    const accessToken = getClientCookie("accessToken");

    const result = await fetch(`http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/admin/post/edit/${postId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        accessToken,
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

export async function deleteAdminPost(
  category: string,
  postId: number,
  accessToken: string
): Promise<boolean | string> {
  try {
    const result = await fetch(
      `http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/admin/deleted/${postId}?category=${category}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          accessToken,
        },
      }
    );
    return true;
  } catch (err: any) {
    console.log(err);
    return "삭제과정에서 에러가 발생했습니다.";
  }
}
