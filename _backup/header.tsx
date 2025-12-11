"use client"

import { motion } from "framer-motion"

export function Header() {
    return (
        <header className="text-center py-8 sm:py-16 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
            >
                {/* MASSIVE Typography - Scaled down to fit */}
                <h1 className="text-6xl sm:text-8xl md:text-9xl leading-none font-black tracking-tighter text-foreground uppercase select-none">
                    BRIEFLY
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-2 text-muted-foreground/60 font-semibold tracking-[0.5em] text-xs sm:text-sm uppercase"
            >
                Autonomous Analysis
            </motion.div>
        </header>
    )
}
