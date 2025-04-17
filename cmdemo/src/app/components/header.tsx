"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image";
import { cn } from "@/lib/utils"
import { useModules } from "@/app/context/modulesContext"


import { ChevronDown } from "lucide-react"
import { ThemeToggle } from "@/app/components/ui/themeToggle"
import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/app/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"


export default function Header() {
    const { modules } = useModules();
    return (
        <NavigationMenu className="flex items-center justify-between w-full md:py-2 px-4">
            <Link href="/" className="flex items-center">
                <Image src={"/assets/images/TCM-logo.webp"} alt="Logo" width={100} height={75} className="logo" />
            </Link>
            <NavigationMenuList>
                <div className="hidden md:flex md:items-center md:gap-6">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                        Home
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                            Your modules <ChevronDown className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                            <ul>
                                {modules?.map((module) => (
                                    <DropdownMenuItem key={module.title} asChild>
                                        <Link href={`/modules/${module.id}`}>{module.title}</Link>
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuItem asChild>
                                    <Link href="/modules">See all</Link>
                                </DropdownMenuItem>
                            </ul>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </NavigationMenuList>
            <ThemeToggle />
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ComponentRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild className="rounded-lg">
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"