"use client"

import { motion } from "framer-motion"

export function Header() {
    return (
        <header className="text-center py-8 sm:py-12">
            {/* Logo - Big & Bold */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-foreground uppercase select-none">
                    BRIEFLY
                </h1>
            </motion.div>

            {/* Killer Tagline - Hits the Pain Point */}
            <motion.p
                className="mt-4 text-lg sm:text-xl text-muted-foreground font-medium max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                <span className="text-foreground font-bold">Vague Requests?</span>{" "}
                Get Crystal-Clear Specs in Seconds.
            </motion.p>

            {/* Sub-tagline - Empathy */}
            <motion.p
                className="mt-2 text-sm text-muted-foreground/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                The AI that saves data analysts from endless email ping-pong.
            </motion.p>
        </header>
    )
}
