"use client"

import { useState, useEffect } from "react"
import { Splash } from "@/components/splash"
import { Onboarding } from "@/components/onboarding"
import { MapView } from "@/components/map-view"
import { Navigation } from "@/components/navigation"
import { ARView } from "@/components/ar-view"
import { RewardScreen } from "@/components/reward-screen"
import { Settings } from "@/components/settings"

type Screen = "splash" | "onboarding" | "map" | "navigation" | "ar" | "reward" | "settings"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash")
  const [selectedTotem, setSelectedTotem] = useState<number | null>(null)
  const [completedTotems, setCompletedTotems] = useState<number[]>([])

  useEffect(() => {
    // Check if user has completed onboarding
    const hasOnboarded = localStorage.getItem("hasOnboarded")

    const timer = setTimeout(() => {
      if (hasOnboarded) {
        setCurrentScreen("map")
      } else {
        setCurrentScreen("onboarding")
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleOnboardingComplete = () => {
    localStorage.setItem("hasOnboarded", "true")
    setCurrentScreen("map")
  }

  const handleNavigateToTotem = (totemId: number) => {
    setSelectedTotem(totemId)
    setCurrentScreen("navigation")
  }

  const handleStartAR = () => {
    setCurrentScreen("ar")
  }

  const handleTotemComplete = (totemId: number) => {
    setCompletedTotems([...completedTotems, totemId])
    setCurrentScreen("reward")
  }

  const handleBackToMap = () => {
    setSelectedTotem(null)
    setCurrentScreen("map")
  }

  return (
    <main className="mobile-container bg-background">
      {currentScreen === "splash" && <Splash />}
      {currentScreen === "onboarding" && <Onboarding onComplete={handleOnboardingComplete} />}
      {currentScreen === "map" && (
        <MapView
          onNavigate={handleNavigateToTotem}
          completedTotems={completedTotems}
          onSettings={() => setCurrentScreen("settings")}
        />
      )}
      {currentScreen === "navigation" && selectedTotem && (
        <Navigation totemId={selectedTotem} onStartAR={handleStartAR} onBack={handleBackToMap} />
      )}
      {currentScreen === "ar" && selectedTotem && (
        <ARView
          totemId={selectedTotem}
          onComplete={() => handleTotemComplete(selectedTotem)}
          onBack={() => setCurrentScreen("navigation")}
        />
      )}
      {currentScreen === "reward" && selectedTotem && (
        <RewardScreen totemId={selectedTotem} totalCompleted={completedTotems.length} onNext={handleBackToMap} />
      )}
      {currentScreen === "settings" && <Settings onBack={handleBackToMap} />}
    </main>
  )
}
