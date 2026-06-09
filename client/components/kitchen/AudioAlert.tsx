"use client"

import { useEffect, useRef } from "react"

interface AudioAlertProps {
  trigger: boolean  // true hone pe sound bajao
}

export default function AudioAlert({ trigger }: AudioAlertProps) {
  const audioCtxRef = useRef<AudioContext | null>(null)

  const playBeep = () => {
    try {
      // AudioContext lazy init — browser autoplay policy ke liye
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext()
      }

      const ctx = audioCtxRef.current

      // 3 beeps bajao
      ;[0, 0.3, 0.6].forEach((delay) => {
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.type = "sine"
        oscillator.frequency.setValueAtTime(880, ctx.currentTime + delay)

        gainNode.gain.setValueAtTime(0.4, ctx.currentTime + delay)
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + delay + 0.25
        )

        oscillator.start(ctx.currentTime + delay)
        oscillator.stop(ctx.currentTime + delay + 0.25)
      })
    } catch (err) {
      console.warn("Audio alert failed:", err)
    }
  }

  useEffect(() => {
    if (trigger) playBeep()
  }, [trigger])

  return null // No UI — sirf sound
}