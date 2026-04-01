"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { GrammarTopic } from "@/lib/grammar-data"
import { CheckCircle2, Circle, BookOpen } from "lucide-react"

interface GrammarTopicListProps {
  topics: GrammarTopic[]
  progress: Array<{ topic_id: string; completed: boolean; score: number }>
}

export function GrammarTopicList({ topics, progress }: GrammarTopicListProps) {
  const getTopicProgress = (topicId: string) => {
    const topicProgress = progress.find((p) => p.topic_id === topicId)
    return topicProgress
  }

  const difficultyColors = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {topics.map((topic) => {
        const topicProgress = getTopicProgress(topic.id)
        const isCompleted = topicProgress?.completed
        const score = topicProgress?.score || 0
        const totalLessons = topic.lessons.length

        return (
          <Link key={topic.id} href={`/grammar/${topic.id}`}>
            <Card className="h-full hover:shadow-lg transition-all border-2 hover:border-primary/20 cursor-pointer group">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {topic.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">
                      {topic.titleRu}
                    </p>
                  </div>
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                  ) : topicProgress ? (
                    <Circle className="w-5 h-5 text-primary shrink-0" />
                  ) : null}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription>{topic.description}</CardDescription>
                <div className="flex items-center justify-between">
                  <Badge className={difficultyColors[topic.difficulty]}>
                    {topic.difficulty}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {totalLessons} {totalLessons === 1 ? "lesson" : "lessons"}
                  </span>
                </div>
                {topicProgress && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>{score}%</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
