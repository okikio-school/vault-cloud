
import { getToken } from "next-auth/jwt";

// Get users details use Authorization Bearer Token
export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") ?? "";
  const token = await getToken({
    // @ts-ignore
    req: {
      headers: Object.fromEntries(req.headers),
      cookies: Object.fromEntries(
        Array.from(
          cookie.trim().split(";"), 
          (str) => str.trim().split("=")
        )
      ),
    },
  });

  if (token) {
    // res.status(200).json({ token: session.accessToken });
    return Response.json({
      token
    }, { status: 200 });
  } else {
    // res.status(401).json({ message: "Unauthorized" });
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
