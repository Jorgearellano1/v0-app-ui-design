"use client"

import { useState, useEffect } from "react"
import { useApp } from "./providers"
import { Button } from "./ui/button"
import { ArrowLeft, Camera } from "lucide-react"

interface NavigationProps {
  totemId: number
  onStartAR: () => void
  onBack: () => void
}

export function Navigation({ totemId, onStartAR, onBack }: NavigationProps) {
  const { t } = useApp()
  const [distance, setDistance] = useState(120)
  const [showARPrompt, setShowARPrompt] = useState(false)

  useEffect(() => {
    // Simulate getting closer
    const interval = setInterval(() => {
      setDistance((prev) => {
        const newDistance = Math.max(0, prev - 5)
        if (newDistance < 20 && !showARPrompt) {
          setShowARPrompt(true)
        }
        return newDistance
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [showARPrompt])

  const estimatedTime = Math.ceil((distance / 80) * 60) // Assuming 80m/min walking speed

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 pb-4 flex items-center gap-4 bg-card border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">{t("nav.heading")}</h1>
      </div>

      {/* Map/Navigation View */}
      <div className="flex-1 relative bg-muted overflow-hidden">
        {/* Simulated street view */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* AR Navigation Arrow */}
            <div className="animate-pulse-slow">
              <svg className="w-32 h-32 text-primary drop-shadow-lg" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 10 L70 40 L60 40 L60 90 L40 90 L40 40 L30 40 Z" />
              </svg>
            </div>
          </div>

          {/* Distance indicator */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-full">
            <p className="text-2xl font-bold text-foreground">{distance}m</p>
          </div>

          {/* Direction hint */}
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center">
            <p className="text-lg font-semibold text-foreground mb-1">
              {distance < 20 ? t("nav.arriving") : t("nav.continue")}
            </p>
            <p className="text-sm text-muted-foreground">
              {estimatedTime} {t("nav.time")}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="p-6 bg-card border-t border-border space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{t("nav.distance")}</p>
            <p className="text-3xl font-bold text-foreground">{distance}m</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Time</p>
            <p className="text-3xl font-bold text-foreground">
              {estimatedTime}
              <span className="text-lg">{t("nav.time")}</span>
            </p>
          </div>
        </div>

        {showARPrompt && (
          <div className="animate-slide-up">
            <div className="bg-secondary/10 border border-secondary rounded-2xl p-4 mb-3">
              <p className="text-secondary font-semibold text-center mb-2">{t("ar.close")}</p>
            </div>
            <Button onClick={onStartAR} className="w-full h-14 text-lg font-semibold rounded-2xl" size="lg">
              <Camera className="w-5 h-5 mr-2" />
              {t("map.viewAR")}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
