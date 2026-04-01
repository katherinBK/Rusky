"use client"

import { cn } from "@/lib/utils"

interface HuskyMascotProps {
  size?: "sm" | "md" | "lg" | "xl"
  mood?: "happy" | "thinking" | "excited" | "teaching"
  className?: string
  animate?: boolean
}

export function HuskyMascot({ 
  size = "md", 
  mood = "happy", 
  className,
  animate = true 
}: HuskyMascotProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-48 h-48"
  }

  const eyeExpressions = {
    happy: { left: "6", right: "6" },
    thinking: { left: "4", right: "8" },
    excited: { left: "7", right: "7" },
    teaching: { left: "5", right: "5" }
  }

  return (
    <div className={cn(
      sizeClasses[size],
      animate && "transition-transform hover:scale-105",
      className
    )}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background circle */}
        <circle cx="50" cy="50" r="48" fill="currentColor" className="text-primary/10" />
        
        {/* Ears */}
        <path 
          d="M25 35 L15 10 L35 25 Z" 
          fill="currentColor" 
          className="text-slate-400"
        />
        <path 
          d="M75 35 L85 10 L65 25 Z" 
          fill="currentColor" 
          className="text-slate-400"
        />
        <path 
          d="M27 32 L20 15 L33 27 Z" 
          fill="currentColor" 
          className="text-slate-300"
        />
        <path 
          d="M73 32 L80 15 L67 27 Z" 
          fill="currentColor" 
          className="text-slate-300"
        />
        
        {/* Head */}
        <ellipse cx="50" cy="50" rx="32" ry="30" fill="currentColor" className="text-slate-400" />
        
        {/* Face mask */}
        <path 
          d="M50 30 Q30 45 35 65 Q50 75 65 65 Q70 45 50 30" 
          fill="currentColor" 
          className="text-white"
        />
        
        {/* Forehead mark */}
        <path 
          d="M50 25 L45 40 L50 38 L55 40 Z" 
          fill="currentColor" 
          className="text-slate-400"
        />
        
        {/* Eyes */}
        <ellipse 
          cx="38" 
          cy="45" 
          rx={eyeExpressions[mood].left} 
          ry="7" 
          fill="currentColor" 
          className="text-sky-500"
        >
          {animate && (
            <animate 
              attributeName="ry" 
              values="7;1;7" 
              dur="3s" 
              repeatCount="indefinite"
              begin="2s"
            />
          )}
        </ellipse>
        <ellipse 
          cx="62" 
          cy="45" 
          rx={eyeExpressions[mood].right} 
          ry="7" 
          fill="currentColor" 
          className="text-sky-500"
        >
          {animate && (
            <animate 
              attributeName="ry" 
              values="7;1;7" 
              dur="3s" 
              repeatCount="indefinite"
              begin="2s"
            />
          )}
        </ellipse>
        
        {/* Eye highlights */}
        <circle cx="36" cy="43" r="2" fill="white" />
        <circle cx="60" cy="43" r="2" fill="white" />
        
        {/* Pupils */}
        <circle cx="38" cy="46" r="3" fill="currentColor" className="text-slate-800" />
        <circle cx="62" cy="46" r="3" fill="currentColor" className="text-slate-800" />
        
        {/* Nose */}
        <ellipse cx="50" cy="58" rx="5" ry="4" fill="currentColor" className="text-slate-800" />
        <ellipse cx="49" cy="57" rx="1.5" ry="1" fill="currentColor" className="text-slate-600" />
        
        {/* Mouth */}
        {mood === "happy" || mood === "excited" ? (
          <path 
            d="M42 65 Q50 72 58 65" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
            className="text-slate-700"
          />
        ) : (
          <path 
            d="M44 66 L56 66" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
            className="text-slate-700"
          />
        )}
        
        {/* Tongue for excited */}
        {mood === "excited" && (
          <ellipse cx="50" cy="70" rx="4" ry="5" fill="currentColor" className="text-pink-400" />
        )}
        
        {/* Thinking bubbles */}
        {mood === "thinking" && (
          <>
            <circle cx="80" cy="25" r="3" fill="currentColor" className="text-primary/40" />
            <circle cx="85" cy="15" r="4" fill="currentColor" className="text-primary/40" />
            <circle cx="92" cy="8" r="5" fill="currentColor" className="text-primary/40" />
          </>
        )}
        
        {/* Teaching pointer for teaching mood */}
        {mood === "teaching" && (
          <path 
            d="M75 70 L90 55" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round"
            className="text-accent"
          />
        )}
      </svg>
    </div>
  )
}
