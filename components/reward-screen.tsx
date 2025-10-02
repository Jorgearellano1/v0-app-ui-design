"use client"

import { useApp } from "./providers"
import { Button } from "./ui/button"
import { Trophy, Share2, MapPin } from "lucide-react"
import Confetti from "react-confetti"
import { useEffect, useState } from "react"

interface RewardScreenProps {
  totemId: number
  totalCompleted: number
  onNext: () => void
}

export function RewardScreen({ totemId, totalCompleted, onNext }: RewardScreenProps) {
  const { t } = useApp()
  const [showConfetti, setShowConfetti] = useState(true)
  const totalTotems = 5

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const isAllComplete = totalCompleted === totalTotems

  return (
    <div className="h-screen flex flex-col bg-background relative overflow-hidden">
      {showConfetti && <Confetti width={430} height={window.innerHeight} recycle={false} numberOfPieces={200} />}

      <div className="flex-1 flex flex-col items-center justify-center p-8 animate-scale-in">
        {/* Trophy Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="relative w-32 h-32 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center shadow-2xl">
            <Trophy className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground mb-4 text-center text-balance">
          {isAllComplete ? t("rewards.allComplete") : t("rewards.unlocked")}
        </h1>

        {/* Progress */}
        <div className="w-full max-w-xs mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">{t("rewards.progress")}</span>
            <span className="text-sm font-bold text-foreground">
              {totalCompleted}/{totalTotems}
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
              style={{ width: `${(totalCompleted / totalTotems) * 100}%` }}
            />
          </div>
          <p className="text-center text-muted-foreground mt-2">
            {totalCompleted} {t("rewards.completed")}
          </p>
        </div>

        {/* Badge/Reward Visual */}
        <div className="grid grid-cols-5 gap-3 mb-8">
          {Array.from({ length: totalTotems }).map((_, index) => (
            <div
              key={index}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                index < totalCompleted
                  ? "bg-gradient-to-br from-primary to-secondary shadow-lg scale-100"
                  : "bg-muted scale-90"
              }`}
            >
              {index < totalCompleted ? (
                <MapPin className="w-6 h-6 text-white" />
              ) : (
                <div className="w-3 h-3 bg-muted-foreground/30 rounded-full" />
              )}
            </div>
          ))}
        </div>

        {isAllComplete && <p className="text-center text-muted-foreground mb-4 text-lg">{t("rewards.collection")}</p>}
      </div>

      {/* Actions */}
      <div className="p-6 space-y-3">
        <Button onClick={onNext} className="w-full h-14 text-lg font-semibold rounded-2xl" size="lg">
          {isAllComplete ? t("rewards.backToMap") : t("rewards.next")}
        </Button>
        <Button variant="outline" className="w-full h-14 text-lg font-semibold rounded-2xl bg-transparent">
          <Share2 className="w-5 h-5 mr-2" />
          {t("rewards.share")}
        </Button>
      </div>
    </div>
  )
}
