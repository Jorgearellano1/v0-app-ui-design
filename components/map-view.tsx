"use client"

import { useState } from "react"
import { useApp } from "./providers"
import { MapPin, Lock, CheckCircle2, SettingsIcon } from "lucide-react"
import { TotemDetailModal } from "./totem-detail-modal"

interface MapViewProps {
  onNavigate: (totemId: number) => void
  completedTotems: number[]
  onSettings: () => void
}

const totems = [
  {
    id: 1,
    name: "Ancient Plaza",
    lat: 40.7128,
    lng: -74.006,
    distance: 0.3,
    story: "A historic gathering place from the 1800s",
  },
  {
    id: 2,
    name: "River Monument",
    lat: 40.758,
    lng: -73.9855,
    distance: 1.2,
    story: "Commemorates the great flood of 1901",
  },
  {
    id: 3,
    name: "Garden Statue",
    lat: 40.7614,
    lng: -73.9776,
    distance: 2.1,
    story: "Hidden sculpture by a famous local artist",
  },
  {
    id: 4,
    name: "Bridge Memorial",
    lat: 40.7061,
    lng: -74.0087,
    distance: 3.5,
    story: "Honors the builders of the city bridge",
  },
  {
    id: 5,
    name: "Park Fountain",
    lat: 40.7829,
    lng: -73.9654,
    distance: 4.8,
    story: "A gift from a sister city in 1950",
  },
]

export function MapView({ onNavigate, completedTotems, onSettings }: MapViewProps) {
  const { t } = useApp()
  const [selectedTotem, setSelectedTotem] = useState<number | null>(null)

  const getTotemStatus = (totemId: number, distance: number) => {
    if (completedTotems.includes(totemId)) return "completed"
    if (distance < 5) return "nearby"
    return "locked"
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 pb-4 flex items-center justify-between bg-card border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">{t("map.title")}</h1>
        <button onClick={onSettings} className="p-2 hover:bg-muted rounded-full transition-colors">
          <SettingsIcon className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-muted overflow-hidden">
        {/* Simulated map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* User location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-full animate-ripple" />
            <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg" />
          </div>
        </div>

        {/* Totem markers */}
        {totems.map((totem, index) => {
          const status = getTotemStatus(totem.id, totem.distance)
          const angle = index * 72 * (Math.PI / 180)
          const radius = 120
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <button
              key={totem.id}
              onClick={() => setSelectedTotem(totem.id)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-scale-in"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="relative group">
                {status === "nearby" && (
                  <div className="absolute inset-0 bg-secondary/30 rounded-full animate-ripple" />
                )}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                    status === "completed" ? "bg-success" : status === "nearby" ? "bg-secondary" : "bg-muted-foreground"
                  }`}
                >
                  {status === "completed" ? (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  ) : status === "locked" ? (
                    <Lock className="w-5 h-5 text-white" />
                  ) : (
                    <MapPin className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs font-medium text-foreground bg-card px-2 py-1 rounded-full shadow-sm">
                    {totem.distance}km
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex items-center justify-around text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-muted-foreground">{t("map.nearby")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-muted-foreground">{t("map.completed")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground" />
            <span className="text-muted-foreground">{t("map.locked")}</span>
          </div>
        </div>
      </div>

      {/* Totem Detail Modal */}
      {selectedTotem && (
        <TotemDetailModal
          totem={totems.find((t) => t.id === selectedTotem)!}
          status={getTotemStatus(selectedTotem, totems.find((t) => t.id === selectedTotem)!.distance)}
          onClose={() => setSelectedTotem(null)}
          onNavigate={() => {
            setSelectedTotem(null)
            onNavigate(selectedTotem)
          }}
        />
      )}
    </div>
  )
}
