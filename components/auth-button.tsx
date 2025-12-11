"use client"

import { useDemoAuth } from "@/lib/demo-auth"
import { motion } from "framer-motion"
import { User, LogOut, LogIn, Crown } from "lucide-react"

export function AuthButton() {
    const { user, signIn, signOut, isLoading } = useDemoAuth()

    if (isLoading) {
        return (
            <div className="w-10 h-10 rounded-full bg-slate-700 animate-pulse" />
        )
    }

    if (user) {
        return (
            <div className="flex items-center gap-3">
                <motion.div
                    className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 rounded-xl border border-indigo-500/30"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <img
                        src={user.image}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                    />
                    <div className="hidden sm:block">
                        <p className="text-sm font-medium text-white truncate max-w-[120px]">
                            {user.name}
                        </p>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                            <Crown className="w-3 h-3 text-yellow-400" />
                            Free Plan
                        </p>
                    </div>
                </motion.div>
                <motion.button
                    onClick={signOut}
                    className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Sign out"
                >
                    <LogOut className="w-5 h-5" />
                </motion.button>
            </div>
        )
    }

    return (
        <motion.button
            onClick={signIn}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
        </motion.button>
    )
}
