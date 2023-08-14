import { DetailUser } from "@/util/type";

export async function userWithdraw(
  userId: number,
  accessToken: string,
  refreshToken: string
): Promise<boolean | string> {
  try {
    const result = await fetch(`http://localhost:4000/admin/userManagement/withdrawal/${userId}`, {
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
    return "유저 탈퇴 과정에서 에러가 발생했습니다.";
  }
}

export async function userUpdate(userId: number, user: DetailUser, accessToken: string, refreshToken: string) {
  try {
    const result = await fetch(`http://localhost:4000/admin/userMangement/userdata/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accessToken,
        refreshToken,
      },
      body: JSON.stringify(user),
    });
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
    const result = await fetch(`http://localhost:4000/admin/rankManagement/changeRank?page=${page}`, {
      method: "POST",
      body: JSON.stringify({ changeRanks: users }),
      headers: {
        "Content-Type": "application/json",
        accessToken,
        refreshToken,
      },
    });
    return result;
  } catch (err: any) {
    console.log(err);
    return "유저 레벨 수정 과정에서 에러가 발생했습니다.";
  }
}

export async function userRankReject(
  userId: number,
  accessToken: string,
  refreshToken: string
): Promise<boolean | string> {
  try {
    const result = await fetch(`http://localhost:4000//admin/rankManagement/reject/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accessToken,
        refreshToken,
      },
    });
    return true;
  } catch (err: any) {
    console.log(err);
    return "유저 탈퇴 과정에서 에러가 발생했습니다.";
  }
}
