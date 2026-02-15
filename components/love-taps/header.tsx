"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function Header() {
  return (
    <header className="relative py-8 text-center">
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart className="w-48 h-48 text-primary fill-primary" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-7 h-7 text-primary fill-primary" />
          </motion.div>
          <h1 className="text-5xl font-serif font-bold tracking-tight text-primary">
            Love Taps
          </h1>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.75,
            }}
          >
            <Heart className="w-7 h-7 text-primary fill-primary" />
          </motion.div>
        </div>
        <p className="text-muted-foreground text-lg font-medium">
          {"Keeping love organized, one tap at a time"}
        </p>
      </motion.div>
    </header>
  )
}
