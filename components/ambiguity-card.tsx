"use client"

import { AlertTriangle } from "lucide-react"
import { OutputCard } from "./output-card"
import { motion } from "framer-motion"

interface AmbiguityCardProps {
    issues: string[]
    index?: number
}

export function AmbiguityCard({ issues, index = 0 }: AmbiguityCardProps) {
    return (
        <OutputCard
            title="Ambiguities Detected"
            icon={<AlertTriangle className="w-4 h-4 text-warning" />}
            index={index}
            variant="warning"
        >
            <ul className="space-y-3">
                {issues.map((issue, i) => (
                    <motion.li
                        key={i}
                        className="text-sm text-foreground/80 leading-relaxed flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.12 + i * 0.05 }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-warning mt-2 shrink-0" />
                        <span>{issue}</span>
                    </motion.li>
                ))}
            </ul>
        </OutputCard>
    )
}
