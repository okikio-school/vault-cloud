import type { User as OldUser, DefaultJWT, Account } from "next-auth"
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
      license: NewUser["license"] | null,
    } & NewUser;
    access_token: string;
  }

  interface User extends NewUser {
    id: NewUser["userId"] | null,
    name: NewUser["name"] | null,
    email: NewUser["email"] | null,
    image: NewUser["image"] | null,
    bio: NewUser["bio"] | null,
    license: NewUser["license"] | null
  }
}


declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId: NewUser["userId"] | null;
    name: NewUser["name"] | null;
    email: NewUser["email"] | null;
    image: NewUser["image"] | null;
    bio: NewUser["bio"] | null;
    license: NewUser["license"] | null;
    access_token: Account['access_token'] | null;
  }
}