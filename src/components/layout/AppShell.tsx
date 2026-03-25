"use client"

import React from "react"
import { Header } from "./Header"
import { BottomNav } from "./BottomNav"
import { Sidebar } from "./Sidebar"
import { usePathname } from "next/navigation"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/"

  if (isAuthPage) {
    return <main className="min-h-screen">{children}</main>
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar className="hidden md:flex" />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
      <BottomNav className="md:hidden" />
    </div>
  )
}
