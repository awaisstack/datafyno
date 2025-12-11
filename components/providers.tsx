"use client"

import { DemoAuthProvider } from "@/lib/demo-auth"
import { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
    return (
        <DemoAuthProvider>
            {children}
        </DemoAuthProvider>
    )
}
