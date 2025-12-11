"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { RequestInput } from "@/components/request-input"
import { OutputSection, type AnalysisResult } from "@/components/output-section"
import { GridBackground } from "@/components/grid-background"
import { FeaturesGrid } from "@/components/features-grid"
import { clarifyRequest } from "@/app/actions/clarify-request"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (request: string, image?: string) => {
    setIsLoading(true)
    setResult(null)
    setError(null)

    try {
      const analysis = await clarifyRequest(request, image)
      setResult(analysis)
    } catch (err) {
      console.error("Analysis failed:", err)
      setError("Failed to analyze request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <GridBackground />
      <main className="min-h-screen flex flex-col justify-center py-12 sm:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <Header />

          <FeaturesGrid />

          <div className="mt-12">
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 text-slate-600 text-sm font-medium border border-slate-200 shadow-sm backdrop-blur-sm">
                <span className="text-base">👇</span>
                <span>Paste that confusing email from your client here:</span>
              </span>
            </div>
            <RequestInput onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                className="mt-6 text-sm text-center text-destructive"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isLoading && (
              <motion.div
                className="mt-16 flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-8 h-8 text-accent" />
                </motion.div>
                <p className="text-sm text-muted-foreground">Analyzing your request...</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {result && !isLoading && (
              <motion.div
                className="mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <OutputSection result={result} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <motion.footer
            className="mt-20 text-center text-xs text-muted-foreground/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >

            <p>Built for SnowFest Hackathon 2025 • AI & ML Track</p>
            <p className="mt-1">Transforming analyst workflows, one request at a time.</p>
          </motion.footer>
        </div>
      </main>
    </>
  )
}
