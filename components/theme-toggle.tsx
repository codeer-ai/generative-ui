"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0 border-[#e6e6e6] hover:border-[#0969da] hover:bg-[#f6f8fa]"
        disabled
      >
        <div className="w-4 h-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-8 w-8 p-0 border-[#e6e6e6] hover:border-[#0969da] hover:bg-[#f6f8fa] dark:border-[#30363d] dark:hover:border-[#58a6ff] dark:hover:bg-[#21262d]"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}