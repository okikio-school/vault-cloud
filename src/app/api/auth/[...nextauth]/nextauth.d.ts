import type { User as OldUser, DefaultJWT } from "next-auth"
import type { users } from "@/db/schema.ts"
import NextAuth from "next-auth"

declare module "next-auth" {
  type NewUser = typeof users.$inferSelect

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: NewUser["userId"] | null,
      name: NewUser["name"] | null,
      email: NewUser["email"] | null,
      image: NewUser["image"] | null,
      bio: NewUser["bio"] | null,
      license: NewUser["license"],
    } & NewUser;
    accessToken: string;
  }

  interface User extends NewUser {
    id: NewUser["userId"] | null,
    name: NewUser["name"] | null,
    email: NewUser["email"] | null,
    image: NewUser["image"] | null,
    bio: NewUser["bio"] | null,
    license: NewUser["license"]
  }

  interface JWT extends DefaultJWT {
    license: string
  }
}