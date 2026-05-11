import type { DefaultSession } from "next-auth"
import type { UserRole } from "@prisma/client"
import type { JWT as DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    role: UserRole
  }

  interface Session {
    user: {
      role: UserRole
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    sub: string
    email: string
    role: UserRole
  }
}
