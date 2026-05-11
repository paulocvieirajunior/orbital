import { prisma } from "@/lib/prisma"
import { registerSchema } from "@/schemas/auth"
import { hash } from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const { data, success, error } = registerSchema.safeParse(body)

  if (!success) {
    return NextResponse.json(
      { error: error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const user = await prisma.user.findFirst({
    where: { OR: [{ email: data.email }, { username: data.username }] },
  })

  if (user) {
    return NextResponse.json(
      { error: "Este e-mail ou nome de usuário já está em uso." },
      { status: 409 }
    )
  }
  const hashedPassword = await hash(data.password, 10)

  await prisma.user.create({ data: { ...data, password: hashedPassword } })

  return NextResponse.json(
    { success: "Usuário criado com sucesso." },
    { status: 201 }
  )
}
