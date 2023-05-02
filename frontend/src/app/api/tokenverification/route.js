export async function GET(req, res) {
  console.log("request", req.headers.accessToken);

  if (req.headers.accessToken && req.headers.refreshToken) {
  }
}
