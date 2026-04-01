import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AppLayout } from "@/components/app-layout"
import { VoiceCallInterface } from "@/components/voice-call-interface"

export const metadata = {
  title: "Voice Call - Rusky",
  description: "Practice Russian with live voice conversations",
}

export default async function CallPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <AppLayout>
      <VoiceCallInterface userId={user.id} />
    </AppLayout>
  )
}
