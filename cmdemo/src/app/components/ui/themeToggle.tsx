"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/app/components/ui/button"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <Button variant="outline" size="icon" onClick={toggleTheme}>
            {!theme ? null : theme === "dark" ? (
                <Sun className="absolute h-[1.2rem] w-[1.2rem]" />
            ) : (
                <Moon className="absolute h-[1.2rem] w-[1.2rem]" />)}

            <span className="sr-only">Toggle theme</span>
        </Button >)
}
