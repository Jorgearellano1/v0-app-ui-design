"use client"

import { useState, useEffect } from "react"
import { useApp } from "./providers"
import { X, Camera } from "lucide-react"

interface ARViewProps {
  totemId: number
  onComplete: () => void
  onBack: () => void
}

export function ARView({ totemId, onComplete, onBack }: ARViewProps) {
  const { t } = useApp()
  const [isScanning, setIsScanning] = useState(true)
  const [totemFound, setTotemFound] = useState(false)

  useEffect(() => {
    // Simulate AR scanning
    const scanTimer = setTimeout(() => {
      setIsScanning(false)
      setTotemFound(true)
    }, 2000)

    return () => clearTimeout(scanTimer)
  }, [])

  const handleInteract = () => {
    onComplete()
  }

  return (
    <div className="h-screen relative bg-black">
      {/* Simulated camera view */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900">
        {/* Camera overlay effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
        </div>

        {/* Scanning overlay */}
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-64 h-64 border-4 border-primary rounded-lg animate-pulse">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white" />
              </div>
              <p className="text-white text-center mt-4 font-medium">{t("ar.scanning")}</p>
            </div>
          </div>
        )}

        {/* 3D Totem (simulated) */}
        {totemFound && (
          <div className="absolute inset-0 flex items-center justify-center animate-scale-in">
            <div className="relative">
              {/* Totem visualization */}
              <div className="w-48 h-64 bg-gradient-to-b from-primary via-secondary to-accent rounded-lg shadow-2xl transform perspective-1000 rotate-y-12 animate-pulse-slow">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full mb-4" />
                  <div className="w-full h-2 bg-white/20 rounded mb-2" />
                  <div className="w-3/4 h-2 bg-white/20 rounded mb-2" />
                  <div className="w-1/2 h-2 bg-white/20 rounded" />
                </div>
              </div>

              {/* Interaction prompt */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <button
                  onClick={handleInteract}
                  className="bg-white text-foreground px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform animate-pulse"
                >
                  {t("ar.interact")}
                </button>
              </div>

              {/* Success indicator */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div className="bg-success text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                  {t("ar.found")}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
        <button
          onClick={onBack}
          className="p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        <div className="glass px-4 py-2 rounded-full">
          <p className="text-white font-semibold">{t("ar.title")}</p>
        </div>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="glass rounded-2xl p-4 text-center">
          <Camera className="w-8 h-8 text-white mx-auto mb-2" />
          <p className="text-white/80 text-sm">Move your device to explore the totem</p>
        </div>
      </div>
    </div>
  )
}
