"use client"

import { useState } from "react"
import { Mail, Copy, Check, ExternalLink } from "lucide-react"
import { OutputCard } from "./output-card"
import { motion } from "framer-motion"

interface EmailDraftCardProps {
    emailContent: string
    index?: number
}

export function EmailDraftCard({ emailContent, index = 0 }: EmailDraftCardProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(emailContent)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleOpenGmail = () => {
        const subject = encodeURIComponent("Quick clarification on your request")
        const body = encodeURIComponent(emailContent)
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`, '_blank')
    }

    return (
        <OutputCard
            title="Ready-to-Send Reply"
            icon={<Mail className="w-4 h-4 text-success" />}
            index={index}
            variant="success"
        >
            <div className="space-y-4">
                <motion.div
                    className="bg-secondary/30 rounded-xl p-4 border border-border/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.12 + 0.1 }}
                >
                    <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed font-mono">
                        {emailContent}
                    </p>
                </motion.div>

                <div className="flex gap-2 flex-wrap">
                    <motion.button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-secondary border border-border/30"
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
                                Copy to clipboard
                            </>
                        )}
                    </motion.button>

                    <motion.button
                        onClick={handleOpenGmail}
                        className="inline-flex items-center gap-1.5 text-xs bg-accent text-white px-3 py-2 rounded-lg shadow-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Open in Gmail
                    </motion.button>
                </div>
            </div>
        </OutputCard>
    )
}
