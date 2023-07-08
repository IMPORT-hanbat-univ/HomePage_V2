import { PostDetailType } from "@/util/type";

const categoryList = [{ name: "notice", path: "about/notice" }];

export async function getPostDetail(category: string, id: number) {
  let error;
  let path = "";
  let data: PostDetailType | string = "";
  try {
    const categoryObj = categoryList.find((item) => item.name === category);
    if (!categoryObj) {
      throw new Error("해당 카테고리를 찾을 수 없습니다.");
    }
    path = categoryObj.path;
    const result = await fetch(`http://${process.env.NETWORK_BACK_NODE_ADRESS}:4000/${path}/${id}`, {
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
    return { data, error, path };
  }
}
