"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { HuskyMascot } from "@/components/husky-mascot"
import { Flame, Trophy, Star, BookOpen, GraduationCap, Calendar, Edit2, Check, X } from "lucide-react"
import { toast } from "sonner"
import { grammarTopics } from "@/lib/grammar-data"
import { stories } from "@/lib/story-data"
import type { User } from "@supabase/supabase-js"

interface Profile {
  id: string
  display_name: string | null
  current_streak: number
  longest_streak: number
  total_xp: number
  level: number
  created_at: string
}

interface ProfileContentProps {
  user: User
  profile: Profile | null
  grammarProgress: Array<{ topic_id: string; completed: boolean; score: number }>
  storyProgress: Array<{ story_id: string; completed: boolean; quiz_score: number }>
  achievements: Array<{ achievement_id: string; unlocked_at: string }>
}

const achievementDefinitions = [
  { id: "first-lesson", name: "First Steps", description: "Complete your first grammar lesson", icon: GraduationCap },
  { id: "first-story", name: "Bookworm", description: "Read your first story", icon: BookOpen },
  { id: "streak-7", name: "Week Warrior", description: "Maintain a 7-day streak", icon: Flame },
  { id: "streak-30", name: "Dedicated Learner", description: "Maintain a 30-day streak", icon: Flame },
  { id: "grammar-master", name: "Grammar Master", description: "Complete all grammar topics", icon: GraduationCap },
  { id: "story-lover", name: "Story Lover", description: "Read all stories", icon: BookOpen },
  { id: "xp-100", name: "Rising Star", description: "Earn 100 XP", icon: Star },
  { id: "xp-500", name: "Shining Star", description: "Earn 500 XP", icon: Star },
]

export function ProfileContent({ 
  user, 
  profile, 
  grammarProgress, 
  storyProgress,
  achievements 
}: ProfileContentProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [displayName, setDisplayName] = useState(profile?.display_name || "")
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createClient()

  const completedGrammar = grammarProgress.filter(g => g.completed).length
  const completedStories = storyProgress.filter(s => s.completed).length
  const totalXp = profile?.total_xp || 0
  const level = profile?.level || 1
  const currentStreak = profile?.current_streak || 0
  const longestStreak = profile?.longest_streak || 0

  const memberSince = profile?.created_at 
    ? new Date(profile.created_at).toLocaleDateString("en-US", { 
        month: "long", 
        year: "numeric" 
      })
    : "Recently"

  async function handleSave() {
    setIsSaving(true)
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName })
      .eq("id", user.id)

    if (error) {
      toast.error("Failed to update profile")
    } else {
      toast.success("Profile updated!")
      setIsEditing(false)
    }
    setIsSaving(false)
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <HuskyMascot size="xl" mood="happy" />
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-3">
                  <Label htmlFor="displayName">Display Name</Label>
                  <div className="flex gap-2">
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your name"
                      className="max-w-xs"
                    />
                    <Button size="icon" onClick={handleSave} disabled={isSaving}>
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => setIsEditing(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {profile?.display_name || "Learner"}
                  </h1>
                  <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1 justify-center md:justify-start">
                <Calendar className="w-4 h-4" />
                Member since {memberSince}
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-accent">
                  <Flame className="w-5 h-5" />
                  <span className="text-2xl font-bold">{currentStreak}</span>
                </div>
                <p className="text-xs text-muted-foreground">Current Streak</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-primary">
                  <Star className="w-5 h-5" />
                  <span className="text-2xl font-bold">{totalXp}</span>
                </div>
                <p className="text-xs text-muted-foreground">Total XP</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-success">
                  <Trophy className="w-5 h-5" />
                  <span className="text-2xl font-bold">Lvl {level}</span>
                </div>
                <p className="text-xs text-muted-foreground">Level</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Grammar Topics</CardDescription>
            <CardTitle className="text-2xl">
              {completedGrammar} / {grammarTopics.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress 
              value={(completedGrammar / grammarTopics.length) * 100} 
              className="h-2" 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Stories Read</CardDescription>
            <CardTitle className="text-2xl">
              {completedStories} / {stories.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress 
              value={(completedStories / stories.length) * 100} 
              className="h-2" 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Longest Streak</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Flame className="w-5 h-5 text-accent" />
              {longestStreak} days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Keep practicing daily!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Achievements</CardDescription>
            <CardTitle className="text-2xl">
              {achievements.length} / {achievementDefinitions.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress 
              value={(achievements.length / achievementDefinitions.length) * 100} 
              className="h-2" 
            />
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Achievements
          </CardTitle>
          <CardDescription>
            Unlock achievements by reaching learning milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievementDefinitions.map((achievement) => {
              const isUnlocked = achievements.some(a => a.achievement_id === achievement.id)
              const Icon = achievement.icon
              
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    isUnlocked 
                      ? "border-success bg-success/5" 
                      : "border-muted bg-muted/30 opacity-60"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                    isUnlocked ? "bg-success/20" : "bg-muted"
                  }`}>
                    <Icon className={`w-6 h-6 ${isUnlocked ? "text-success" : "text-muted-foreground"}`} />
                  </div>
                  <h4 className="font-semibold text-sm">{achievement.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
          <CardDescription>Your recent grammar and story progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Grammar Topics
              </h4>
              <div className="grid gap-2">
                {grammarTopics.map((topic) => {
                  const progress = grammarProgress.find(g => g.topic_id === topic.id)
                  return (
                    <div key={topic.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <span className="text-sm">{topic.title}</span>
                      <div className="flex items-center gap-2">
                        {progress ? (
                          <>
                            <span className="text-sm text-muted-foreground">{progress.score}%</span>
                            {progress.completed && (
                              <Check className="w-4 h-4 text-success" />
                            )}
                          </>
                        ) : (
                          <span className="text-sm text-muted-foreground">Not started</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Stories
              </h4>
              <div className="grid gap-2">
                {stories.map((story) => {
                  const progress = storyProgress.find(s => s.story_id === story.id)
                  return (
                    <div key={story.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <span className="text-sm">{story.title}</span>
                      <div className="flex items-center gap-2">
                        {progress ? (
                          <>
                            <span className="text-sm text-muted-foreground">Quiz: {progress.quiz_score}%</span>
                            {progress.completed && (
                              <Check className="w-4 h-4 text-success" />
                            )}
                          </>
                        ) : (
                          <span className="text-sm text-muted-foreground">Not read</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
