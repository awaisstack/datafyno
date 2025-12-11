"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface OutputCardProps {
    title: string
    icon?: ReactNode
    children: ReactNode
    index?: number
    variant?: "default" | "warning" | "success" | "info"
}

const variantStyles = {
    default: "border-border/50",
    warning: "border-warning/30 bg-gradient-to-br from-card to-warning/5",
    success: "border-success/30 bg-gradient-to-br from-card to-success/5",
    info: "border-accent/30 bg-gradient-to-br from-card to-accent/5",
}

export function OutputCard({ title, icon, children, index = 0, variant = "default" }: OutputCardProps) {
    return (
        <motion.section
            className={cn(
                "bg-card rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border",
                variantStyles[variant]
            )}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.5,
                delay: index * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{
                y: -4,
                boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
            }}
        >
            <div className="flex items-center gap-2 mb-4">
                {icon && <span className="text-muted-foreground">{icon}</span>}
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">{title}</h2>
            </div>
            <div>{children}</div>
        </motion.section>
    )
}
