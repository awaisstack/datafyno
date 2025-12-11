"use client"

import { useState } from "react"
import { HelpCircle, Copy, Check } from "lucide-react"
import { OutputCard } from "./output-card"
import { motion } from "framer-motion"

interface QuestionsCardProps {
    questions: string[]
    index?: number
}

export function QuestionsCard({ questions, index = 0 }: QuestionsCardProps) {
    const [copied, setCopied] = useState(false)

    const handleCopyAll = async () => {
        const text = questions.map((q, i) => `${i + 1}. ${q}`).join("\n")
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <OutputCard
            title="Questions to Ask"
            icon={<HelpCircle className="w-4 h-4 text-accent" />}
            index={index}
            variant="info"
        >
            <ol className="space-y-3">
                {questions.map((question, i) => (
                    <motion.li
                        key={i}
                        className="text-sm text-foreground/80 leading-relaxed flex gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.12 + i * 0.05 }}
                    >
                        <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-medium flex items-center justify-center shrink-0">
                            {i + 1}
                        </span>
                        <span className="pt-0.5">{question}</span>
                    </motion.li>
                ))}
            </ol>
            <motion.button
                onClick={handleCopyAll}
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {copied ? (
                    <>
                        <Check className="w-3.5 h-3.5 text-success" />
                        Copied!
                    </>
                ) : (
                    <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy all questions
                    </>
                )}
            </motion.button>
        </OutputCard>
    )
}
