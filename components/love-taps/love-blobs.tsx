"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"

const encouragements = [
  "You two are crushing it!",
  "Teamwork makes the dream work!",
  "Love looks good on you both!",
  "Keep tapping, lovebirds!",
  "You're on fire together!",
  "Power couple energy!",
  "So proud of you two!",
  "Sparks are flying!",
  "Goals? You ARE the goal!",
  "Relationship level: expert!",
]

const celebrationMessages = [
  "OMG you did it! We're so happy!",
  "YESSS! Weekly goal smashed!",
  "We knew you could do it!",
  "That's our favorite couple!",
  "You two are UNSTOPPABLE!",
]

interface LoveBlobsProps {
  taskCount: number
  goalMet: boolean
}

export function LoveBlobs({ taskCount, goalMet }: LoveBlobsProps) {
  const [message, setMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const [lastTaskCount, setLastTaskCount] = useState(taskCount)

  const triggerMessage = useCallback((msgs: string[]) => {
    setMessage(msgs[Math.floor(Math.random() * msgs.length)])
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 3500)
  }, [])

  useEffect(() => {
    if (taskCount > lastTaskCount) {
      triggerMessage(encouragements)
    }
    setLastTaskCount(taskCount)
  }, [taskCount, lastTaskCount, triggerMessage])

  useEffect(() => {
    if (goalMet) {
      setTimeout(() => triggerMessage(celebrationMessages), 500)
    }
  }, [goalMet, triggerMessage])

  return (
    <div className="relative flex items-end justify-center gap-4 py-4 mt-4">
      {/* Speech bubble */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-card border border-border rounded-2xl px-4 py-2 shadow-lg max-w-[240px]"
          >
            <p className="text-xs font-bold text-foreground text-center leading-snug">{message}</p>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-b border-r border-border rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blob 1 - Pink one */}
      <motion.div
        className="relative cursor-pointer"
        onClick={() => triggerMessage(encouragements)}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          animate={goalMet ? { rotate: [0, -5, 5, -3, 3, 0] } : {}}
          transition={goalMet ? { duration: 1.2, repeat: Infinity, repeatDelay: 2 } : {}}
        >
          <motion.ellipse
            cx="32"
            cy="36"
            rx="26"
            ry="22"
            fill="#f472b6"
            animate={{ ry: [22, 20, 22], rx: [26, 28, 26] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Eyes */}
          <ellipse cx="24" cy="32" rx="3" ry="3.5" fill="#831843" />
          <ellipse cx="40" cy="32" rx="3" ry="3.5" fill="#831843" />
          {/* Eye shine */}
          <circle cx="25" cy="31" r="1" fill="white" />
          <circle cx="41" cy="31" r="1" fill="white" />
          {/* Blush */}
          <ellipse cx="18" cy="38" rx="4" ry="2.5" fill="#fda4af" opacity="0.6" />
          <ellipse cx="46" cy="38" rx="4" ry="2.5" fill="#fda4af" opacity="0.6" />
          {/* Smile */}
          <path
            d="M26 40 Q32 46 38 40"
            stroke="#831843"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </motion.svg>
        {/* Heart above */}
        <motion.div
          className="absolute -top-2 -right-1"
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#e11d48">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Little heart between them */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="mb-4"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#f43f5e">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>

      {/* Blob 2 - Rose one */}
      <motion.div
        className="relative cursor-pointer"
        onClick={() => triggerMessage(encouragements)}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <motion.svg
          width="58"
          height="58"
          viewBox="0 0 58 58"
          animate={goalMet ? { rotate: [0, 5, -5, 3, -3, 0] } : {}}
          transition={goalMet ? { duration: 1.2, repeat: Infinity, repeatDelay: 2, delay: 0.3 } : {}}
        >
          <motion.ellipse
            cx="29"
            cy="33"
            rx="23"
            ry="20"
            fill="#fb7185"
            animate={{ ry: [20, 18, 20], rx: [23, 25, 23] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          {/* Eyes */}
          <ellipse cx="22" cy="30" rx="2.5" ry="3" fill="#881337" />
          <ellipse cx="36" cy="30" rx="2.5" ry="3" fill="#881337" />
          {/* Eye shine */}
          <circle cx="23" cy="29" r="1" fill="white" />
          <circle cx="37" cy="29" r="1" fill="white" />
          {/* Blush */}
          <ellipse cx="16" cy="35" rx="3.5" ry="2" fill="#fecdd3" opacity="0.6" />
          <ellipse cx="42" cy="35" rx="3.5" ry="2" fill="#fecdd3" opacity="0.6" />
          {/* Smile */}
          <path
            d="M23 37 Q29 42 35 37"
            stroke="#881337"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </motion.svg>
        {/* Star sparkle */}
        <motion.div
          className="absolute -top-1 -left-1"
          animate={{ rotate: [0, 180, 360], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
