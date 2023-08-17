import { DetailUser } from "@/util/type";

export async function userWithdraw(
  userId: number,
  accessToken: string,
  refreshToken: string
): Promise<boolean | string> {
  try {
    const result = await fetch(
      `http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/admin/userManagement/withdrawal/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accessToken,
          refreshToken,
        },
      }
    );
    return true;
  } catch (err: any) {
    console.log(err);
    return "유저 탈퇴 과정에서 에러가 발생했습니다.";
  }
}

export async function userUpdate(userId: number, user: DetailUser, accessToken: string, refreshToken: string) {
  try {
    const result = await fetch(
      `http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/admin/userManagement/userdata/${userId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          accessToken,
          refreshToken,
        },
        body: JSON.stringify(user),
      }
    );
    return result;
  } catch (err: any) {
    console.log(err);
    return "유저 정보 수정 과정에서 에러가 발생했습니다.";
  }
}

export async function usersLevelUpdate(
  users: { userId: number; rank: number; requestRank?: number }[],
  accessToken: string,
  refreshToken: string,
  page: string
) {
  try {
    const result = await fetch(
      `http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/admin/rankManagement/changeRank?page=${page}`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ changeRanks: users }),
        headers: {
          "Content-Type": "application/json",
          accessToken,
          refreshToken,
        },
      }
    );
    return result;
  } catch (err: any) {
    console.log(err);
    return "유저 레벨 수정 과정에서 에러가 발생했습니다.";
  }
}

/** 유저 랭크변경 요청 반려 */
export async function userRankReject(
  userId: number,
  accessToken: string,
  refreshToken: string
): Promise<boolean | string> {
  try {
    const result = await fetch(
      `http://${process.env.NEXT_PUBLIC_BACK_NODE_ADRESS}/admin/rankManagement/reject/${userId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          accessToken,
          refreshToken,
        },
      }
    );
    return true;
  } catch (err: any) {
    console.log(err);
    return "유저 탈퇴 과정에서 에러가 발생했습니다.";
  }
}
