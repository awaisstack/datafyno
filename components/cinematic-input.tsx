"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, Loader2 } from "lucide-react"

interface CinematicInputProps {
    onSubmit: (request: string) => void
    isLoading: boolean
    onExplode: () => void
}

export function CinematicInput({ onSubmit, isLoading, onExplode }: CinematicInputProps) {
    const [request, setRequest] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (request.trim() && !isLoading) {
            onExplode() // Trigger particle explosion
            onSubmit(request.trim())
            setRequest("")
        }
    }

    return (
        <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
        >
            {/* Title */}
            <motion.h1
                className="text-[8vw] sm:text-[6rem] font-black text-white tracking-tighter mb-8 select-none"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    textShadow: "0 0 80px rgba(99, 102, 241, 0.5), 0 0 160px rgba(99, 102, 241, 0.3)"
                }}
            >
                BRIEFLY
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                className="text-slate-400 text-sm tracking-[0.5em] uppercase mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
            >
                Vague → Precise
            </motion.p>

            {/* Input */}
            <motion.form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl px-6 pointer-events-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
            >
                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                        placeholder="Paste your vague stakeholder request..."
                        className="w-full py-5 px-6 pr-16 bg-white/5 backdrop-blur-xl text-white text-lg placeholder:text-slate-500 rounded-2xl border border-white/10 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-2xl shadow-black/50"
                        disabled={isLoading}
                    />

                    <motion.button
                        type="submit"
                        disabled={!request.trim() || isLoading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-600 text-white disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/30"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <ArrowUp className="w-5 h-5" />
                        )}
                    </motion.button>
                </div>
            </motion.form>

            {/* Hint */}
            <motion.p
                className="mt-6 text-slate-600 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                Press Enter to transform chaos into clarity
            </motion.p>
        </motion.div>
    )
}
