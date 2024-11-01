// pages/api/auth/token.ts (same as before)
import type { NextApiRequest, NextApiResponse } from "next";
import type { AuthOptions } from "next-auth";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/_options";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions as unknown as AuthOptions);
  if (session) {
    // res.status(200).json({ token: session.accessToken });
    return Response.json({ token: session.accessToken }, { status: 200 });
  } else {
    // res.status(401).json({ message: "Unauthorized" });
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
