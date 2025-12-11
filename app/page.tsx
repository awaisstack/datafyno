"use client"

import { useState, useEffect } from "react"
import { useDemoAuth } from "@/lib/demo-auth"
import { clarifyRequest } from "@/app/actions/clarify-request"
import { motion, AnimatePresence } from "framer-motion"
import { type AnalysisResult } from "@/components/output-section"
import { AuthButton } from "@/components/auth-button"
import { useUsage } from "@/hooks/use-usage"
import {
  Sparkles, Zap, Target, FileCode2, MessageSquare, AlertTriangle, Mail, Copy, Check,
  ArrowRight, Flame, Rocket, Database, Table, BarChart3, LineChart, PieChart,
  FileSpreadsheet, Code, Terminal, Binary, Calculator, Hash, TrendingUp, Sigma,
  LayoutGrid, Menu, X, History, Lightbulb, BookOpen, Settings, HelpCircle,
  ChevronRight, Folder, Send, Globe, Minus, Square, Lock, Crown, DollarSign,
  Plus, Activity, Moon
} from "lucide-react"

// Example prompts for users
const examplePrompts = [
  "Can you pull the sales numbers for the last campaign?",
  "I need a report on customer churn by tomorrow",
  "Just get me the data from Q3, you know which one",
  "Marketing wants to see the engagement metrics",
  "Can you analyze the user retention trends?",
]

