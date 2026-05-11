"use client"

import { FieldInput } from "@/components/forms/FieldInput"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FieldSet } from "@/components/ui/field"
import { registerSchema, RegisterSchema } from "@/schemas/auth"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"

export function RegisterForm() {
  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })
  const router = useRouter()

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await axios.post("/api/register", data)
      router.push("/app")
    } catch (err) {
      const error = err as AxiosError<ApiError>

      if (error.response?.status === 409) {
        toast("O e-mail ou nome de usuário não está disponível", {
          position: "top-center",
        })
      } else {
        toast("Ocorreu um erro ao criar a sua conta", {
          position: "top-center",
        })
      }
    }
  }

  return (
    <Card size="default" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Crie a sua conta</CardTitle>
        <CardDescription>
          Insira suas informações para criar uma nova conta
        </CardDescription>
      </CardHeader>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CardContent>
            <FieldSet>
              <FieldInput<RegisterSchema>
                name="username"
                type="text"
                placeholder="Crie um nome de usuário"
                label="Nome de usuário"
              />
              <FieldInput<RegisterSchema>
                name="email"
                type="email"
                placeholder="Insira seu melhor e-mail"
                label="E-mail"
              />
              <FieldInput<RegisterSchema>
                name="password"
                type="password"
                placeholder="Crie uma senha forte"
                label="Senha"
              />
            </FieldSet>
          </CardContent>
          <CardFooter className="flex-col gap-2 pt-8">
            <Button type="submit" className="w-full">
              Criar conta
            </Button>
            <Button className="w-full" variant="link" asChild>
              <Link href="/login">Entrar em uma conta</Link>
            </Button>
          </CardFooter>
        </form>
      </FormProvider>
    </Card>
  )
}
