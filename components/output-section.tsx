"use client"

import { motion } from "framer-motion"
import { AmbiguityCard } from "./ambiguity-card"
import { QuestionsCard } from "./questions-card"
import { DataSpecCard } from "./data-spec-card"
import { EmailDraftCard } from "./email-draft-card"

export interface AnalysisResult {
    ambiguities: string[]
    questions: string[]
    dataSpec: { name: string; type: string; description: string; required: boolean }[]
    emailDraft: string
}

interface OutputSectionProps {
    result: AnalysisResult
}

export function OutputSection({ result }: OutputSectionProps) {
    return (
        <motion.div
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Section header */}
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h2 className="text-lg font-semibold text-foreground">Analysis Complete</h2>
                <p className="text-sm text-muted-foreground mt-1">Here&apos;s what we found in your request</p>
            </motion.div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <AmbiguityCard issues={result.ambiguities} index={0} />
                <QuestionsCard questions={result.questions} index={1} />
            </div>

            {/* Full width cards */}
            <DataSpecCard fields={result.dataSpec} index={2} />
            <EmailDraftCard emailContent={result.emailDraft} index={3} />
        </motion.div>
    )
}
