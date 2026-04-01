import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { DashboardContent } from "@/components/dashboard-content"

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const { data: grammarProgress } = await supabase
    .from("grammar_progress")
    .select("*")
    .eq("user_id", user.id)

  const { data: storyProgress } = await supabase
    .from("story_progress")
    .select("*")
    .eq("user_id", user.id)

  const { data: achievements } = await supabase
    .from("achievements")
    .select("*")
    .eq("user_id", user.id)

  return (
    <AppLayout>
      <DashboardContent 
        profile={profile}
        grammarProgress={grammarProgress || []}
        storyProgress={storyProgress || []}
        achievements={achievements || []}
      />
    </AppLayout>
  )
}
