"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Story } from "@/lib/story-data"
import { CheckCircle2, Clock, BookOpen } from "lucide-react"

interface StoryListProps {
  stories: Story[]
  progress: Array<{ story_id: string; completed: boolean; quiz_score: number }>
}

export function StoryList({ stories, progress }: StoryListProps) {
  const getStoryProgress = (storyId: string) => {
    return progress.find((p) => p.story_id === storyId)
  }

  const difficultyColors = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stories.map((story) => {
        const storyProgress = getStoryProgress(story.id)
        const isCompleted = storyProgress?.completed

        return (
          <Link key={story.id} href={`/stories/${story.id}`}>
            <Card className="h-full hover:shadow-lg transition-all border-2 hover:border-primary/20 cursor-pointer group">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {story.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">
                      {story.titleRu}
                    </p>
                  </div>
                  {isCompleted && (
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription>{story.description}</CardDescription>
                <div className="flex items-center justify-between">
                  <Badge className={difficultyColors[story.difficulty]}>
                    {story.difficulty}
                  </Badge>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {story.readTime} min
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {story.paragraphs.length} parts
                    </span>
                  </div>
                </div>
                {storyProgress && (
                  <div className="text-sm text-muted-foreground">
                    Quiz Score: {storyProgress.quiz_score}%
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