export default function DatafynoULTRA() {
  const { user } = useDemoAuth()
  const { canAnalyze, incrementUsage, remaining, limit, isGuest } = useUsage(user?.id || null)

  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [request, setRequest] = useState("")
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showAnimations, setShowAnimations] = useState(true)
  const [showLimitModal, setShowLimitModal] = useState(false)
  const [showPricingModal, setShowPricingModal] = useState(false)
  const [showExamplesModal, setShowExamplesModal] = useState(false)
  const [showComingSoonModal, setShowComingSoonModal] = useState(false)
  const [comingSoonFeature, setComingSoonFeature] = useState("")
  const [settingsTheme, setSettingsTheme] = useState("Dark")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async () => {
    if (!request.trim() || isLoading) return

    // Check usage limits
    if (!canAnalyze) {
      setShowLimitModal(true)
      return
    }

    setIsLoading(true)
    setResult(null)
    setShowFlash(true)
    setTimeout(() => setShowFlash(false), 200)

    try {
      const analysis = await clarifyRequest(request)
      setShowFlash(true)
      setTimeout(() => setShowFlash(false), 300)
      setResult(analysis)
      incrementUsage() // Track usage after successful analysis
    } catch (err) {
      console.error("Translation failed:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    if (!result) return
    const text = `AMBIGUITIES:\n${result.ambiguities.join('\n')}\n\nQUESTIONS:\n${result.questions.join('\n')}\n\nDATA SPEC:\n${result.dataSpec.map(s => `${s.name} (${s.type}): ${s.description}`).join('\n')}\n\nEMAIL:\n${result.emailDraft}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
    if (!sidebarOpen) {
      setShowAnimations(false)
    } else {
      setShowAnimations(true)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* FLASH EFFECT */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            className="fixed inset-0 z-50 bg-white pointer-events-none"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={toggleSidebar}
            />

            {/* Sidebar Panel - Widened */}
            <motion.div
              className="absolute left-0 top-0 h-full w-80 bg-slate-900/95 border-r border-indigo-500/30 shadow-[10px_0_30px_-5px_rgba(79,70,229,0.3)]"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="p-6">
                {/* Logo */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-white tracking-tight">DATAFYNO</h2>
                  <button onClick={toggleSidebar} className="p-2 hover:bg-white/10 rounded-lg">
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="space-y-2">
                  {[
                    { icon: Sparkles, label: "New Analysis", active: true, action: () => { toggleSidebar() } },
                    { icon: Lightbulb, label: "Examples", active: false, action: () => { setShowExamplesModal(true); toggleSidebar() } },
                    { icon: History, label: "History", active: false, action: () => { setComingSoonFeature("History"); setShowComingSoonModal(true); toggleSidebar() } },
                    { icon: Folder, label: "Saved Queries", active: false, action: () => { setComingSoonFeature("Saved Queries"); setShowComingSoonModal(true); toggleSidebar() } },
                    { icon: BookOpen, label: "Templates", active: false, action: () => { setComingSoonFeature("Templates"); setShowComingSoonModal(true); toggleSidebar() } },
                    { icon: DollarSign, label: "Pricing", active: false, action: () => { setShowPricingModal(true); toggleSidebar() } },
                  ].map((item, i) => (
                    <motion.button
                      key={item.label}
                      onClick={item.action}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {item.active && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </motion.button>
                  ))}
                </nav>

                {/* Divider */}
                <div className="my-6 border-t border-white/10" />

                {/* Settings */}
                <div className="space-y-2">
                  <button
                    onClick={() => { setComingSoonFeature("Settings"); setShowComingSoonModal(true); toggleSidebar() }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                  </button>
                  <button
                    onClick={() => { setComingSoonFeature("Help"); setShowComingSoonModal(true); toggleSidebar() }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <HelpCircle className="w-5 h-5" />
                    <span className="font-medium">Help</span>
                  </button>
                </div>

                {/* Usage Counter */}
                <div className="mt-6 p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">Analyses Used</span>
                    <span className="text-xs text-indigo-400 font-bold">{limit - remaining} / {limit}</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${((limit - remaining) / limit) * 100}%` }}
                    />
                  </div>
                  {isGuest && (
                    <p className="text-[10px] text-slate-500 mt-2">Sign in for 25 analyses/month</p>
                  )}
                </div>

                {/* Auth Section */}
                <div className="mt-6">
                  <AuthButton />
                </div>

                {/* Pro Badge */}
                <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-bold text-white">Powered by Gemini AI</span>
                  </div>
                  <p className="text-xs text-slate-400">Built for SnowFest 2025</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Usage Limit Modal */}
      <AnimatePresence>
        {showLimitModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowLimitModal(false)} />
            <motion.div
              className="relative bg-slate-900 border border-indigo-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {isGuest ? "Guest Limit Reached" : "Monthly Limit Reached"}
                </h3>
                <p className="text-slate-400 mb-6">
                  {isGuest
                    ? "You've used your 5 free guest analyses. Sign in free to get 25 per month!"
                    : "You've used all 25 analyses this month. Upgrade to Pro for unlimited access!"
                  }
                </p>
                {isGuest ? (
                  <motion.button
                    onClick={() => window.location.href = '/auth/signin'}
                    className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign In Free
                  </motion.button>
                ) : (
                  <motion.button
                    className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Crown className="w-5 h-5" />
                    Upgrade to Pro - Just $2/mo
                  </motion.button>
                )}
                <button
                  onClick={() => setShowLimitModal(false)}
                  className="mt-4 text-slate-500 hover:text-white text-sm"
                >
                  Maybe later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pricing Modal */}
      <AnimatePresence>
        {showPricingModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowPricingModal(false)} />
            <motion.div
              className="relative bg-slate-900 border border-indigo-500/30 rounded-2xl p-8 max-w-lg mx-4 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="text-center mb-6">
                <DollarSign className="w-12 h-12 mx-auto mb-3 text-green-400" />
                <h3 className="text-2xl font-bold text-white">Simple Pricing</h3>
                <p className="text-slate-400 text-sm mt-1">Pay only when you need more</p>
              </div>

              <div className="space-y-4">
                {/* Free Tier */}
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">Free</span>
                    <span className="text-2xl font-black text-green-400">$0</span>
                  </div>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• 5 analyses as guest</li>
                    <li>• 25 analyses/month when signed in</li>
                    <li>• Structured output (Ambiguities, Spec, Email)</li>
                  </ul>
                </div>

                {/* Pro Tier */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white flex items-center gap-2">
                      <Crown className="w-4 h-4 text-yellow-400" />
                      Pro
                    </span>
                    <span className="text-2xl font-black text-white">$2<span className="text-sm font-normal text-slate-400">/mo</span></span>
                  </div>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Unlimited analyses</li>
                    <li>• Save history & templates</li>
                    <li>• Priority support</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setShowPricingModal(false)}
                className="w-full mt-6 py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Examples Modal */}
      <AnimatePresence>
        {showExamplesModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowExamplesModal(false)} />
            <motion.div
              className="relative bg-slate-900 border border-indigo-500/30 rounded-2xl p-8 max-w-lg mx-4 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="text-center mb-6">
                <Lightbulb className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">Example Prompts</h3>
                <p className="text-slate-400 text-sm mt-1">Click any to try it</p>
              </div>

              <div className="space-y-3">
                {examplePrompts.map((prompt, i) => (
                  <motion.button
                    key={i}
                    onClick={() => {
                      setRequest(prompt)
                      setShowExamplesModal(false)
                    }}
                    className="w-full text-left p-4 rounded-xl bg-slate-800/60 hover:bg-indigo-600/30 border border-slate-700/50 hover:border-indigo-500/50 text-slate-300 hover:text-white transition-all"
                    whileHover={{ x: 5 }}
                  >
                    "{prompt}"
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => setShowExamplesModal(false)}
                className="w-full mt-6 py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature Modals (History, Templates, etc.) - FAKE DEMO CONTENT */}
      <AnimatePresence>
        {showComingSoonModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowComingSoonModal(false)} />
            <motion.div
              className="relative bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl flex flex-col max-h-[85vh]"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 border-b border-indigo-500/20 pb-4">
                <div className="flex items-center gap-3">
                  {comingSoonFeature === "History" && <History className="w-6 h-6 text-indigo-400" />}
                  {comingSoonFeature === "Saved Queries" && <Folder className="w-6 h-6 text-indigo-400" />}
                  {comingSoonFeature === "Templates" && <BookOpen className="w-6 h-6 text-indigo-400" />}
                  {comingSoonFeature === "Settings" && <Settings className="w-6 h-6 text-indigo-400" />}
                  {comingSoonFeature === "Help" && <HelpCircle className="w-6 h-6 text-indigo-400" />}
                  <h3 className="text-2xl font-bold text-white">{comingSoonFeature}</h3>
                </div>
                <button
                  onClick={() => setShowComingSoonModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Content Area - Scrollable */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-4">

                {/* HISTORY CONTENT */}
                {comingSoonFeature === "History" && (
                  <div className="space-y-3">
                    {[
                      { title: "Q3 Marketing Campaign ROI", date: "2 hours ago", status: "Completed", icon: BarChart3, prompt: "Analyze the ROI for the Q3 Marketing Campaign across all channels." },
                      { title: "Customer Churn by Region (North America)", date: "Yesterday, 4:30 PM", status: "Completed", icon: PieChart, prompt: "Show me a breakdown of customer churn by region for North America in the last 30 days." },
                      { title: "Revenue Forecast 2025 vs 2024", date: "Oct 24, 2024", status: "Completed", icon: TrendingUp, prompt: "Forecast revenue for 2025 based on 2024 trends, assuming 15% growth." },
                      { title: "Product Usage: Feature Adoption", date: "Oct 22, 2024", status: "Draft", icon: LineChart, prompt: "Track adoption rates for the new dashboard features released last week." },
                      { title: "Sales Team Performance Q3", date: "Oct 20, 2024", status: "Completed", icon: Table, prompt: "Rank sales team members by total revenue closed in Q3." },
                    ].map((item, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setRequest(item.prompt)
                          setShowComingSoonModal(false)
                        }}
                        className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{item.title}</h4>
                            <p className="text-xs text-slate-400">{item.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] px-2 py-1 rounded-full border ${item.status === 'Completed' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-slate-500/10 border-slate-500/20 text-slate-400'}`}>
                            {item.status}
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* SAVED QUERIES CONTENT */}
                {comingSoonFeature === "Saved Queries" && (
                  <div className="space-y-3">
                    {[
                      { name: "Monthly Active Users (MAU)", query: "SELECT count(distinct user_id) FROM events WHERE...", fullQuery: "SELECT count(distinct user_id) FROM events WHERE event_type = 'login' AND timestamp >= DATE_TRUNC('month', CURRENT_DATE)", tags: ["User Growth", "KPI"] },
                      { name: "Revenue by Product Category", query: "SELECT category, SUM(amount) FROM sales GROUP BY...", fullQuery: "SELECT category, SUM(amount) as total_revenue FROM sales_transactions GROUP BY category ORDER BY total_revenue DESC", tags: ["Sales", "Finance"] },
                      { name: "High Value Customers", query: "SELECT * FROM users WHERE LTV > 5000 AND status...", fullQuery: "SELECT * FROM users WHERE lifetime_value > 5000 AND status = 'active'", tags: ["Marketing", "Priority"] },
                      { name: "Server Error Logs Last 24h", query: "SELECT timestamp, error_msg FROM logs WHERE level...", fullQuery: "SELECT timestamp, error_msg FROM server_logs WHERE level = 'ERROR' AND timestamp >= NOW() - INTERVAL '24 hours'", tags: ["Engineering", "Health"] },
                    ].map((item, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setRequest(item.fullQuery)
                          setShowComingSoonModal(false)
                        }}
                        className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                            <Database className="w-4 h-4 text-cyan-500" />
                            {item.name}
                          </h4>
                          <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-slate-400 mb-3 overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-slate-300 transition-colors border border-black group-hover:border-cyan-500/20">
                          {item.query}
                        </div>
                        <div className="flex gap-2">
                          {item.tags.map(tag => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button className="w-full py-3 border-2 border-dashed border-slate-700 rounded-xl text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" /> Create New Query
                    </button>
                  </div>
                )}

                {/* TEMPLATES CONTENT */}
                {comingSoonFeature === "Templates" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        name: "Executive Summary",
                        desc: "High-level KPI overview for C-suite reporting",
                        icon: Crown,
                        color: "text-amber-400",
                        bg: "bg-amber-500/10",
                        border: "border-amber-500/20",
                        prompt: "I need an Executive Summary dashboard for the C-suite. It should track high-level KPIs like ARR, Churn, and Net Dollar Retention for the current quarter compared to last year. Keep it high-level but allow drill-down into region."
                      },
                      {
                        name: "Product Launch",
                        desc: "Track adoption, usage, and initial feedback",
                        icon: Rocket,
                        color: "text-purple-400",
                        bg: "bg-purple-500/10",
                        border: "border-purple-500/20",
                        prompt: "Create a Product Launch tracking report for the new ' AI Assistant' feature. I need to see daily active users, feature adoption rate, and any reported bugs or feedback tickets from the last 7 days."
                      },
                      {
                        name: "Financial Audit",
                        desc: "Detailed reconciliation and expense tracking",
                        icon: DollarSign,
                        color: "text-green-400",
                        bg: "bg-green-500/10",
                        border: "border-green-500/20",
                        prompt: "I need a Financial Audit dataset for Q3 expenses. Please include all transaction records, categorized by department, with vendor names and exact dates. Highlight any duplicate transactions or missing receipts."
                      },
                      {
                        name: "Customer Health",
                        desc: "Identify at-risk accounts and usage drops",
                        icon: Activity,
                        color: "text-red-400",
                        bg: "bg-red-500/10",
                        border: "border-red-500/20",
                        prompt: "Generate a Customer Health score report. I want to identify at-risk accounts that have seen a >20% drop in usage over the last 30 days. Include their contact info and current subscription tier."
                      },
                      {
                        name: "Marketing Funnel",
                        desc: "Conversion rates from lead to close",
                        icon: Target,
                        color: "text-blue-400",
                        bg: "bg-blue-500/10",
                        border: "border-blue-500/20",
                        prompt: "Build a Marketing Funnel report showing conversion rates from 'Website Visitor' to 'Paid Customer'. Break it down by traffic source (Organic, Paid, Social) and calculate the Cost Per Acquisition (CPA)."
                      },
                      {
                        name: "Custom Template",
                        desc: "Create your own reusable analysis structure",
                        icon: Plus,
                        color: "text-slate-400",
                        bg: "bg-slate-500/10",
                        border: "border-slate-500/20",
                        dashed: true,
                        prompt: "Template: [Insert Name]\nObjective: [What is the goal?]\nKey Metrics: [Metric 1, Metric 2]\nDimensions: [Time, Region, etc.]"
                      },
                    ].map((item, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setRequest(item.prompt)
                          setShowComingSoonModal(false)
                        }}
                        className={`text-left p-4 rounded-xl border ${item.dashed ? 'border-dashed' : 'border-solid'} ${item.border} ${item.bg} hover:scale-[1.02] cursor-pointer transition-all w-full group relative`}
                      >
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-white/20 p-1 rounded-md">
                            <Plus className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
                        <h4 className="font-bold text-white mb-1">{item.name}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                )}

                {/* SETTINGS CONTENT */}
                {comingSoonFeature === "Settings" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">General</h4>
                      <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-indigo-400" />
                          <div>
                            <div className="font-medium text-white">Analysis Language</div>
                            <div className="text-xs text-slate-400">Default language for outputs</div>
                          </div>
                        </div>
                        <span className="text-sm text-white font-medium bg-slate-700 px-3 py-1 rounded-lg">English (US)</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-3">
                          <Moon className="w-5 h-5 text-purple-400" />
                          <div>
                            <div className="font-medium text-white">Theme</div>
                            <div className="text-xs text-slate-400">Appearance preference</div>
                          </div>
                        </div>
                        <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
                          <button
                            onClick={() => setSettingsTheme("Dark")}
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${settingsTheme === "Dark"
                              ? "bg-slate-700 text-white shadow-sm"
                              : "text-slate-500 hover:text-white"
                              }`}
                          >
                            Dark
                          </button>
                          <button
                            onClick={() => setSettingsTheme("Light")}
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${settingsTheme === "Light"
                              ? "bg-slate-200 text-slate-900 shadow-sm"
                              : "text-slate-500 hover:text-white"
                              }`}
                          >
                            Light
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Integrations</h4>
                      <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 opacity-70">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Database className="w-4 h-4 text-slate-400" />
                            <span className="font-medium text-white">Snowflake</span>
                          </div>
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20">Connected</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          Usage Role: ANALYST_READ_ONLY
                        </div>
                      </div>
                      <button className="w-full py-2 border border-dashed border-slate-600 hover:border-indigo-500 text-slate-400 hover:text-white rounded-lg text-sm transition-colors">
                        + Add New Data Source
                      </button>
                    </div>
                  </div>
                )}

                {/* HELP CONTENT */}
                {comingSoonFeature === "Help" && (
                  <div className="space-y-4">
                    <div className="p-6 rounded-xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 text-center">
                      <h4 className="text-xl font-bold text-white mb-2">How can we help?</h4>
                      <input
                        type="text"
                        placeholder="Search documentation..."
                        className="w-full bg-slate-900/80 border border-indigo-500/30 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Popular Articles</h4>
                      {[
                        "Getting Started with Datafyno",
                        "Connecting to Snowflake & BigQuery",
                        "Writing Effective Requirements Prompts",
                        "Understanding Ambiguity Detection",
                        "Exporting to SQL & Python"
                      ].map((article, i) => (
                        <button key={i} className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800 border border-slate-700/50 hover:border-indigo-500/30 transition-all text-left">
                          <span className="text-sm text-slate-300 hover:text-white">{article}</span>
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-all">
                        <MessageSquare className="w-6 h-6 text-indigo-400" />
                        <span className="text-sm font-medium text-white">Contact Support</span>
                      </button>
                      <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-all">
                        <FileCode2 className="w-6 h-6 text-pink-400" />
                        <span className="text-sm font-medium text-white">API Docs</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setShowComingSoonModal(false)}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors text-sm"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIDEBAR TRIGGER - More Prominent */}
      <motion.button
        className="fixed top-6 left-6 z-30 flex items-center gap-3 px-4 py-3 bg-slate-900/90 hover:bg-slate-800 border border-indigo-500/50 rounded-xl shadow-2xl backdrop-blur-md group"
        onClick={toggleSidebar}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="p-1 rounded-lg bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors">
          <Menu className="w-6 h-6 text-indigo-400" />
        </div>
        <span className="font-bold text-white tracking-wide">MENU</span>
      </motion.button>

      {/* Floating Decorative Windows */}
      {mounted && showAnimations && (
        <>
          {/* Floating Email Window - Left */}
          <motion.div
            className="fixed bottom-32 left-8 w-72 z-20 pointer-events-none hidden md:block"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 0.8, x: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <div className="bg-slate-900/90 backdrop-blur-md rounded-xl border border-indigo-500/30 overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-indigo-600/50 to-purple-600/50 px-4 py-3 flex items-center justify-between">
                <span className="text-xs text-white/90 font-medium flex items-center gap-2">
                  <Mail className="w-3 h-3" /> stakeholder_email.msg
                </span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                </div>
              </div>
              <div className="p-4 bg-slate-900/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-[10px] font-bold text-purple-300">JS</div>
                  <div className="text-[11px] text-slate-400">From: <span className="text-slate-300 font-medium">John (CFO)</span></div>
                </div>
                <div className="text-xs text-slate-300 italic mb-3 leading-relaxed">"Hey, can you pull the numbers from the last meeting? We need to know why Q3 is down..."</div>
                <div className="flex gap-2">
                  <span className="text-[10px] px-2 py-1 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> VAGUE
                  </span>
                  <span className="text-[10px] px-2 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg flex items-center gap-1">
                    <Flame className="w-3 h-3" /> ASAP
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating SQL Window - Right */}
          <motion.div
            className="fixed top-32 right-8 w-64 z-20 pointer-events-none hidden md:block"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 0.8, x: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
          >
            <div className="bg-slate-900/90 backdrop-blur-md rounded-xl border border-cyan-500/30 overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-cyan-600/50 to-teal-600/50 px-4 py-3 flex items-center justify-between">
                <span className="text-xs text-white/90 font-medium flex items-center gap-2">
                  <Database className="w-3 h-3" /> output_query.sql
                </span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                </div>
              </div>
              <div className="p-4 font-mono text-[11px] space-y-1 bg-slate-900/50">
                <div><span className="text-pink-400 font-bold">SELECT</span> <span className="text-slate-300">customer_id, revenue</span></div>
                <div><span className="text-pink-400 font-bold">FROM</span> <span className="text-yellow-400">sales_data</span></div>
                <div><span className="text-pink-400 font-bold">WHERE</span> <span className="text-cyan-400">quarter</span> = <span className="text-orange-400">'Q3'</span></div>
                <div><span className="text-pink-400 font-bold">AND</span> <span className="text-cyan-400">year</span> = <span className="text-purple-400">2024</span>;</div>
              </div>
            </div>
          </motion.div>

          {/* Floating Chart Window - Bottom Right */}
          <motion.div
            className="fixed bottom-24 right-6 z-20 pointer-events-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl border border-pink-500/30 overflow-hidden shadow-2xl p-4">
              <div className="flex items-end gap-1 h-16">
                {[35, 55, 45, 70, 50, 80, 60].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-3 rounded-t"
                    style={{
                      height: `${h}%`,
                      background: `linear-gradient(to top, ${['#ec4899', '#a855f7', '#8b5cf6'][i % 3]}, ${['#f472b6', '#c084fc', '#a78bfa'][i % 3]})`
                    }}
                    animate={{ height: [`${h - 10}%`, `${h + 5}%`, `${h}%`] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* MEGA AGGRESSIVE animated background */}
      <div className="fixed inset-0">
        {/* Deep black base */}
        <div className="absolute inset-0 bg-black" />

        {/* MASSIVE pulsing orbs - MORE AND BIGGER */}
        <motion.div
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1.3, 0.8, 1.3],
            opacity: [0.5, 0.9, 0.5],
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 50%)",
            filter: "blur(100px)",
          }}
          animate={{
            scale: [0.8, 1.4, 0.8],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated grid with pulse */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(99, 102, 241, 0.15) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Floating Data Analysis Icons */}
        {mounted && showAnimations && (() => {
          const icons = [
            Database, Table, BarChart3, LineChart, PieChart, FileSpreadsheet,
            Code, Terminal, Binary, Calculator, Hash, TrendingUp, Sigma, LayoutGrid, Mail, AlertTriangle, Flame
          ];
          const positions = [
            { left: '5%', top: '15%' }, { left: '92%', top: '20%' }, { left: '15%', top: '75%' },
            { left: '88%', top: '70%' }, { left: '8%', top: '45%' }, { left: '95%', top: '45%' },
            { left: '25%', top: '10%' }, { left: '75%', top: '8%' }, { left: '20%', top: '88%' },
            { left: '80%', top: '85%' }, { left: '3%', top: '60%' }, { left: '97%', top: '30%' },
            { left: '50%', top: '5%' }, { left: '50%', top: '92%' }, { left: '35%', top: '15%' },
            { left: '65%', top: '12%' }, { left: '12%', top: '30%' }, { left: '85%', top: '55%' },
          ];
          const colors = ['#818cf8', '#a855f7', '#ec4899', '#22d3ee', '#34d399', '#f472b6', '#fbbf24'];

          return positions.map((pos, i) => {
            const IconComponent = icons[i % icons.length];
            const color = colors[i % colors.length];
            const size = 20 + (i % 4) * 8;
            const duration = 4 + (i % 3) * 2;
            const delay = (i % 5) * 0.8;

            return (
              <motion.div
                key={`icon-${i}`}
                className="absolute"
                style={{
                  left: pos.left,
                  top: pos.top,
                  color: color,
                  filter: `drop-shadow(0 0 15px ${color})`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, (i % 2 === 0 ? 15 : -15), 0],
                  rotate: [0, (i % 2 === 0 ? 10 : -10), 0],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut",
                }}
              >
                <IconComponent size={size} strokeWidth={1.5} />
              </motion.div>
            );
          });
        })()}

        {/* Shooting stars */}
        {mounted && showAnimations && [...Array(5)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              width: 100 + Math.random() * 100,
              top: `${Math.random() * 50}%`,
              left: "-10%",
            }}
            animate={{
              x: ["0vw", "120vw"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1 + Math.random(),
              repeat: Infinity,
              delay: i * 2 + Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}

        {/* Floating SQL Keywords */}
        {mounted && showAnimations && (() => {
          const sqlKeywords = [
            { text: 'SELECT *', left: '3%', top: '25%' },
            { text: 'FROM', left: '95%', top: '35%' },
            { text: 'WHERE', left: '5%', top: '55%' },
            { text: 'JOIN', left: '93%', top: '65%' },
            { text: 'GROUP BY', left: '2%', top: '80%' },
            { text: 'ORDER BY', left: '96%', top: '15%' },
          ];

          return sqlKeywords.map((kw, i) => (
            <motion.div
              key={`sql-${i}`}
              className="absolute font-mono text-xs font-bold select-none pointer-events-none"
              style={{
                left: kw.left,
                top: kw.top,
                color: '#22d3ee',
                textShadow: '0 0 10px #22d3ee, 0 0 20px #22d3ee',
                opacity: 0.4,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {kw.text}
            </motion.div>
          ));
        })()}

        {/* Excel/Analytics Formulas */}
        {mounted && showAnimations && (() => {
          const formulas = [
            { text: '=SUM()', left: '8%', top: '12%' },
            { text: '=AVG()', left: '90%', top: '82%' },
            { text: '=COUNT()', left: '6%', top: '68%' },
            { text: '=VLOOKUP()', left: '88%', top: '25%' },
            { text: 'Σ', left: '4%', top: '40%', size: 'text-2xl' },
            { text: 'μ', left: '94%', top: '50%', size: 'text-2xl' },
          ];

          return formulas.map((f, i) => (
            <motion.div
              key={`formula-${i}`}
              className={`absolute font-mono ${f.size || 'text-xs'} font-bold select-none pointer-events-none`}
              style={{
                left: f.left,
                top: f.top,
                color: '#34d399',
                textShadow: '0 0 10px #34d399, 0 0 20px #34d399',
                opacity: 0.4,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.7,
              }}
            >
              {f.text}
            </motion.div>
          ));
        })()}

        {/* Data Visualization Mini Charts (decorative) */}
        {mounted && showAnimations && (
          <>
            {/* Mini bar chart - left side */}
            <motion.div
              className="absolute flex items-end gap-1 pointer-events-none"
              style={{ left: '1%', top: '35%', opacity: 0.25 }}
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {[40, 65, 35, 80, 55].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-2 bg-gradient-to-t from-indigo-500 to-purple-400 rounded-t"
                  style={{ height: h * 0.5 }}
                  animate={{ height: [h * 0.4, h * 0.6, h * 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.div>

            {/* Mini bar chart - right side */}
            <motion.div
              className="absolute flex items-end gap-1 pointer-events-none"
              style={{ right: '1%', top: '60%', opacity: 0.25 }}
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              {[55, 45, 70, 30, 60].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-2 bg-gradient-to-t from-pink-500 to-orange-400 rounded-t"
                  style={{ height: h * 0.5 }}
                  animate={{ height: [h * 0.4, h * 0.6, h * 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.div>

            {/* Animated Line Chart - top left */}
            <motion.svg
              className="absolute pointer-events-none"
              style={{ left: '2%', top: '18%', opacity: 0.3 }}
              width="80" height="50"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <motion.polyline
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                points="5,40 20,25 35,35 50,15 65,20 75,10"
              />
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Animated Line Chart - bottom right */}
            <motion.svg
              className="absolute pointer-events-none"
              style={{ right: '3%', bottom: '25%', opacity: 0.3 }}
              width="100" height="60"
              animate={{ opacity: [0.2, 0.45, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            >
              <motion.polyline
                fill="none"
                stroke="url(#lineGradient2)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                points="5,50 25,40 45,45 55,20 70,35 85,10 95,25"
              />
              <defs>
                <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Animated Pie Chart - left side */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ left: '1%', top: '70%', opacity: 0.25 }}
              animate={{ opacity: [0.15, 0.35, 0.15], rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg width="50" height="50" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke="#4f46e5" strokeWidth="8" strokeDasharray="40 120" />
                <circle cx="25" cy="25" r="20" fill="none" stroke="#ec4899" strokeWidth="8" strokeDasharray="35 120" strokeDashoffset="-40" />
                <circle cx="25" cy="25" r="20" fill="none" stroke="#22d3ee" strokeWidth="8" strokeDasharray="45 120" strokeDashoffset="-75" />
              </svg>
            </motion.div>

            {/* Animated Donut Chart - right side */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ right: '2%', top: '15%', opacity: 0.25 }}
              animate={{ opacity: [0.15, 0.35, 0.15], rotate: [360, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="22" fill="none" stroke="#a855f7" strokeWidth="6" strokeDasharray="50 140" />
                <circle cx="30" cy="30" r="22" fill="none" stroke="#f472b6" strokeWidth="6" strokeDasharray="40 140" strokeDashoffset="-50" />
                <circle cx="30" cy="30" r="22" fill="none" stroke="#fbbf24" strokeWidth="6" strokeDasharray="30 140" strokeDashoffset="-90" />
              </svg>
            </motion.div>

            {/* Mini Spreadsheet Grid - left */}
            <motion.div
              className="absolute pointer-events-none font-mono text-[8px]"
              style={{ left: '0.5%', bottom: '15%', opacity: 0.2 }}
              animate={{ opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="border border-indigo-500/40 rounded">
                <div className="flex">
                  <div className="px-2 py-0.5 border-r border-b border-indigo-500/40 text-indigo-400">A</div>
                  <div className="px-2 py-0.5 border-r border-b border-indigo-500/40 text-purple-400">B</div>
                  <div className="px-2 py-0.5 border-b border-indigo-500/40 text-pink-400">C</div>
                </div>
                <div className="flex">
                  <div className="px-2 py-0.5 border-r border-b border-indigo-500/40 text-cyan-400">124</div>
                  <div className="px-2 py-0.5 border-r border-b border-indigo-500/40 text-green-400">$5k</div>
                  <div className="px-2 py-0.5 border-b border-indigo-500/40 text-yellow-400">+12%</div>
                </div>
                <div className="flex">
                  <div className="px-2 py-0.5 border-r border-indigo-500/40 text-cyan-400">256</div>
                  <div className="px-2 py-0.5 border-r border-indigo-500/40 text-green-400">$8k</div>
                  <div className="px-2 py-0.5 border-indigo-500/40 text-yellow-400">+18%</div>
                </div>
              </div>
            </motion.div>

            {/* KPI Card - right */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ right: '0.5%', bottom: '8%', opacity: 0.25 }}
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 5, repeat: Infinity, delay: 2 }}
            >
              <div className="border border-green-500/40 rounded-lg p-2 bg-green-900/20">
                <div className="text-[8px] text-green-400 opacity-70">Revenue</div>
                <motion.div
                  className="text-lg font-bold text-green-400"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  $2.4M
                </motion.div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-2 h-2 text-green-400" />
                  <span className="text-[7px] text-green-400">+24%</span>
                </div>
              </div>
            </motion.div>

            {/* Stakeholder Email Bubble - left bottom */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ left: '0.5%', bottom: '35%', opacity: 0.2 }}
              animate={{ opacity: [0.1, 0.25, 0.1], y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="bg-slate-800/50 border border-slate-600/30 rounded-lg p-2 max-w-[80px]">
                <div className="text-[6px] text-slate-400 mb-1">From: CEO</div>
                <div className="text-[7px] text-slate-300 italic">"Need the numbers ASAP..."</div>
              </div>
            </motion.div>

            {/* Another Stakeholder Bubble - right top */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ right: '0.5%', top: '40%', opacity: 0.2 }}
              animate={{ opacity: [0.1, 0.25, 0.1], y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
            >
              <div className="bg-amber-900/30 border border-amber-600/30 rounded-lg p-2 max-w-[85px]">
                <div className="text-[6px] text-amber-400 mb-1">From: Marketing</div>
                <div className="text-[7px] text-amber-300 italic">"Pull the Q3 data..."</div>
              </div>
            </motion.div>

            {/* Floating Data Points */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`datapoint-${i}`}
                className="absolute w-2 h-2 rounded-full pointer-events-none"
                style={{
                  left: `${3 + i * 12}%`,
                  top: `${85 + (i % 3) * 5}%`,
                  background: ['#818cf8', '#ec4899', '#22d3ee', '#34d399'][i % 4],
                  boxShadow: `0 0 8px ${['#818cf8', '#ec4899', '#22d3ee', '#34d399'][i % 4]}`,
                }}
                animate={{
                  y: [0, -20 - (i * 5), 0],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}

            {/* Trend Arrow - top */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ left: '50%', top: '3%', transform: 'translateX(-50%)' }}
              animate={{ opacity: [0.2, 0.4, 0.2], y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <TrendingUp className="w-8 h-8 text-green-500" style={{ filter: 'drop-shadow(0 0 10px #22c55e)' }} />
            </motion.div>
          </>
        )}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          {/* Badge with PULSE */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border-2 border-indigo-500/50 mb-8"
            initial={{ opacity: 0, y: -50, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-indigo-400" />
            </motion.div>
            <span className="text-base text-indigo-200 font-bold tracking-wide">For Data & Business Analysts</span>
            <motion.div
              animate={{ rotate: -360, scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Rocket className="w-6 h-6 text-purple-400" />
            </motion.div>
          </motion.div>

          {/* MEGA Title with EXPLOSION entrance */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, scale: 0, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.4 }}
          >
            {/* Multiple glow layers */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-7xl sm:text-9xl md:text-[12rem] font-black tracking-tighter text-purple-500 blur-3xl">
                DATAFYNO
              </span>
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-7xl sm:text-9xl md:text-[8rem] font-black tracking-tighter text-indigo-500 blur-xl">
                DATAFYNO
              </span>
            </motion.div>
            <motion.h1
              className="relative text-7xl sm:text-9xl md:text-[8rem] font-black tracking-tighter"
              animate={{
                textShadow: [
                  "0 0 20px rgba(99, 102, 241, 0.5)",
                  "0 0 60px rgba(99, 102, 241, 0.8), 0 0 100px rgba(168, 85, 247, 0.5)",
                  "0 0 20px rgba(99, 102, 241, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
                DATAFYNO
              </span>
            </motion.h1>
          </motion.div>

          {/* Subtitle with DRAMATIC stagger */}
          <motion.div
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.span
              className="inline-block text-slate-300 mr-3"
              initial={{ opacity: 0, x: -100, rotate: -20 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 0.7, type: "spring", bounce: 0.5 }}
            >
              Turn
            </motion.span>
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, scale: 3, rotate: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.9, type: "spring", bounce: 0.4 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 animate-pulse">
                Vague Stakeholder Requests
              </span>
            </motion.span>
            <motion.span
              className="inline-block text-slate-300 mx-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              into
            </motion.span>
            <br />
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, scale: 3, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.3, type: "spring", bounce: 0.4 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
                Crystal-Clear Data Requirements
              </span>
            </motion.span>
          </motion.div>

          <motion.p
            className="text-slate-400 text-lg md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, type: "spring" }}
          >
            Stop decoding confusing emails. Get SQL-ready specs in seconds.
          </motion.p>
        </div>

        {/* How it works - EXPLOSIVE flow */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          {[
            { icon: AlertTriangle, label: "Detect Ambiguity", gradient: "from-red-600 to-orange-500", shadow: "shadow-red-500/50" },
            { icon: MessageSquare, label: "Auto-Clarify", gradient: "from-yellow-500 to-amber-400", shadow: "shadow-yellow-500/50" },
            { icon: FileCode2, label: "Generate Spec", gradient: "from-emerald-500 to-cyan-400", shadow: "shadow-emerald-500/50" },
          ].map((step, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.7 + i * 0.2, type: "spring", bounce: 0.5 }}
            >
              <motion.div
                className={`flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r ${step.gradient} shadow-2xl ${step.shadow}`}
                whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0], y: -10 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  boxShadow: [
                    `0 10px 40px -10px`,
                    `0 25px 80px -10px`,
                    `0 10px 40px -10px`,
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <step.icon className="w-6 h-6 text-white drop-shadow-lg" />
                </motion.div>
                <span className="text-base font-black text-white drop-shadow-lg">{step.label}</span>
              </motion.div>
              {i < 2 && (
                <motion.div
                  animate={{ x: [0, 10, 0], scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <ArrowRight className="w-8 h-8 text-white/60 hidden sm:block" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Input Section - ULTRA DRAMATIC */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 100, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2, type: "spring", bounce: 0.3 }}
        >
          <div className="relative">
            {/* INSANE animated border */}
            <motion.div
              className="absolute -inset-1 rounded-3xl"
              style={{
                background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #f472b6, #22d3ee, #34d399, #6366f1)",
                backgroundSize: "400% 100%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -inset-4 rounded-3xl blur-2xl"
              style={{
                background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <textarea
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="Paste that confusing email from your stakeholder here..."
              className="relative w-full h-44 p-6 text-xl bg-black/90 backdrop-blur-xl border-0 rounded-3xl text-white placeholder:text-slate-500 resize-none focus:outline-none transition-all"
            />
          </div>

          {/* MEGA CTA Button */}
          <motion.button
            onClick={handleSubmit}
            disabled={isLoading || !request.trim()}
            className="relative w-full mt-6 py-7 px-8 text-2xl font-black rounded-2xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed group"
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            {/* Animated rainbow gradient */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #d946ef, #ec4899, #f472b6, #ec4899, #d946ef, #a855f7, #8b5cf6, #6366f1)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* Multiple shine sweeps */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
              }}
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
            />
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              }}
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5, delay: 0.3 }}
            />

            {/* Pulsing glow border */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ boxShadow: "inset 0 0 30px rgba(255,255,255,0.3)" }}
              animate={{
                boxShadow: [
                  "inset 0 0 20px rgba(255,255,255,0.2)",
                  "inset 0 0 50px rgba(255,255,255,0.5)",
                  "inset 0 0 20px rgba(255,255,255,0.2)",
                ],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />

            <span className="relative flex items-center justify-center gap-4 text-white drop-shadow-lg">
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                  >
                    <Flame className="w-8 h-8" />
                  </motion.div>
                  <span>ANALYZING...</span>
                  <motion.div
                    animate={{ rotate: -360, scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                  >
                    <Zap className="w-8 h-8" />
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <Target className="w-8 h-8" />
                  </motion.div>
                  <span>Clarify This Request</span>
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Sparkles className="w-8 h-8" />
                  </motion.div>
                </>
              )}
            </span>
          </motion.button>

          <motion.p
            className="text-center text-slate-500 text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
          >
            Works with emails, Slack messages, Jira tickets, or any vague request
          </motion.p>

          {/* Example Prompt Pills */}
          <motion.div
            className="mt-6 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6 }}
          >
            <span className="text-slate-500 text-sm mr-2">Try:</span>
            {examplePrompts.slice(0, 4).map((prompt, i) => (
              <motion.button
                key={i}
                onClick={() => setRequest(prompt)}
                className="px-4 py-2 bg-slate-800/60 hover:bg-indigo-600/40 border border-indigo-500/30 hover:border-indigo-500/60 text-slate-300 hover:text-white text-sm rounded-full transition-all backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.7 + i * 0.1 }}
              >
                "{prompt.substring(0, 25)}..."
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* ULTRA STEROID Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
              className="relative"
            >
              {/* MEGA glow explosion */}
              <motion.div
                className="absolute -inset-8 rounded-3xl"
                style={{
                  background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #22d3ee, #10b981)",
                  filter: "blur(60px)",
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <motion.div
                className="relative bg-black/95 backdrop-blur-xl rounded-3xl p-8 overflow-hidden"
                style={{
                  boxShadow: "0 0 100px rgba(99, 102, 241, 0.3), 0 0 200px rgba(168, 85, 247, 0.2)",
                }}
              >
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl p-[3px]"
                  style={{
                    background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #22d3ee, #10b981, #6366f1)",
                    backgroundSize: "300% 100%",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor",
                    WebkitMaskComposite: "xor",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Header */}
                <motion.div
                  className="flex items-center justify-between mb-8"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <motion.h2
                    className="text-3xl font-black flex items-center gap-4"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(99, 102, 241, 0.5)",
                        "0 0 30px rgba(99, 102, 241, 0.8)",
                        "0 0 10px rgba(99, 102, 241, 0.5)",
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Sparkles className="w-8 h-8 text-indigo-400" />
                    </motion.div>
                    <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                      Analysis Complete
                    </span>
                    <motion.div
                      animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Zap className="w-8 h-8 text-purple-400" />
                    </motion.div>
                  </motion.h2>
                  <motion.button
                    onClick={handleCopy}
                    className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold shadow-lg shadow-indigo-500/30"
                    whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    <span>{copied ? "Copied!" : "Copy All"}</span>
                  </motion.button>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ambiguities - EXPLOSIVE */}
                  <motion.div
                    className="p-6 rounded-2xl border-2 border-red-500/50 overflow-hidden relative"
                    style={{
                      background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(234, 88, 12, 0.1) 100%)",
                    }}
                    initial={{ opacity: 0, x: -100, rotate: -10 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <h3 className="relative text-red-400 font-black text-lg uppercase tracking-wide mb-4 flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        <AlertTriangle className="w-6 h-6" />
                      </motion.div>
                      Ambiguities Detected
                    </h3>
                    <ul className="relative space-y-3">
                      {result.ambiguities.map((a, i) => (
                        <motion.li
                          key={i}
                          className="text-slate-200 text-base flex items-start gap-3"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                        >
                          <motion.span
                            className="text-red-400 text-xl"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          >
                            •
                          </motion.span>
                          {a}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Questions - EXPLOSIVE */}
                  <motion.div
                    className="p-6 rounded-2xl border-2 border-yellow-500/50 overflow-hidden relative"
                    style={{
                      background: "linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%)",
                    }}
                    initial={{ opacity: 0, x: 100, rotate: 10 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ delay: 0.4, type: "spring", bounce: 0.4 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <h3 className="relative text-yellow-400 font-black text-lg uppercase tracking-wide mb-4 flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <MessageSquare className="w-6 h-6" />
                      </motion.div>
                      Questions to Ask
                    </h3>
                    <ol className="relative space-y-3">
                      {result.questions.map((q, i) => (
                        <motion.li
                          key={i}
                          className="text-slate-200 text-base flex items-start gap-3"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                        >
                          <motion.span
                            className="text-yellow-400 font-black text-lg"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          >
                            {i + 1}.
                          </motion.span>
                          {q}
                        </motion.li>
                      ))}
                    </ol>
                  </motion.div>
                </div>

                {/* Data Spec - EXPLOSIVE */}
                {result.dataSpec.length > 0 && (
                  <motion.div
                    className="mt-6 p-6 rounded-2xl border-2 border-emerald-500/50 overflow-hidden relative"
                    style={{
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%)",
                    }}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", bounce: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <h3 className="relative text-emerald-400 font-black text-lg uppercase tracking-wide mb-4 flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FileCode2 className="w-6 h-6" />
                      </motion.div>
                      Data Specification (SQL-Ready)
                    </h3>
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-base">
                        <thead>
                          <tr className="border-b-2 border-emerald-500/30">
                            <th className="text-left py-3 text-emerald-300 font-black">Column</th>
                            <th className="text-left py-3 text-emerald-300 font-black">Type</th>
                            <th className="text-left py-3 text-emerald-300 font-black">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.dataSpec.map((spec, i) => (
                            <motion.tr
                              key={i}
                              className="border-b border-white/5"
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
                            >
                              <td className="py-3 font-mono text-indigo-300 font-bold text-lg">{spec.name}</td>
                              <td className="py-3 text-slate-400">{spec.type}</td>
                              <td className="py-3 text-slate-200">{spec.description}</td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {/* Email Draft - EXPLOSIVE */}
                {result.emailDraft && (
                  <motion.div
                    className="mt-6 p-6 rounded-2xl border-2 border-purple-500/50 overflow-hidden relative"
                    style={{
                      background: "linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.1) 100%)",
                    }}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", bounce: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <h3 className="relative text-purple-400 font-black text-lg uppercase tracking-wide mb-4 flex items-center gap-3">
                      <motion.div
                        animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Mail className="w-6 h-6" />
                      </motion.div>
                      Ready-to-Send Reply
                    </h3>
                    <pre className="relative text-slate-200 text-base whitespace-pre-wrap font-sans leading-relaxed mb-4">
                      {result.emailDraft}
                    </pre>

                    {/* Send via Gmail Button */}
                    <motion.a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&body=${encodeURIComponent(result.emailDraft)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-xl font-bold text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        <Mail className="w-5 h-5" />
                      </motion.div>
                      <span>Send via Gmail</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </motion.a>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <p className="text-slate-600 text-sm">
            Built for SnowFest Hackathon 2025 • AI & ML Track
          </p>
          <p className="text-slate-700 text-xs mt-1">
            Powered by Google Gemini AI
          </p>
        </motion.footer>
      </div>
    </div>
  )
}
