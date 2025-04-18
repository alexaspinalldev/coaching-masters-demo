"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/app/components/ui/button"

export function ThemeToggle() {
    const { setTheme, theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Confirm if the component is now mounted
    useEffect(() => {
        setMounted(true)
    }, [])

    const isDark = resolvedTheme === 'dark'

    return (
        <Button variant="outline" size="icon" onClick={() => setTheme(isDark ? 'light' : 'dark')}>
            {!mounted ? null :
                (!theme ? null : theme === "dark" ? (
                    <Sun className="absolute h-[1.2rem] w-[1.2rem]" />
                ) : (
                    <Moon className="absolute h-[1.2rem] w-[1.2rem]" />))
            }

            <span className="sr-only">Toggle theme</span>
        </Button >)
}
