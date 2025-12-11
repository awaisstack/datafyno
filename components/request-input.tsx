"use client"


import type React from "react"
import { useState, useRef } from "react"
import { ArrowUp, Loader2, Sparkles, Paperclip, X } from "lucide-react"
import { motion } from "framer-motion"

interface RequestInputProps {
    onSubmit: (request: string, image?: string) => void
    isLoading: boolean
}

const EXAMPLES = [
    { label: "Marketing asked for 'campaign data'...", text: "Hey, can you pull the numbers for the last campaign? We need to see how it did." },
    { label: "The CEO wants 'churn stats'...", text: "I need the customer data for everyone who left recently. The board is asking." },
    { label: "Sales needs 'Q3 report'...", text: "Can you get me the sales figures for last quarter? Just a quick dump is fine." },
    { label: "Product manager: 'Is usage up?'", text: "Show me the retention metrics for the new feature. Is it working?" },
]

export function RequestInput({ onSubmit, isLoading }: RequestInputProps) {
    const [request, setRequest] = useState("")
    const [isFocused, setIsFocused] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if ((request.trim() || selectedImage) && !isLoading) {
            onSubmit(request.trim(), selectedImage || undefined)
            setSelectedImage(null)
            setRequest("")
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("Image too large. Please select an image under 5MB.")
                return
            }
            const reader = new FileReader()
            reader.onloadend = () => {
                setSelectedImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    // handleExampleClick is no longer used, removing it

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <form onSubmit={handleSubmit}>

                <div className="relative flex flex-col items-center">
                    {/* Image Preview */}
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute -top-24 left-0 z-20"
                        >
                            <div className="relative group">
                                <img src={selectedImage} alt="Preview" className="h-20 w-auto rounded-lg border border-border shadow-lg" />
                                <button
                                    type="button"
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    <motion.div
                        className="absolute inset-0 rounded-2xl bg-accent/5 blur-xl"
                        initial={false}
                        animate={{
                            scale: isFocused ? 1.02 : 1,
                            opacity: isFocused ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    <div className="relative w-full">
                        <Sparkles className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/40" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={request}
                            onChange={(e) => setRequest(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder={selectedImage ? "Describe this screenshot..." : 'e.g., "Hey, can you pull the sales numbers for the last campaign?"'}
                            className="w-full py-5 pl-14 pr-24 bg-white text-base text-foreground placeholder:text-muted-foreground/50 rounded-3xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border-2 border-primary/10 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all hover:shadow-[0_12px_50px_-12px_rgba(0,0,0,0.15)] hover:border-primary/20"
                            disabled={isLoading}
                        />

                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept="image/*"
                                className="hidden"
                            />
                            <motion.button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Paperclip className="w-4 h-4" />
                            </motion.button>

                            <motion.button
                                type="submit"
                                disabled={(!request.trim() && !selectedImage) || isLoading}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent text-white disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <ArrowUp className="w-4 h-4" />
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Example chips */}
            <motion.div
                className="mt-4 flex flex-wrap gap-2 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
            >
                <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                    {EXAMPLES.map((example, i) => (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + (i * 0.1) }}
                            onClick={() => {
                                setRequest(example.text)
                                if (inputRef.current) inputRef.current.focus()
                            }}
                            className="px-4 py-2 text-xs md:text-sm font-medium text-muted-foreground/80 bg-background/40 hover:bg-background/80 hover:text-foreground hover:shadow-sm border border-border/50 rounded-full transition-all duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {example.label}
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}
