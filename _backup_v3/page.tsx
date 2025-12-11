"use client"

import { useState, useEffect } from "react"
import { clarifyRequest } from "@/app/actions/clarify-request"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { type AnalysisResult } from "@/components/output-section"
import { Sparkles, Zap, Target, FileCode2, MessageSquare, AlertTriangle, Mail, Copy, Check, ArrowRight, Flame, Rocket, Database, Table, BarChart3, LineChart, PieChart, FileSpreadsheet, Code, Terminal, Binary, Calculator, Hash, TrendingUp, Sigma, LayoutGrid } from "lucide-react"

export default function BrieflyULTRA() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [request, setRequest] = useState("")
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showFlash, setShowFlash] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async () => {
    if (!request.trim() || isLoading) return
    setIsLoading(true)
    setResult(null)
    setShowFlash(true)
    setTimeout(() => setShowFlash(false), 200)

    try {
      const analysis = await clarifyRequest(request)
      setShowFlash(true)
      setTimeout(() => setShowFlash(false), 300)
      setResult(analysis)
    } catch (err) {
      console.error("Translation failed:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    if (!result) return
    const text = `AMBIGUITIES:\n${result.ambiguities.join('\n')}\n\nQUESTIONS:\n${result.questions.join('\n')}\n\nDATA SPEC:\n${result.dataSpec.map(s => `${s.column} (${s.type}): ${s.description}`).join('\n')}\n\nEMAIL:\n${result.emailDraft}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
        {mounted && (() => {
          const icons = [
            Database, Table, BarChart3, LineChart, PieChart, FileSpreadsheet,
            Code, Terminal, Binary, Calculator, Hash, TrendingUp, Sigma, LayoutGrid
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
        {mounted && [...Array(5)].map((_, i) => (
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
        {mounted && (() => {
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
        {mounted && (() => {
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
        {mounted && (
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
                BRIEFLY
              </span>
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-7xl sm:text-9xl md:text-[12rem] font-black tracking-tighter text-indigo-500 blur-xl">
                BRIEFLY
              </span>
            </motion.div>
            <motion.h1
              className="relative text-7xl sm:text-9xl md:text-[12rem] font-black tracking-tighter"
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
                BRIEFLY
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
              className="inline-block text-slate-300"
              initial={{ opacity: 0, x: -100, rotate: -20 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 0.7, type: "spring", bounce: 0.5 }}
            >
              Turn{" "}
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
              className="inline-block text-slate-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {" "}into
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
                              <td className="py-3 font-mono text-indigo-300 font-bold text-lg">{spec.column}</td>
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
