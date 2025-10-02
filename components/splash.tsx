"use client"

import { useApp } from "./providers"

export function Splash() {
  const { t } = useApp()

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent animate-fade-in">
      <div className="text-center animate-scale-in">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl animate-pulse-slow" />
          <svg
            className="w-32 h-32 mx-auto relative z-10"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="3" opacity="0.3" />
            <circle cx="50" cy="50" r="35" stroke="white" strokeWidth="3" opacity="0.5" />
            <circle cx="50" cy="50" r="25" fill="white" />
            <path d="M50 30 L60 45 L50 40 L40 45 Z" fill="rgb(14, 165, 233)" />
            <circle cx="50" cy="55" r="8" fill="rgb(14, 165, 233)" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">AR Explorer</h1>
        <p className="text-white/80 text-lg">{t("onboarding.welcome").split(" ").slice(0, 3).join(" ")}</p>
      </div>
    </div>
  )
}
