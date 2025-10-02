"use client"

import { useApp } from "./providers"
import { ArrowLeft, Sun, Moon, Globe } from "lucide-react"

interface SettingsProps {
  onBack: () => void
}

export function Settings({ onBack }: SettingsProps) {
  const { t, theme, setTheme, language, setLanguage } = useApp()

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 pb-4 flex items-center gap-4 bg-card border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-2xl font-bold text-foreground">{t("settings.title")}</h1>
      </div>

      {/* Settings List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Theme */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-3 block">{t("settings.theme")}</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme("light")}
              className={`p-4 rounded-xl border-2 transition-all ${
                theme === "light"
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-muted-foreground"
              }`}
            >
              <Sun className={`w-6 h-6 mx-auto mb-2 ${theme === "light" ? "text-primary" : "text-muted-foreground"}`} />
              <p className={`text-sm font-medium ${theme === "light" ? "text-primary" : "text-foreground"}`}>
                {t("settings.light")}
              </p>
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`p-4 rounded-xl border-2 transition-all ${
                theme === "dark"
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-muted-foreground"
              }`}
            >
              <Moon className={`w-6 h-6 mx-auto mb-2 ${theme === "dark" ? "text-primary" : "text-muted-foreground"}`} />
              <p className={`text-sm font-medium ${theme === "dark" ? "text-primary" : "text-foreground"}`}>
                {t("settings.dark")}
              </p>
            </button>
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-3 block">{t("settings.language")}</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setLanguage("en")}
              className={`p-4 rounded-xl border-2 transition-all ${
                language === "en"
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-muted-foreground"
              }`}
            >
              <Globe
                className={`w-6 h-6 mx-auto mb-2 ${language === "en" ? "text-primary" : "text-muted-foreground"}`}
              />
              <p className={`text-sm font-medium ${language === "en" ? "text-primary" : "text-foreground"}`}>English</p>
            </button>
            <button
              onClick={() => setLanguage("es")}
              className={`p-4 rounded-xl border-2 transition-all ${
                language === "es"
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-muted-foreground"
              }`}
            >
              <Globe
                className={`w-6 h-6 mx-auto mb-2 ${language === "es" ? "text-primary" : "text-muted-foreground"}`}
              />
              <p className={`text-sm font-medium ${language === "es" ? "text-primary" : "text-foreground"}`}>Español</p>
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-2 pt-4">
          <button className="w-full p-4 text-left rounded-xl bg-card hover:bg-muted transition-colors">
            <p className="font-medium text-foreground">{t("settings.about")}</p>
          </button>
          <button className="w-full p-4 text-left rounded-xl bg-card hover:bg-muted transition-colors">
            <p className="font-medium text-foreground">{t("settings.privacy")}</p>
          </button>
          <button className="w-full p-4 text-left rounded-xl bg-card hover:bg-muted transition-colors">
            <p className="font-medium text-foreground">{t("settings.terms")}</p>
          </button>
        </div>
      </div>
    </div>
  )
}
