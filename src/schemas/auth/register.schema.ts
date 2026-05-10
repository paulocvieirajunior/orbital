import { z } from "zod"

export const registerSchema = z.object({
  email: z.string().email("O e-mail inserido é inválido").trim().toLowerCase(),
  username: z
    .string()
    .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
    .max(16, "O nome de usuário deve ter no máximo 16 caracteres")
    .trim()
    .toLowerCase()
    .regex(
      /^[a-z0-9_.-]+$/,
      "O nome de usuário deve conter apenas letras, números, sublinhados, hifens e pontos"
    ),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .max(64, "A senha deve ter no máximo 64 caracteres"),
})

export type RegisterSchema = z.infer<typeof registerSchema>
