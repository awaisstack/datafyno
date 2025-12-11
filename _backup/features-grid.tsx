"use client"

import { motion } from "framer-motion"
import { ScanSearch, MessageSquareText, FileCode2 } from "lucide-react"

const features = [
    {
        icon: ScanSearch,
        title: "Detect Ambiguity",
        desc: "Instantly spots vague terms and missing context in stakeholder emails."
    },
    {
        icon: MessageSquareText,
        title: "Auto-Clarify",
        desc: "Generates the exact follow-up questions you need to ask."
    },
    {
        icon: FileCode2,
        title: "Generate Spec",
        desc: "Outputs clear, technical data requirements ready for SQL/Python."
    }
]

export function FeaturesGrid() {
    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-10 mb-10 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
        >
            {features.map((f, i) => (
                <motion.div
                    key={i}
                    className="flex flex-col items-center text-center p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-lg hover:shadow-xl hover:border-primary/30 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                >
                    <div className="h-12 w-12 text-primary mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                        <f.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-foreground text-base mb-2">
                        {f.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {f.desc}
                    </p>
                </motion.div>
            ))}
        </motion.div>
    )
}
