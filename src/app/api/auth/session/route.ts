import { getToken } from "next-auth/jwt";

// Get raw encrypted session token to save for future requests
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
    raw: true
  });

  if (token) {
    return Response.json({ token }, { status: 200 });
  } else {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
