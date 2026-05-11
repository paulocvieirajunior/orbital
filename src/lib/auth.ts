import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { loginSchema } from "@/schemas/auth"
import { prisma } from "./prisma"

export const { handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },

      async authorize(credentials) {
        const { data, success } = loginSchema.safeParse(credentials)

        if (!success) return null

        const user = await prisma.user.findUnique({
          where: { email: data.email },
        })

        if (!user) return null

        const isPasswordValid = await compare(data.password, user.password)

        if (!isPasswordValid) return null

        const { password, ...userWithoutPassword } = user

        return userWithoutPassword
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub
        session.user.role = token.role
      }

      return session
    },
  },
})
