"use client"

import { motion } from "framer-motion"
import { AnalysisResult } from "@/components/output-section"
import { Copy, Check, X } from "lucide-react"
import { useState } from "react"

interface CinematicResultProps {
    result: AnalysisResult
    onClose: () => void
}

export function CinematicResult({ result, onClose }: CinematicResultProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        const text = `AMBIGUITIES:\n${result.ambiguities.join('\n')}\n\nQUESTIONS:\n${result.questions.join('\n')}\n\nDATA SPEC:\n${result.dataSpec.map(s => `${s.name} (${s.type}): ${s.description}`).join('\n')}\n\nEMAIL:\n${result.emailDraft}`
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="relative w-full max-w-4xl max-h-[80vh] mx-6 overflow-hidden"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30" />

                {/* Main card */}
                <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-y-auto max-h-[80vh]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white">
                            Analysis Complete
                        </h2>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleCopy}
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-2 transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copied!" : "Copy All"}
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Grid of results */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Ambiguities */}
                        <motion.div
                            className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3 className="text-red-400 font-semibold mb-3 text-sm uppercase tracking-wide">
                                ⚠️ Ambiguities Detected
                            </h3>
                            <ul className="space-y-2">
                                {result.ambiguities.map((a, i) => (
                                    <li key={i} className="text-slate-300 text-sm">• {a}</li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Questions */}
                        <motion.div
                            className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-blue-400 font-semibold mb-3 text-sm uppercase tracking-wide">
                                ❓ Questions to Ask
                            </h3>
                            <ol className="space-y-2">
                                {result.questions.map((q, i) => (
                                    <li key={i} className="text-slate-300 text-sm">{i + 1}. {q}</li>
                                ))}
                            </ol>
                        </motion.div>
                    </div>

                    {/* Data Spec */}
                    {result.dataSpec.length > 0 && (
                        <motion.div
                            className="mt-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="text-emerald-400 font-semibold mb-3 text-sm uppercase tracking-wide">
                                📊 Data Specification
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-slate-500 border-b border-white/10">
                                            <th className="text-left py-2 px-3">Column</th>
                                            <th className="text-left py-2 px-3">Type</th>
                                            <th className="text-left py-2 px-3">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {result.dataSpec.map((spec, i) => (
                                            <tr key={i} className="border-b border-white/5">
                                                <td className="py-2 px-3 text-indigo-300 font-mono">{spec.name}</td>
                                                <td className="py-2 px-3 text-slate-400">{spec.type}</td>
                                                <td className="py-2 px-3 text-slate-300">{spec.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {/* Email Draft */}
                    {result.emailDraft && (
                        <motion.div
                            className="mt-6 bg-purple-500/10 border border-purple-500/20 rounded-2xl p-5"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h3 className="text-purple-400 font-semibold mb-3 text-sm uppercase tracking-wide">
                                ✉️ Ready-to-Send Reply
                            </h3>
                            <pre className="text-slate-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">
                                {result.emailDraft}
                            </pre>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}
