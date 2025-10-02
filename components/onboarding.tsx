"use client"

import { useState } from "react"
import { useApp } from "./providers"
import { Button } from "./ui/button"
import { MapPin, Camera, Smartphone } from "lucide-react"

interface OnboardingProps {
  onComplete: () => void
}

const slides = [
  {
    icon: MapPin,
    titleKey: "onboarding.map.title",
    descKey: "onboarding.map.desc",
    color: "from-primary to-secondary",
  },
  {
    icon: Camera,
    titleKey: "onboarding.ar.title",
    descKey: "onboarding.ar.desc",
    color: "from-secondary to-accent",
  },
  {
    icon: Smartphone,
    titleKey: "onboarding.offline.title",
    descKey: "onboarding.offline.desc",
    color: "from-accent to-primary",
  },
]

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useApp()

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const slide = slides[currentSlide]
  const Icon = slide.icon

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Skip button */}
      <div className="p-6 flex justify-end">
        <button onClick={onComplete} className="text-muted-foreground hover:text-foreground text-sm font-medium">
          {t("onboarding.skip")}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 animate-slide-up">
        <div
          className={`w-48 h-48 rounded-full bg-gradient-to-br ${slide.color} flex items-center justify-center mb-12 animate-scale-in shadow-2xl`}
        >
          <Icon className="w-24 h-24 text-white" strokeWidth={1.5} />
        </div>

        <h2 className="text-3xl font-bold text-foreground mb-4 text-center text-balance">{t(slide.titleKey)}</h2>
        <p className="text-muted-foreground text-center text-lg leading-relaxed max-w-sm text-pretty">
          {t(slide.descKey)}
        </p>
      </div>

      {/* Navigation */}
      <div className="p-8 space-y-6">
        {/* Dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Button */}
        <Button onClick={handleNext} className="w-full h-14 text-lg font-semibold rounded-2xl" size="lg">
          {currentSlide === slides.length - 1 ? t("onboarding.start") : t("onboarding.next")}
        </Button>
      </div>
    </div>
  )
}
