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
import { loginSchema, LoginSchema } from "@/schemas/auth"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const methods = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) })
  const router = useRouter()

  const onSubmit = async (data: LoginSchema) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result.error) {
        toast("As informações inseridas são inválidas", {
          position: "top-center",
        })

        return
      }

      router.push("/app")
    } catch {
      toast("Ocorreu um erro ao entrar na sua conta", {
        position: "top-center",
      })
    }
  }

  return (
    <Card size="default" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Entre na sua conta</CardTitle>
        <CardDescription>
          Insira suas informações para entrar em uma conta existente
        </CardDescription>
      </CardHeader>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CardContent>
            <FieldSet>
              <FieldInput<LoginSchema>
                name="email"
                type="email"
                placeholder="Insira seu e-mail"
                label="E-mail"
              />
              <FieldInput<LoginSchema>
                name="password"
                type="password"
                placeholder="Insira sua senha"
                label="Senha"
              />
            </FieldSet>
          </CardContent>
          <CardFooter className="flex-col gap-2 pt-8">
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <Button className="w-full" variant="link" asChild>
              <Link href="/register">Criar conta</Link>
            </Button>
          </CardFooter>
        </form>
      </FormProvider>
    </Card>
  )
}
