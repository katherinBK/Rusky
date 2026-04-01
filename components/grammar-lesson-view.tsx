"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { HuskyMascot } from "@/components/husky-mascot"
import type { GrammarTopic, GrammarLesson, GrammarExercise } from "@/lib/grammar-data"
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, BookOpen, PenTool } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface GrammarLessonViewProps {
  topic: GrammarTopic
  userId: string
  initialProgress: { completed: boolean; score: number; attempts: number } | null
}

type ViewMode = "lessons" | "exercises" | "results"

export function GrammarLessonView({ topic, userId, initialProgress }: GrammarLessonViewProps) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [viewMode, setViewMode] = useState<ViewMode>("lessons")
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const supabase = createClient()

  const currentLesson = topic.lessons[currentLessonIndex]
  const allExercises = topic.lessons.flatMap((l) => l.exercises)
  const currentExercise = allExercises[currentExerciseIndex]

  async function saveProgress(finalScore: number) {
    const { error } = await supabase
      .from("grammar_progress")
      .upsert({
        user_id: userId,
        topic_id: topic.id,
        completed: finalScore >= 70,
        score: finalScore,
        attempts: (initialProgress?.attempts || 0) + 1,
        last_attempt_at: new Date().toISOString(),
      })

    if (error) {
      toast.error("Failed to save progress")
    } else {
      toast.success(finalScore >= 70 ? "Great job! Topic completed!" : "Keep practicing!")
    }
  }

  function handleAnswerChange(exerciseId: string, answer: string) {
    setAnswers((prev) => ({ ...prev, [exerciseId]: answer }))
  }

  function checkAnswer() {
    setShowFeedback(true)
    const isCorrect = answers[currentExercise.id]?.toLowerCase().trim() === 
      currentExercise.correctAnswer.toLowerCase().trim()
    if (isCorrect) {
      setScore((prev) => prev + 1)
    }
  }

  function nextExercise() {
    setShowFeedback(false)
    if (currentExerciseIndex < allExercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1)
    } else {
      const finalScore = Math.round((score / allExercises.length) * 100)
      setScore(finalScore)
      saveProgress(finalScore)
      setViewMode("results")
    }
  }

  function restartExercises() {
    setCurrentExerciseIndex(0)
    setAnswers({})
    setShowFeedback(false)
    setScore(0)
    setViewMode("exercises")
  }

  if (viewMode === "results") {
    return (
      <div className="p-4 md:p-8">
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <HuskyMascot 
              size="lg" 
              mood={score >= 70 ? "excited" : "thinking"} 
              className="mx-auto mb-4" 
            />
            <CardTitle className="text-2xl">
              {score >= 70 ? "Отлично! Excellent!" : "Keep Practicing!"}
            </CardTitle>
            <CardDescription>
              You scored {score}% on {topic.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Progress value={score} className="h-3" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={restartExercises} variant="outline">
                Try Again
              </Button>
              <Link href="/grammar">
                <Button>Back to Topics</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (viewMode === "exercises") {
    const isCorrect = answers[currentExercise.id]?.toLowerCase().trim() === 
      currentExercise.correctAnswer.toLowerCase().trim()

    return (
      <div className="p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setViewMode("lessons")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lessons
            </Button>
            <span className="text-sm text-muted-foreground">
              Exercise {currentExerciseIndex + 1} of {allExercises.length}
            </span>
          </div>

          <Progress 
            value={((currentExerciseIndex + 1) / allExercises.length) * 100} 
            className="h-2" 
          />

          <Card>
            <CardHeader>
              <Badge className="w-fit mb-2">
                {currentExercise.type.replace("-", " ")}
              </Badge>
              <CardTitle className="text-xl">{currentExercise.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentExercise.type === "multiple-choice" && currentExercise.options && (
                <RadioGroup
                  value={answers[currentExercise.id] || ""}
                  onValueChange={(value) => handleAnswerChange(currentExercise.id, value)}
                  disabled={showFeedback}
                >
                  {currentExercise.options.map((option) => (
                    <div
                      key={option}
                      className={cn(
                        "flex items-center space-x-2 p-3 rounded-lg border transition-colors",
                        showFeedback && option === currentExercise.correctAnswer && "border-success bg-success/10",
                        showFeedback && answers[currentExercise.id] === option && option !== currentExercise.correctAnswer && "border-destructive bg-destructive/10",
                        !showFeedback && "hover:bg-muted"
                      )}
                    >
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {(currentExercise.type === "fill-blank" || currentExercise.type === "translation") && (
                <Input
                  value={answers[currentExercise.id] || ""}
                  onChange={(e) => handleAnswerChange(currentExercise.id, e.target.value)}
                  placeholder="Type your answer..."
                  disabled={showFeedback}
                  className={cn(
                    showFeedback && isCorrect && "border-success",
                    showFeedback && !isCorrect && "border-destructive"
                  )}
                />
              )}

              {showFeedback && (
                <div className={cn(
                  "p-4 rounded-lg flex items-start gap-3",
                  isCorrect ? "bg-success/10" : "bg-destructive/10"
                )}>
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium mb-1">
                      {isCorrect ? "Correct!" : `Incorrect. The answer is: ${currentExercise.correctAnswer}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {currentExercise.explanation}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                {!showFeedback ? (
                  <Button 
                    onClick={checkAnswer}
                    disabled={!answers[currentExercise.id]}
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button onClick={nextExercise}>
                    {currentExerciseIndex < allExercises.length - 1 ? "Next" : "See Results"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/grammar">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{topic.title}</h1>
            <p className="text-muted-foreground">{topic.titleRu}</p>
          </div>
        </div>

        {/* Lesson Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {topic.lessons.map((lesson, index) => (
            <Button
              key={lesson.id}
              variant={index === currentLessonIndex ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentLessonIndex(index)}
              className="shrink-0"
            >
              {index + 1}. {lesson.title.split("(")[0].trim()}
            </Button>
          ))}
        </div>

        {/* Lesson Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Lesson {currentLessonIndex + 1} of {topic.lessons.length}</span>
            </div>
            <CardTitle>{currentLesson.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="leading-relaxed">{currentLesson.content}</p>

            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <PenTool className="w-4 h-4" />
                Examples
              </h4>
              <div className="space-y-2">
                {currentLesson.examples.map((example, i) => (
                  <div key={i} className="p-3 bg-muted rounded-lg">
                    <p className="font-medium text-lg">{example.russian}</p>
                    <p className="text-sm text-muted-foreground italic">
                      {example.transliteration}
                    </p>
                    <p className="text-sm">{example.english}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentLessonIndex((prev) => prev - 1)}
            disabled={currentLessonIndex === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          {currentLessonIndex === topic.lessons.length - 1 ? (
            <Button onClick={() => setViewMode("exercises")}>
              Start Exercises
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={() => setCurrentLessonIndex((prev) => prev + 1)}>
              Next Lesson
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
