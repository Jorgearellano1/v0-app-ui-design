"use client"

import { useApp } from "./providers"
import { Button } from "./ui/button"
import { X, Navigation, Camera } from "lucide-react"

interface TotemDetailModalProps {
  totem: {
    id: number
    name: string
    distance: number
    story: string
  }
  status: "nearby" | "locked" | "completed"
  onClose: () => void
  onNavigate: () => void
}

export function TotemDetailModal({ totem, status, onClose, onNavigate }: TotemDetailModalProps) {
  const { t } = useApp()

  return (
    <div className="fixed inset-0 z-50 flex items-end animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full bg-card rounded-t-3xl p-6 animate-slide-up shadow-2xl">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors">
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Image placeholder */}
        <div className="w-full h-48 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl mb-6 flex items-center justify-center">
          <Camera className="w-16 h-16 text-white/50" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{totem.name}</h2>
            <p className="text-muted-foreground leading-relaxed">{totem.story}</p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div
              className={`px-3 py-1 rounded-full ${
                status === "completed"
                  ? "bg-success/20 text-success"
                  : status === "nearby"
                    ? "bg-secondary/20 text-secondary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {t(`map.${status}`)}
            </div>
            <span className="text-muted-foreground">
              {totem.distance}km {t("map.distance")}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={onNavigate}
              className="flex-1 h-12 text-base font-semibold rounded-xl"
              disabled={status === "completed"}
            >
              <Navigation className="w-5 h-5 mr-2" />
              {t("map.navigate")}
            </Button>
            {status === "nearby" && (
              <Button
                onClick={onNavigate}
                variant="outline"
                className="flex-1 h-12 text-base font-semibold rounded-xl bg-transparent"
              >
                <Camera className="w-5 h-5 mr-2" />
                {t("map.viewAR")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
