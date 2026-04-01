import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { ChatInterface } from "@/components/chat-interface"

export default async function ChatPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login")
  }

  return (
    <AppLayout>
      <ChatInterface userId={user.id} />
    </AppLayout>
  )
}
