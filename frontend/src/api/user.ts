export async function withdrawUser(
  userId: number,
  accessToken: string,
  refreshToken: string
): Promise<boolean | string> {
  try {
    const result = await fetch(`http://localhost:4000/admin/userManagement/Withdrawal/${userId}`, {
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
