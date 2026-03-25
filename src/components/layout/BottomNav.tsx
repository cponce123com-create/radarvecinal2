"use client"

import React from "react"
import Link from "next/link"
import { Home, Map, PlusSquare, History, BarChart3 } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/home" },
  { label: "Mapa", icon: Map, href: "/mapa" },
  { label: "Reportar", icon: PlusSquare, href: "/reportar" },
  { label: "Historial", icon: History, href: "/historial" },
  { label: "Estadísticas", icon: BarChart3, href: "/estadisticas" },
]

export function BottomNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 py-2 backdrop-blur-md",
        className
      )}
    >
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 p-2 text-xs font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-6 w-6", isActive && "text-primary")} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
