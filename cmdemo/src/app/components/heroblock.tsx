import Image from "next/image"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"

export default function HeroBlock() {
    return (
        <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-12 flex justify-center">
            <div className="grid items-center gap-6 md:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-primary font-serif text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Welcome to The Coaching Masters learning hub
                        </h1>
                        <p className="text-lg text-muted-foreground md:text-xl">
                            Browse your modules to begin your learning journey
                        </p>
                    </div>
                    <div className="flex justify-end">
                        <Button asChild size="lg" className="mt-2 mr-5">
                            <Link href="/modules">Get Started</Link>
                        </Button>
                    </div>
                </div>
                <div className="flex justify-center md:justify-end">
                    <div className="relative h-[300px] w-full overflow-hidden rounded-lg bg-muted sm:h-[350px] md:h-[400px] shadow-2xl">
                        <Image
                            src="/assets/images/online-study-nomad.webp"
                            alt="A coach studying online in a cafe"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section >
    )
}
