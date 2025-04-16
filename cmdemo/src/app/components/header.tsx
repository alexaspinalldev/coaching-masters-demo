import Image from "next/image";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/app/components/ui/navigationMenu"
import { ThemeToggle } from "@/app/components/ui/themeToggle";

export default function Header() {
    return (
        <div className="w-full flex shadow-sm sticky top-0 z-50">
            <NavigationMenu className="flex items-center justify-between w-inherit md:py-2 px-4">
                <Link href="/" className="flex items-center">
                    <Image src={"/assets/images/TCM-logo.webp"} alt="Logo" width={100} height={100} className="logo" />
                </Link>
                {/* // TODO: This looks pretty rough, need to refer to docs usage */}
                <NavigationMenuList>
                    <NavigationMenuItem >
                        <NavigationMenuLink href="/" >
                            Home
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Modules</NavigationMenuTrigger>
                        <NavigationMenuContent className="w-full">
                            Your modules:
                            {/* // TODO: Map modules here */}
                            <NavigationMenuLink>Link</NavigationMenuLink>
                            <NavigationMenuLink>Link</NavigationMenuLink>
                            <NavigationMenuLink>Link</NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <ThemeToggle />
            </NavigationMenu>
        </div>

    );
}