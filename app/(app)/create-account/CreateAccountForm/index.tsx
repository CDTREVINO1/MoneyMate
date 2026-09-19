"use client"

import React, { useCallback, useRef, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Controller, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { Message } from "../../_components/Message"
import { useAuth } from "../../_providers/Auth"

type FormData = {
  email: string
  password: string
  passwordConfirm: string
}

export const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ""
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const form = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  })

  const password = useRef({})
  password.current = form.watch("password", "")

  const onSubmit = useCallback(
    async (data: FormData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`,
        {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      )

      if (!response.ok) {
        const message =
          response.statusText || "There was an error creating the account."
        setError(message)
        return
      }

      const redirect = searchParams.get("redirect")

      const timer = setTimeout(() => {
        setLoading(true)
      }, 1000)

      try {
        await login(data)
        clearTimeout(timer)
        if (redirect) {
          router.push(redirect)
        } else {
          router.push(
            `/account?success=${encodeURIComponent("Account created successfully")}`
          )
        }
      } catch (_) {
        clearTimeout(timer)
        setError(
          "There was an error with the credentials provided. Please try again."
        )
      }
    },
    [login, router, searchParams]
  )

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription>
          <p>
            {`This is where new customers can signup and create a new account. To manage all users, `}
            <Link
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/users`}
            >
              login to the admin dashboard
            </Link>
            .
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-create-user"
          className="w-full sm:max-w-md"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Message error={error} />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-create-user-email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-create-user-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-create-user-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-create-user-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Password"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="passwordConfirm"
              control={form.control}
              rules={{
                validate: (value) => {
                  const password = form.getValues("password")
                  return value === password || "The passwords do not match"
                },
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-create-user-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-create-user-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Password"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              className="cursor-pointer"
              label={loading ? "Processing" : "Create Account"}
              disabled={form.formState.isLoading}
              type="submit"
            >
              Create Account
            </Button>
            <div>
              {"Already have an account? "}
              <Link href={`/login${allParams}`}>Login</Link>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
