"use client"

import { AnimatePresence } from "framer-motion";
import { motion } from "motion/react"
import { usePathname } from 'next/navigation';

export default function AnimationPresenceWrapper({ children }: Readonly<{ children: React.ReactNode; }>) {
    // Pathname for page transitions
    const pathname = usePathname();
    return (
        <AnimatePresence mode="wait" >
            <motion.main
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: .4, ease: 'easeInOut' }}
            >
                <main>{children}</main>
            </motion.main>
        </AnimatePresence>
    );
}