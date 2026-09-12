import { Moon, Sun } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Theme = "light" | "dark" | "system"

const STORAGE_KEY = "theme"

interface ModeToggleProps {
  className?: string
}

function getSystemTheme(): Exclude<Theme, "system"> {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function resolveTheme(theme: Theme): Exclude<Theme, "system"> {
  return theme === "system" ? getSystemTheme() : theme
}

function applyTheme(theme: Theme) {
  const resolvedTheme = resolveTheme(theme)
  const isDark = resolvedTheme === "dark"

  document.documentElement.classList.toggle("dark", isDark)
  document.documentElement.style.colorScheme = resolvedTheme
}

export function ModeToggle({ className }: ModeToggleProps) {
  const [theme, setThemeState] = React.useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = React.useState<Exclude<Theme, "system">>("light")

  React.useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY)
    const nextTheme: Theme =
      savedTheme === "light" || savedTheme === "dark" || savedTheme === "system" ? savedTheme : "system"

    setThemeState(nextTheme)
    setResolvedTheme(resolveTheme(nextTheme))
    applyTheme(nextTheme)
  }, [])

  React.useEffect(() => {
    applyTheme(theme)
    setResolvedTheme(resolveTheme(theme))
    localStorage.setItem(STORAGE_KEY, theme)

    if (theme !== "system") return

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      applyTheme("system")
      setResolvedTheme(getSystemTheme())
    }

    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [theme])

  const toggleTheme = () => {
    const currentTheme = resolveTheme(theme)
    setThemeState(currentTheme === "dark" ? "light" : "dark")
  }

  const nextTheme = resolvedTheme === "dark" ? "light" : "dark"

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("relative text-foreground-2", className)}
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Switch to {nextTheme} theme</span>
    </Button>
  )
}
