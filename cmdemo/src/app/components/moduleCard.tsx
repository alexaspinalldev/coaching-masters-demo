import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

interface ClickableCardProps {
    title: string | null
    description: string | null
    href: string
}

export default function ClickableCard({ title, description, href }: ClickableCardProps) {
    return (
        <Link href={href} className="block w-full no-underline hover:shadow-sm mb-3 group">
            <Card className="w-full transition-all duration-300 hover:bg-muted ">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg sm:text-xl group-hover:text-primary">{title}</CardTitle>
                    <div className="h-px w-full bg-slate-200" />
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        </Link>
    )
}
