"use client"

import { useDemoAuth } from "@/lib/demo-auth"
import { motion } from "framer-motion"
import { Sparkles, Mail, Zap, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SignInPage() {
    const { user, signIn } = useDemoAuth()
    const router = useRouter()

    // If already signed in, redirect to home
    useEffect(() => {
        if (user) {
            router.push("/")
        }
    }, [user, router])

    const handleSignIn = () => {
        signIn()
        router.push("/")
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
            {/* Background glow */}
            <motion.div
                className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 60%)",
                    filter: "blur(80px)",
                }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 60%)",
                    filter: "blur(80px)",
                }}
                animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Sign in card */}
            <motion.div
                className="relative z-10 w-full max-w-md p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            className="inline-flex items-center gap-2 mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles className="w-8 h-8 text-indigo-400" />
                            </motion.div>
                            <span className="text-3xl font-black text-white">DATAFYNO</span>
                        </motion.div>
                        <h1 className="text-2xl font-bold text-white mb-2">Get Started Free</h1>
                        <p className="text-slate-400">No credit card required</p>
                    </div>

                    {/* Benefits */}
                    <div className="mb-8 space-y-3">
                        {[
                            { icon: Zap, text: "25 analyses per month (vs 5 as guest)" },
                            { icon: Mail, text: "Save history & use templates" },
                            { icon: Sparkles, text: "Early access to new features" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 text-slate-300"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                            >
                                <item.icon className="w-5 h-5 text-indigo-400" />
                                <span className="text-sm">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Sign In Button */}
                    <motion.button
                        onClick={handleSignIn}
                        className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <CheckCircle className="w-5 h-5" />
                        Continue as Demo User
                    </motion.button>

                    {/* Footer */}
                    <p className="text-center text-xs text-slate-500 mt-6">
                        One-click sign in for hackathon demo
                    </p>
                </div>

                {/* Back to home */}
                <motion.a
                    href="/"
                    className="block text-center text-slate-400 hover:text-white mt-6 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    ← Back to home
                </motion.a>
            </motion.div>
        </div>
    )
}
