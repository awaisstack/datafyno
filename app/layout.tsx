import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Providers } from "@/components/providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Datafyno - Requirements Refiner for Data Analysts",
  description: "The world's first AI-powered tool that transforms vague stakeholder requests into crystal-clear data specifications.",
  keywords: ["data analyst", "requirements", "AI", "specifications", "business intelligence"],
  authors: [{ name: "SnowFest 2025" }],
  openGraph: {
    title: "Datafyno - Requirements Refiner for Data Analysts",
    description: "Transform vague requests into precise data specifications",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

