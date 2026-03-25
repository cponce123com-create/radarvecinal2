"use client"

import React from "react"
import Link from "next/link"
import { Home, Map, PlusSquare, History, BarChart3, Settings, LogOut, ShieldAlert } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/home" },
  { label: "Mapa Interactivo", icon: Map, href: "/mapa" },
  { label: "Reportar Incidente", icon: PlusSquare, href: "/reportar" },
  { label: "Alertas Activas", icon: ShieldAlert, href: "/alertas" },
  { label: "Historial", icon: History, href: "/historial" },
  { label: "Estadísticas", icon: BarChart3, href: "/estadisticas" },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "sticky top-16 h-[calc(100vh-64px)] w-64 border-r bg-card/30 p-4 transition-all duration-300",
        className
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-transform group-hover:scale-110",
                    isActive ? "text-primary-foreground" : "text-muted-foreground"
                  )}
                />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="flex flex-col gap-2 pt-4">
          <Button
            variant="ghost"
            className="justify-start gap-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground"
            asChild
          >
            <Link href="/perfil">
              <Settings className="h-5 w-5" />
              <span>Configuración</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-3 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />
            <span>Cerrar Sesión</span>
          </Button>
        </div>
      </div>
    </aside>
  )
}
