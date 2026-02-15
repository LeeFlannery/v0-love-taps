"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useCallback } from "react"

let globalParticleId = 0

interface Particle {
  id: number
  x: number
  y: number
  color: string
  size: number
  angle: number
  distance: number
}

const COLORS = [
  "#ec4899", "#f43f5e", "#e11d48", "#fb7185",
  "#f59e0b", "#fbbf24", "#ff6b81", "#c084fc",
  "#fb923c", "#f472b6",
]

function createBurst(cx: number, cy: number): Particle[] {
  return Array.from({ length: 18 }, (_, i) => ({
    id: ++globalParticleId,
    x: cx,
    y: cy,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 4 + Math.random() * 6,
    angle: (360 / 18) * i + (Math.random() * 20 - 10),
    distance: 60 + Math.random() * 100,
  }))
}

export function Fireworks({ show, onDone }: { show: boolean; onDone: () => void }) {
  const [particles, setParticles] = useState<Particle[]>([])

  const launchFireworks = useCallback(() => {
    const positions = [
      { x: 25, y: 30 },
      { x: 75, y: 25 },
      { x: 50, y: 20 },
      { x: 35, y: 45 },
      { x: 65, y: 40 },
    ]
    positions.forEach((pos, bIdx) => {
      setTimeout(() => {
        setParticles((prev) => [
          ...prev,
          ...createBurst(pos.x, pos.y),
        ])
      }, bIdx * 350)
    })
    setTimeout(() => {
      setParticles([])
      onDone()
    }, 3500)
  }, [onDone])

  useEffect(() => {
    if (show) {
      launchFireworks()
    }
  }, [show, launchFireworks])

  return (
    <AnimatePresence>
      {particles.length > 0 && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {particles.map((p) => {
            const rad = (p.angle * Math.PI) / 180
            const tx = Math.cos(rad) * p.distance
            const ty = Math.sin(rad) * p.distance
            return (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                }}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1.5, 0.8, 0],
                  x: tx,
                  y: ty,
                  opacity: [1, 1, 0.6, 0],
                }}
                transition={{
                  duration: 1.4,
                  ease: "easeOut",
                }}
              />
            )
          })}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
