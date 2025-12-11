"use client"

import { Database } from "lucide-react"
import { OutputCard } from "./output-card"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface DataField {
    name: string
    type: string
    description: string
    required: boolean
}

interface DataSpecCardProps {
    fields: DataField[]
    index?: number
}

export function DataSpecCard({ fields, index = 0 }: DataSpecCardProps) {
    return (
        <OutputCard
            title="Proposed Data Spec"
            icon={<Database className="w-4 h-4" />}
            index={index}
        >
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border/50">
                            <th className="text-left py-2 pr-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">Column</th>
                            <th className="text-left py-2 pr-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">Type</th>
                            <th className="text-left py-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((field, i) => (
                            <motion.tr
                                key={i}
                                className="border-b border-border/30 last:border-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.12 + i * 0.05 }}
                            >
                                <td className="py-2.5 pr-4">
                                    <div className="flex items-center gap-2">
                                        <code className="text-foreground font-mono text-xs bg-secondary/50 px-1.5 py-0.5 rounded">
                                            {field.name}
                                        </code>
                                        {field.required && (
                                            <span className="text-[10px] font-medium text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">
                                                REQ
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="py-2.5 pr-4">
                                    <span className={cn(
                                        "text-xs font-mono px-1.5 py-0.5 rounded",
                                        field.type.includes("STRING") && "bg-blue-500/10 text-blue-600",
                                        field.type.includes("INT") && "bg-green-500/10 text-green-600",
                                        field.type.includes("DATE") && "bg-purple-500/10 text-purple-600",
                                        field.type.includes("FLOAT") && "bg-orange-500/10 text-orange-600",
                                        field.type.includes("BOOL") && "bg-pink-500/10 text-pink-600",
                                    )}>
                                        {field.type}
                                    </span>
                                </td>
                                <td className="py-2.5 text-muted-foreground text-xs">
                                    {field.description}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </OutputCard>
    )
}
