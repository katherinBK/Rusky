"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { HuskyMascot } from "@/components/husky-mascot"
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

interface VoiceCallInterfaceProps {
  userId: string
}

type CallState = "idle" | "connecting" | "connected" | "ending"

export function VoiceCallInterface({ userId }: VoiceCallInterfaceProps) {
  const [callState, setCallState] = useState<CallState>("idle")
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")
  const [error, setError] = useState<string | null>(null)
  
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Check for browser support
  const isSpeechSupported = typeof window !== "undefined" && 
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
  const isSynthesisSupported = typeof window !== "undefined" && "speechSynthesis" in window

  // Initialize speech recognition
  useEffect(() => {
    if (!isSpeechSupported) return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "ru-RU" // Russian language

    recognition.onresult = (event) => {
      let finalTranscript = ""
      let interimTranscript = ""
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          finalTranscript += result[0].transcript
        } else {
          interimTranscript += result[0].transcript
        }
      }
      
      if (finalTranscript) {
        setTranscript(finalTranscript)
        handleUserSpeech(finalTranscript)
      }
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      if (event.error === "not-allowed") {
        setError("Microphone access denied. Please allow microphone access to use voice calls.")
      }
    }

    recognition.onend = () => {
      setIsListening(false)
      // Restart if still in call and not muted
      if (callState === "connected" && !isMuted) {
        try {
          recognition.start()
          setIsListening(true)
        } catch (e) {
          // Already started
        }
      }
    }

    recognitionRef.current = recognition

    return () => {
      recognition.stop()
    }
  }, [callState, isMuted, isSpeechSupported])

  // Handle user speech and get AI response
  const handleUserSpeech = useCallback(async (text: string) => {
    if (!text.trim()) return

    try {
      setIsSpeaking(true)
      
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", parts: [{ type: "text", text }] }],
          mode: "conversation",
        }),
      })

      if (!res.ok) throw new Error("Failed to get response")

      // Read the streaming response
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ""

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          const chunk = decoder.decode(value)
          const lines = chunk.split("\n")
          
          for (const line of lines) {
            if (line.startsWith("data:")) {
              try {
                const data = JSON.parse(line.slice(5))
                if (data.type === "text-delta" && data.delta) {
                  fullResponse += data.delta
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }
      }

      setResponse(fullResponse)
      
      // Speak the response
      if (isSynthesisSupported && isSpeakerOn && fullResponse) {
        speakText(fullResponse)
      } else {
        setIsSpeaking(false)
      }
    } catch (err) {
      console.error("Error getting AI response:", err)
      setIsSpeaking(false)
    }
  }, [isSpeakerOn, isSynthesisSupported])

  // Text-to-speech function
  const speakText = (text: string) => {
    if (!isSynthesisSupported) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "ru-RU"
    utterance.rate = 0.9
    utterance.pitch = 1

    // Try to find a Russian voice
    const voices = window.speechSynthesis.getVoices()
    const russianVoice = voices.find(v => v.lang.startsWith("ru"))
    if (russianVoice) {
      utterance.voice = russianVoice
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      // Resume listening after speaking
      if (callState === "connected" && !isMuted && recognitionRef.current) {
        try {
          recognitionRef.current.start()
          setIsListening(true)
        } catch {
          // Already started
        }
      }
    }

    synthRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  // Start call
  const startCall = async () => {
    setCallState("connecting")
    setError(null)
    setTranscript("")
    setResponse("")

    // Small delay for "connecting" effect
    await new Promise(resolve => setTimeout(resolve, 1500))

    setCallState("connected")
    
    // Initial greeting
    const greeting = "Привет! Я Руски, твой помощник по русскому языку. Давай поговорим! Скажи что-нибудь по-русски."
    setResponse(greeting)
    
    if (isSynthesisSupported && isSpeakerOn) {
      speakText(greeting)
    }

    // Start listening
    if (recognitionRef.current && !isMuted) {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch {
        // Already started
      }
    }
  }

  // End call
  const endCall = () => {
    setCallState("ending")
    
    // Stop recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    
    // Stop speech
    if (isSynthesisSupported) {
      window.speechSynthesis.cancel()
    }

    setIsListening(false)
    setIsSpeaking(false)

    setTimeout(() => {
      setCallState("idle")
      setTranscript("")
      setResponse("")
    }, 1000)
  }

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (recognitionRef.current) {
      if (!isMuted) {
        recognitionRef.current.stop()
        setIsListening(false)
      } else if (callState === "connected") {
        try {
          recognitionRef.current.start()
          setIsListening(true)
        } catch {
          // Already started
        }
      }
    }
  }

  // Toggle speaker
  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn)
    if (!isSpeakerOn && isSynthesisSupported) {
      window.speechSynthesis.cancel()
    }
  }

  if (!isSpeechSupported || !isSynthesisSupported) {
    return (
      <div className="h-[calc(100vh-4rem)] md:h-screen flex items-center justify-center p-4">
        <Card className="max-w-md text-center">
          <CardContent className="p-8 space-y-4">
            <HuskyMascot size="lg" mood="thinking" className="mx-auto" />
            <h2 className="text-xl font-semibold">Browser Not Supported</h2>
            <p className="text-muted-foreground">
              Your browser does not support voice calls. Please use Chrome, Edge, or Safari for the best experience.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-4rem)] md:h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image 
              src="/rusky-logo.jpg" 
              alt="Rusky" 
              width={40} 
              height={40} 
              className="rounded-full"
            />
            <div>
              <h1 className="text-lg font-semibold">Voice Call with Rusky</h1>
              <p className="text-sm text-muted-foreground">
                {callState === "idle" && "Start a voice conversation"}
                {callState === "connecting" && "Connecting..."}
                {callState === "connected" && "Call in progress"}
                {callState === "ending" && "Ending call..."}
              </p>
            </div>
          </div>
          {callState === "connected" && (
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-green-600 font-medium">Live</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-8">
        {/* Avatar with animation */}
        <div className="relative">
          <div className={cn(
            "absolute inset-0 rounded-full transition-all duration-300",
            isSpeaking && "bg-accent/30 animate-pulse scale-110",
            isListening && !isSpeaking && "bg-primary/20 animate-pulse scale-105"
          )} />
          <div className={cn(
            "relative w-48 h-48 rounded-full overflow-hidden border-4 transition-all",
            callState === "connected" 
              ? isSpeaking 
                ? "border-accent shadow-lg shadow-accent/30" 
                : isListening 
                  ? "border-primary shadow-lg shadow-primary/30"
                  : "border-border"
              : "border-border"
          )}>
            {callState === "idle" ? (
              <HuskyMascot size="lg" mood="happy" className="w-full h-full" />
            ) : callState === "connecting" ? (
              <HuskyMascot size="lg" mood="thinking" className="w-full h-full" />
            ) : isSpeaking ? (
              <HuskyMascot size="lg" mood="teaching" className="w-full h-full" />
            ) : isListening ? (
              <HuskyMascot size="lg" mood="excited" className="w-full h-full" />
            ) : (
              <HuskyMascot size="lg" mood="happy" className="w-full h-full" />
            )}
          </div>
        </div>

        {/* Status */}
        <div className="text-center space-y-2 max-w-md">
          {callState === "connecting" && (
            <div className="flex items-center justify-center gap-2">
              <Spinner className="w-5 h-5" />
              <span className="text-muted-foreground">Connecting to Rusky...</span>
            </div>
          )}
          
          {callState === "connected" && (
            <>
              {isListening && !isSpeaking && (
                <p className="text-primary font-medium">Listening...</p>
              )}
              {isSpeaking && (
                <p className="text-accent font-medium">Rusky is speaking...</p>
              )}
              {transcript && (
                <div className="bg-secondary/50 rounded-lg p-3 mt-4">
                  <p className="text-sm text-muted-foreground mb-1">You said:</p>
                  <p className="font-medium">{transcript}</p>
                </div>
              )}
              {response && (
                <div className="bg-accent/10 rounded-lg p-3 mt-2">
                  <p className="text-sm text-muted-foreground mb-1">Rusky:</p>
                  <p className="font-medium text-foreground">{response}</p>
                </div>
              )}
            </>
          )}

          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}

          {callState === "idle" && (
            <p className="text-muted-foreground">
              Practice your Russian pronunciation with live voice conversations. 
              Rusky will listen and respond in Russian!
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-4">
          {callState === "idle" ? (
            <Button
              size="lg"
              className="h-auto px-8 py-4 rounded-full bg-green-500 hover:bg-green-600 text-white text-lg font-semibold gap-3"
              onClick={startCall}
            >
              <Phone className="w-6 h-6" />
              Start Call with Rusky
            </Button>
          ) : callState === "connecting" ? (
            <Button
              size="lg"
              className="h-16 w-16 rounded-full"
              disabled
            >
              <Spinner className="w-7 h-7" />
            </Button>
          ) : (
            <>
              <Button
                size="lg"
                variant={isMuted ? "destructive" : "secondary"}
                className="h-14 w-14 rounded-full"
                onClick={toggleMute}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </Button>

              <Button
                size="lg"
                className="h-16 w-16 rounded-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                onClick={endCall}
              >
                <PhoneOff className="w-7 h-7" />
              </Button>

              <Button
                size="lg"
                variant={isSpeakerOn ? "secondary" : "outline"}
                className="h-14 w-14 rounded-full"
                onClick={toggleSpeaker}
              >
                {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Tips */}
      {callState === "idle" && (
        <div className="border-t bg-card/50 p-4">
          <div className="max-w-md mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              Tip: Speak clearly in Russian. Rusky understands both Russian and English, 
              but will respond in Russian to help you practice!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
  }
}
