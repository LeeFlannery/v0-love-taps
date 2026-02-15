"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="text-center py-12"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4"
      >
        <Heart className="w-10 h-10 text-primary fill-primary" />
      </motion.div>
      <h3 className="text-xl font-bold text-foreground mb-1">
        No love taps yet!
      </h3>
      <p className="text-muted-foreground font-medium">
        {"Add your first task and start tapping together"}
      </p>
    </motion.div>
  )
}
