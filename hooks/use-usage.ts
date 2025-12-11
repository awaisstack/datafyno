"use client"

import { useState, useEffect } from "react"

const GUEST_LIMIT = 5
const SIGNED_IN_LIMIT = 25

interface UsageData {
    count: number
    month: string
}

export function useUsage(userId: string | null) {
    const [usage, setUsage] = useState<UsageData>({ count: 0, month: "" })
    const [canAnalyze, setCanAnalyze] = useState(true)

    const storageKey = userId ? `briefly_usage_${userId}` : "briefly_usage_guest"
    const limit = userId ? SIGNED_IN_LIMIT : GUEST_LIMIT

    useEffect(() => {
        const currentMonth = new Date().toISOString().slice(0, 7) // "2024-12"
        const stored = localStorage.getItem(storageKey)

        if (stored) {
            const data: UsageData = JSON.parse(stored)
            // Reset if new month (for signed-in users)
            if (userId && data.month !== currentMonth) {
                setUsage({ count: 0, month: currentMonth })
                setCanAnalyze(true)
            } else {
                setUsage(data)
                setCanAnalyze(data.count < limit)
            }
        } else {
            setUsage({ count: 0, month: currentMonth })
            setCanAnalyze(true)
        }
    }, [storageKey, limit, userId])

    const incrementUsage = () => {
        const currentMonth = new Date().toISOString().slice(0, 7)
        const newUsage = { count: usage.count + 1, month: currentMonth }
        setUsage(newUsage)
        localStorage.setItem(storageKey, JSON.stringify(newUsage))
        setCanAnalyze(newUsage.count < limit)
        return newUsage.count < limit
    }

    const remaining = Math.max(0, limit - usage.count)

    return {
        usage,
        canAnalyze,
        incrementUsage,
        remaining,
        limit,
        isGuest: !userId,
    }
}
