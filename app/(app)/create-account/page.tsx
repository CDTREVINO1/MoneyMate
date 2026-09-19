import { headers as getHeaders } from "next/headers.js"
import { redirect } from "next/navigation"
import { getPayload } from "payload"

import { RenderParams } from "../_components/RenderParams"
import config from "../../../payload.config"
import { CreateAccountForm } from "./CreateAccountForm"

export default async function CreateAccount() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(
      `/account?message=${encodeURIComponent(
        "Cannot create a new account while logged in, please log out and try again."
      )}`
    )
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-center p-6">
      <RenderParams />
      <CreateAccountForm />
      </div>
    </div>
  )
}
