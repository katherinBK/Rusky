"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, UIMessage } from "ai"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { HuskyMascot } from "@/components/husky-mascot"
import { Send, GraduationCap, MessageCircle, Trash2 } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

interface ChatInterfaceProps {
  userId: string
}

function getUIMessageText(msg: UIMessage): string {
  if (!msg.parts || !Array.isArray(msg.parts)) return ""
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

export function ChatInterface({ userId }: ChatInterfaceProps) {
  const [mode, setMode] = useState<"teaching" | "conversation">("teaching")
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { mode },
    }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  function handleModeChange(newMode: "teaching" | "conversation") {
    setMode(newMode)
    setMessages([])
  }

  function clearChat() {
    setMessages([])
  }

  return (
    <div className="h-[calc(100vh-4rem)] md:h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-card p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <HuskyMascot size="sm" mood={mode === "teaching" ? "teaching" : "happy"} animate={false} />
            <div>
              <h1 className="text-lg font-semibold">Chat with Rusky</h1>
              <p className="text-sm text-muted-foreground">
                {mode === "teaching" ? "Learning Mode - Structured lessons" : "Practice Mode - Free conversation"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border bg-muted p-1">
              <Button
                variant={mode === "teaching" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleModeChange("teaching")}
                className="gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                <span className="hidden sm:inline">Teaching</span>
              </Button>
              <Button
                variant={mode === "conversation" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleModeChange("conversation")}
                className="gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Conversation</span>
              </Button>
            </div>
            {messages.length > 0 && (
              <Button variant="ghost" size="icon" onClick={clearChat} title="Clear chat">
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <Card className="max-w-md text-center">
              <CardHeader>
                <HuskyMascot size="lg" mood={mode === "teaching" ? "teaching" : "excited"} className="mx-auto" />
                <CardTitle>
                  {mode === "teaching" ? "Ready to Learn?" : "Let's Chat!"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {mode === "teaching" ? (
                  <p>
                    {"I'll guide you through Russian step by step. Type \"Привет\" (Privet - Hello) to start, or ask me to teach you something specific!"}
                  </p>
                ) : (
                  <p>
                    {"Practice your Russian in a natural conversation. Don't worry about mistakes - I'm here to help! Try saying hello in Russian."}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <HuskyMascot size="sm" mood="happy" animate={false} className="shrink-0 mt-1" />
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{getUIMessageText(message)}</p>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3 justify-start">
                <HuskyMascot size="sm" mood="thinking" animate={false} className="shrink-0 mt-1" />
                <div className="bg-secondary rounded-2xl px-4 py-3">
                  <Spinner className="w-5 h-5" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="border-t bg-card p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={mode === "teaching" ? "Ask me to teach you something..." : "Type in Russian or English..."}
            className="min-h-[44px] max-h-32 resize-none"
            rows={1}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" className="shrink-0 h-11 w-11" disabled={isLoading || !input.trim()}>
            {isLoading ? <Spinner /> : <Send className="w-5 h-5" />}
          </Button>
        </form>
      </div>
    </div>
  )
}
