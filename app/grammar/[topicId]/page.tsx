import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { GrammarLessonView } from "@/components/grammar-lesson-view"
import { getTopicById } from "@/lib/grammar-data"

interface Props {
  params: Promise<{ topicId: string }>
}

export default async function GrammarTopicPage({ params }: Props) {
  const { topicId } = await params
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login")
  }

  const topic = getTopicById(topicId)
  
  if (!topic) {
    notFound()
  }

  const { data: progress } = await supabase
    .from("grammar_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("topic_id", topicId)
    .single()

  return (
    <AppLayout>
      <GrammarLessonView 
        topic={topic} 
        userId={user.id}
        initialProgress={progress}
      />
    </AppLayout>
  )
}
