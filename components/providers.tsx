"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Theme = "light" | "dark"
type Language = "en" | "es"

interface AppContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const translations = {
  en: {
    // Onboarding
    "onboarding.welcome": "Explore the city and discover hidden Totems",
    "onboarding.map.title": "We guide you with a map",
    "onboarding.map.desc": "Navigate to points of interest and discover their stories",
    "onboarding.ar.title": "See Totems in AR",
    "onboarding.ar.desc": "When you're close, view the Totem in augmented reality",
    "onboarding.offline.title": "Works without camera",
    "onboarding.offline.desc": "You can explore even without AR capabilities",
    "onboarding.next": "Next",
    "onboarding.skip": "Skip",
    "onboarding.start": "Start Exploring",

    // Map
    "map.title": "Explore",
    "map.nearby": "Nearby",
    "map.completed": "Completed",
    "map.locked": "Locked",
    "map.distance": "away",
    "map.navigate": "Navigate",
    "map.viewAR": "View in AR",

    // Navigation
    "nav.heading": "Navigation",
    "nav.distance": "Distance",
    "nav.time": "min",
    "nav.arriving": "Almost there!",
    "nav.continue": "Keep going straight",
    "nav.turnLeft": "Turn left",
    "nav.turnRight": "Turn right",

    // AR
    "ar.title": "AR View",
    "ar.scanning": "Scanning environment...",
    "ar.found": "Totem found!",
    "ar.interact": "Tap to interact",
    "ar.close": "You're close! Enable AR to see the Totem",
    "ar.permission": "Camera permission needed for AR experience",
    "ar.grant": "Grant Permission",

    // Rewards
    "rewards.unlocked": "Totem Unlocked!",
    "rewards.progress": "Progress",
    "rewards.completed": "completed",
    "rewards.next": "Next Totem",
    "rewards.backToMap": "Back to Map",
    "rewards.allComplete": "You did it!",
    "rewards.collection": "Your Collection",
    "rewards.share": "Share",

    // Permissions
    "permission.location.title": "Location Access",
    "permission.location.desc":
      "To guide you better, we need your location. You can continue in map mode if you prefer.",
    "permission.camera.title": "Camera Access",
    "permission.camera.desc": "Enable camera to experience AR totems.",
    "permission.allow": "Allow",
    "permission.notNow": "Not Now",

    // Settings
    "settings.title": "Settings",
    "settings.theme": "Theme",
    "settings.language": "Language",
    "settings.light": "Light",
    "settings.dark": "Dark",
    "settings.about": "About",
    "settings.privacy": "Privacy Policy",
    "settings.terms": "Terms of Service",
  },
  es: {
    // Onboarding
    "onboarding.welcome": "Explora la ciudad y descubre Tótems escondidos",
    "onboarding.map.title": "Te guiamos con un mapa",
    "onboarding.map.desc": "Navega a puntos de interés y descubre sus historias",
    "onboarding.ar.title": "Ve Tótems en AR",
    "onboarding.ar.desc": "Cuando estés cerca, verás el Tótem en realidad aumentada",
    "onboarding.offline.title": "Funciona sin cámara",
    "onboarding.offline.desc": "Puedes explorar incluso sin capacidades AR",
    "onboarding.next": "Siguiente",
    "onboarding.skip": "Saltar",
    "onboarding.start": "Comenzar a Explorar",

    // Map
    "map.title": "Explorar",
    "map.nearby": "Cercano",
    "map.completed": "Completado",
    "map.locked": "Bloqueado",
    "map.distance": "de distancia",
    "map.navigate": "Navegar",
    "map.viewAR": "Ver en AR",

    // Navigation
    "nav.heading": "Navegación",
    "nav.distance": "Distancia",
    "nav.time": "min",
    "nav.arriving": "¡Casi llegas!",
    "nav.continue": "Sigue recto",
    "nav.turnLeft": "Gira a la izquierda",
    "nav.turnRight": "Gira a la derecha",

    // AR
    "ar.title": "Vista AR",
    "ar.scanning": "Escaneando entorno...",
    "ar.found": "¡Tótem encontrado!",
    "ar.interact": "Toca para interactuar",
    "ar.close": "¡Estás cerca! Activa AR para ver el Tótem",
    "ar.permission": "Se necesita permiso de cámara para la experiencia AR",
    "ar.grant": "Conceder Permiso",

    // Rewards
    "rewards.unlocked": "¡Tótem Desbloqueado!",
    "rewards.progress": "Progreso",
    "rewards.completed": "completados",
    "rewards.next": "Siguiente Tótem",
    "rewards.backToMap": "Volver al Mapa",
    "rewards.allComplete": "¡Lo lograste!",
    "rewards.collection": "Tu Colección",
    "rewards.share": "Compartir",

    // Permissions
    "permission.location.title": "Acceso a Ubicación",
    "permission.location.desc":
      "Para guiarte mejor, necesitamos tu ubicación. Puedes seguir en modo mapa si prefieres.",
    "permission.camera.title": "Acceso a Cámara",
    "permission.camera.desc": "Activa la cámara para experimentar tótems en AR.",
    "permission.allow": "Permitir",
    "permission.notNow": "Ahora No",

    // Settings
    "settings.title": "Configuración",
    "settings.theme": "Tema",
    "settings.language": "Idioma",
    "settings.light": "Claro",
    "settings.dark": "Oscuro",
    "settings.about": "Acerca de",
    "settings.privacy": "Política de Privacidad",
    "settings.terms": "Términos de Servicio",
  },
}

export function Providers({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Check system preference
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setThemeState(isDark ? "dark" : "light")

    // Check saved preferences
    const savedTheme = localStorage.getItem("theme") as Theme
    const savedLanguage = localStorage.getItem("language") as Language

    if (savedTheme) setThemeState(savedTheme)
    if (savedLanguage) setLanguage(savedLanguage)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return <AppContext.Provider value={{ theme, setTheme, language, setLanguage, t }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within Providers")
  return context
}
