// pages/api/auth/token.ts (same as before)
import type { NextApiRequest, NextApiResponse } from "next";
import type { AuthOptions } from "next-auth";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/_options";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions as unknown as AuthOptions);
  if (session) {
    res.status(200).json({ token: session.accessToken });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
