import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { StoryReader } from "@/components/story-reader"
import { getStoryById } from "@/lib/story-data"

interface Props {
  params: Promise<{ storyId: string }>
}

export default async function StoryPage({ params }: Props) {
  const { storyId } = await params
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login")
  }

  const story = getStoryById(storyId)
  
  if (!story) {
    notFound()
  }

  const { data: progress } = await supabase
    .from("story_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("story_id", storyId)
    .single()

  return (
    <AppLayout>
      <StoryReader 
        story={story} 
        userId={user.id}
        initialProgress={progress}
      />
    </AppLayout>
  )
}
