"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { HuskyMascot } from "@/components/husky-mascot"
import { 
  MessageCircle, 
  GraduationCap, 
  BookOpen, 
  Flame, 
  Trophy,
  Star,
  ArrowRight
} from "lucide-react"

interface Profile {
  id: string
  display_name: string | null
  current_streak: number
  longest_streak: number
  total_xp: number
  level: number
}

interface DashboardContentProps {
  profile: Profile | null
  grammarProgress: Array<{ topic_id: string; completed: boolean; score: number }>
  storyProgress: Array<{ story_id: string; completed: boolean }>
  achievements: Array<{ achievement_id: string }>
}

const grammarTopics = [
  "noun-cases", "verb-aspects", "adjective-agreement", 
  "verb-conjugation", "pronouns", "prepositions"
]

const stories = [
  "the-golden-fish", "the-turnip", "moscow-metro", 
  "russian-tea", "winter-day"
]

export function DashboardContent({ 
  profile, 
  grammarProgress, 
  storyProgress,
  achievements 
}: DashboardContentProps) {
  const displayName = profile?.display_name || "Learner"
  const currentStreak = profile?.current_streak || 0
  const totalXp = profile?.total_xp || 0
  const level = profile?.level || 1

  const completedGrammar = grammarProgress.filter(g => g.completed).length
  const grammarPercent = Math.round((completedGrammar / grammarTopics.length) * 100)
  
  const completedStories = storyProgress.filter(s => s.completed).length
  const storiesPercent = Math.round((completedStories / stories.length) * 100)

  const xpForNextLevel = level * 100
  const xpProgress = (totalXp % 100) / xpForNextLevel * 100

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <HuskyMascot size="lg" mood={currentStreak > 0 ? "excited" : "happy"} />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {"Привет"}, {displayName}!
            </h1>
            <p className="text-muted-foreground">
              {"Ready for today's Russian practice?"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="flex items-center gap-1 text-accent">
              <Flame className="w-5 h-5" />
              <span className="text-2xl font-bold">{currentStreak}</span>
            </div>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1 text-primary">
              <Star className="w-5 h-5" />
              <span className="text-2xl font-bold">{totalXp}</span>
            </div>
            <p className="text-xs text-muted-foreground">Total XP</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1 text-success">
              <Trophy className="w-5 h-5" />
              <span className="text-2xl font-bold">{achievements.length}</span>
            </div>
            <p className="text-xs text-muted-foreground">Achievements</p>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Level {level}</span>
            <span className="text-sm text-muted-foreground">
              {totalXp % 100} / {xpForNextLevel} XP to Level {level + 1}
            </span>
          </div>
          <Progress value={xpProgress} className="h-2" />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="group hover:shadow-lg transition-all border-2 hover:border-primary/20">
          <CardHeader className="pb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-lg">Start Conversation</CardTitle>
            <CardDescription>
              Practice speaking with your AI tutor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/chat">
              <Button className="w-full group-hover:bg-primary/90">
                Start Chatting
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all border-2 hover:border-primary/20">
          <CardHeader className="pb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-lg">Grammar Review</CardTitle>
            <CardDescription>
              {completedGrammar} of {grammarTopics.length} topics completed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Progress value={grammarPercent} className="h-2" />
            <Link href="/grammar">
              <Button variant="outline" className="w-full">
                Continue Learning
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all border-2 hover:border-primary/20">
          <CardHeader className="pb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-lg">Read Stories</CardTitle>
            <CardDescription>
              {completedStories} of {stories.length} stories read
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Progress value={storiesPercent} className="h-2" />
            <Link href="/stories">
              <Button variant="outline" className="w-full">
                Browse Stories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Daily Tip */}
      <Card className="bg-gradient-to-br from-primary/5 via-card to-accent/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <HuskyMascot size="md" mood="teaching" />
            <div>
              <h3 className="font-semibold mb-1">Daily Russian Tip</h3>
              <p className="text-muted-foreground">
                {"Remember: Russian has no articles (a, an, the)! So \"книга\" can mean \"a book\", \"the book\", or just \"book\" depending on context. This makes sentences shorter but requires more attention to context."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
