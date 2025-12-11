"use client"

import { useState, useEffect, createContext, useContext, ReactNode } from "react"

interface DemoUser {
    id: string
    name: string
    email: string
    image: string
}

interface DemoAuthContextType {
    user: DemoUser | null
    signIn: () => void
    signOut: () => void
    isLoading: boolean
}

const DemoAuthContext = createContext<DemoAuthContextType>({
    user: null,
    signIn: () => { },
    signOut: () => { },
    isLoading: true,
})

export function useDemoAuth() {
    return useContext(DemoAuthContext)
}

// Demo user that gets "signed in"
const DEMO_USER: DemoUser = {
    id: "guest-user-001",
    name: "Guest Analyst",
    email: "guest@datafyno.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=datafyno",
}

export function DemoAuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<DemoUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check localStorage for existing session
        const stored = localStorage.getItem("datafyno_demo_user")
        if (stored) {
            setUser(JSON.parse(stored))
        }
        setIsLoading(false)
    }, [])

    const signIn = () => {
        localStorage.setItem("datafyno_demo_user", JSON.stringify(DEMO_USER))
        setUser(DEMO_USER)
    }

    const signOut = () => {
        localStorage.removeItem("datafyno_demo_user")
        setUser(null)
    }

    return (
        <DemoAuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
            {children}
        </DemoAuthContext.Provider>
    )
}
