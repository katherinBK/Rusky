import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { GrammarTopicList } from "@/components/grammar-topic-list"
import { grammarTopics } from "@/lib/grammar-data"

export default async function GrammarPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login")
  }

  const { data: progress } = await supabase
    .from("grammar_progress")
    .select("*")
    .eq("user_id", user.id)

  return (
    <AppLayout>
      <div className="p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Grammar Review</h1>
          <p className="text-muted-foreground">
            Master Russian grammar through interactive lessons and exercises
          </p>
        </div>
        <GrammarTopicList 
          topics={grammarTopics} 
          progress={progress || []} 
        />
      </div>
    </AppLayout>
  )
}
