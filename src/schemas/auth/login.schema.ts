import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("O e-mail inserido é inválido").trim().toLowerCase(),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .max(64, "A senha deve ter no máximo 64 caracteres"),
})

export type LoginSchema = z.infer<typeof loginSchema>
