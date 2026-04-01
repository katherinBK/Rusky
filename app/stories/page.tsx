import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { StoryList } from "@/components/story-list"
import { stories } from "@/lib/story-data"

export default async function StoriesPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login")
  }

  const { data: progress } = await supabase
    .from("story_progress")
    .select("*")
    .eq("user_id", user.id)

  return (
    <AppLayout>
      <div className="p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Story Reading</h1>
          <p className="text-muted-foreground">
            Immerse yourself in Russian through graded stories with translations
          </p>
        </div>
        <StoryList stories={stories} progress={progress || []} />
      </div>
    </AppLayout>
  )
}
