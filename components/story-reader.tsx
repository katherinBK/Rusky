"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HuskyMascot } from "@/components/husky-mascot"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { Story } from "@/lib/story-data"
import { ArrowLeft, ArrowRight, BookOpen, Languages, HelpCircle, CheckCircle2, XCircle } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface StoryReaderProps {
  story: Story
  userId: string
  initialProgress: { completed: boolean; quiz_score: number } | null
}

type ViewMode = "read" | "quiz" | "results"

export function StoryReader({ story, userId, initialProgress }: StoryReaderProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("read")
  const [showTranslation, setShowTranslation] = useState(true)
  const [showTransliteration, setShowTransliteration] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const supabase = createClient()

  const currentQuestion = story.quiz[currentQuestionIndex]

  async function saveProgress(finalScore: number) {
    const { error } = await supabase
      .from("story_progress")
      .upsert({
        user_id: userId,
        story_id: story.id,
        completed: finalScore >= 60,
        quiz_score: finalScore,
        read_at: new Date().toISOString(),
      })

    if (error) {
      toast.error("Failed to save progress")
    } else {
      toast.success(finalScore >= 60 ? "Story completed!" : "Keep practicing!")
    }
  }

  function checkAnswer() {
    setShowFeedback(true)
    if (answers[currentQuestion.id] === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1)
    }
  }

  function nextQuestion() {
    setShowFeedback(false)
    if (currentQuestionIndex < story.quiz.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      const finalScore = Math.round((score / story.quiz.length) * 100)
      setScore(finalScore)
      saveProgress(finalScore)
      setViewMode("results")
    }
  }

  function restartQuiz() {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowFeedback(false)
    setScore(0)
    setViewMode("quiz")
  }

  if (viewMode === "results") {
    return (
      <div className="p-4 md:p-8">
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <HuskyMascot 
              size="lg" 
              mood={score >= 60 ? "excited" : "thinking"} 
              className="mx-auto mb-4" 
            />
            <CardTitle className="text-2xl">
              {score >= 60 ? "Молодец! Well Done!" : "Keep Reading!"}
            </CardTitle>
            <CardDescription>
              You scored {score}% on the quiz for {story.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setViewMode("read")} variant="outline">
                Read Again
              </Button>
              <Button onClick={restartQuiz} variant="outline">
                Retake Quiz
              </Button>
              <Link href="/stories">
                <Button>More Stories</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (viewMode === "quiz") {
    const isCorrect = answers[currentQuestion.id] === currentQuestion.correctAnswer

    return (
      <div className="p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setViewMode("read")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Story
            </Button>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {story.quiz.length}
            </span>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={(value) => 
                  setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))
                }
                disabled={showFeedback}
              >
                {currentQuestion.options.map((option) => (
                  <div
                    key={option}
                    className={cn(
                      "flex items-center space-x-2 p-3 rounded-lg border transition-colors",
                      showFeedback && option === currentQuestion.correctAnswer && "border-success bg-success/10",
                      showFeedback && answers[currentQuestion.id] === option && option !== currentQuestion.correctAnswer && "border-destructive bg-destructive/10",
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

              {showFeedback && (
                <div className={cn(
                  "p-4 rounded-lg flex items-center gap-3",
                  isCorrect ? "bg-success/10" : "bg-destructive/10"
                )}>
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                  <span className="font-medium">
                    {isCorrect ? "Correct!" : `The answer is: ${currentQuestion.correctAnswer}`}
                  </span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                {!showFeedback ? (
                  <Button 
                    onClick={checkAnswer}
                    disabled={!answers[currentQuestion.id]}
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button onClick={nextQuestion}>
                    {currentQuestionIndex < story.quiz.length - 1 ? "Next" : "See Results"}
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
          <Link href="/stories">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{story.title}</h1>
            <p className="text-muted-foreground">{story.titleRu}</p>
          </div>
          <Badge>{story.difficulty}</Badge>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={showTranslation ? "default" : "outline"}
            size="sm"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            <Languages className="w-4 h-4 mr-2" />
            Translation
          </Button>
          <Button
            variant={showTransliteration ? "default" : "outline"}
            size="sm"
            onClick={() => setShowTransliteration(!showTransliteration)}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Pronunciation
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="story" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="story">Story</TabsTrigger>
            <TabsTrigger value="vocabulary">Vocabulary ({story.vocabulary.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="story" className="space-y-4 mt-4">
            {story.paragraphs.map((paragraph, index) => (
              <Card key={index}>
                <CardContent className="p-4 space-y-2">
                  <p className="text-lg font-medium leading-relaxed">
                    {paragraph.russian.split(" ").map((word, i) => {
                      const cleanWord = word.replace(/[.,!?;:]/g, "")
                      const vocab = story.vocabulary.find(
                        (v) => v.word.toLowerCase() === cleanWord.toLowerCase()
                      )
                      
                      if (vocab) {
                        return (
                          <Popover key={i}>
                            <PopoverTrigger asChild>
                              <span className="cursor-pointer text-primary hover:underline">
                                {word}{" "}
                              </span>
                            </PopoverTrigger>
                            <PopoverContent className="w-64">
                              <div className="space-y-1">
                                <p className="font-semibold">{vocab.word}</p>
                                <p className="text-sm text-muted-foreground italic">
                                  {vocab.transliteration}
                                </p>
                                <p className="text-sm">{vocab.meaning}</p>
                              </div>
                            </PopoverContent>
                          </Popover>
                        )
                      }
                      return <span key={i}>{word} </span>
                    })}
                  </p>
                  {showTransliteration && (
                    <p className="text-sm text-muted-foreground italic">
                      {paragraph.transliteration}
                    </p>
                  )}
                  {showTranslation && (
                    <p className="text-sm text-muted-foreground border-l-2 border-primary/20 pl-3">
                      {paragraph.english}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-center pt-4">
              <Button onClick={() => setViewMode("quiz")} size="lg">
                <HelpCircle className="w-5 h-5 mr-2" />
                Take Comprehension Quiz
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="vocabulary" className="mt-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {story.vocabulary.map((word, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <p className="font-semibold text-lg">{word.word}</p>
                    <p className="text-sm text-muted-foreground italic">
                      {word.transliteration}
                    </p>
                    <p className="text-sm mt-1">{word.meaning}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
