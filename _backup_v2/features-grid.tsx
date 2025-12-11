"use client"

import { motion } from "framer-motion"
import { ScanSearch, MessageSquareText, FileCode2, ArrowRight } from "lucide-react"

const features = [
    {
        icon: ScanSearch,
        title: "Detect Ambiguity",
        desc: "Spots vague terms, missing context, and undefined scope instantly.",
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/20"
    },
    {
        icon: MessageSquareText,
        title: "Auto-Clarify",
        desc: "Generates the exact follow-up questions you should ask.",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20"
    },
    {
        icon: FileCode2,
        title: "Generate Spec",
        desc: "Outputs SQL/Python-ready data requirements. Copy & paste.",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/20"
    }
]

export function FeaturesGrid() {
    return (
        <div className="max-w-4xl mx-auto mt-8 mb-8 px-4">
            {/* Flow indicator */}
            <motion.div
                className="flex items-center justify-center gap-2 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <span className="text-xs text-muted-foreground tracking-widest uppercase font-semibold">
                    How it works
                </span>
            </motion.div>

            {/* Feature cards with arrows */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + (i * 0.15), duration: 0.5 }}
                    >
                        <motion.div
                            className={`flex flex-col items-center text-center p-5 rounded-2xl border-2 ${f.borderColor} ${f.bgColor} shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-full md:w-auto min-w-[180px]`}
                            whileHover={{ y: -5 }}
                        >
                            <div className={`h-12 w-12 ${f.color} mb-3 ${f.bgColor} rounded-xl flex items-center justify-center`}>
                                <f.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-foreground text-sm uppercase tracking-wide mb-1">
                                {f.title}
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {f.desc}
                            </p>
                        </motion.div>

                        {/* Arrow between cards */}
                        {i < features.length - 1 && (
                            <motion.div
                                className="hidden md:block text-muted-foreground/30"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + (i * 0.15) }}
                            >
                                <ArrowRight className="w-6 h-6" />
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
