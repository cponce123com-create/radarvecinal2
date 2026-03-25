"use client"

import React, { useState } from "react"
import { 
  Layout, ShieldAlert, Map as MapIcon, 
  FileText, BarChart3, Users, 
  Smartphone, Monitor, RefreshCcw,
  ExternalLink, ChevronRight, Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const COMPONENTS = [
  { id: "landing", name: "Landing Page", path: "/", icon: Layout, description: "Página de inicio pública" },
  { id: "login", name: "Login", path: "/login", icon: Users, description: "Acceso de usuarios" },
  { id: "register", name: "Registro / Onboarding", path: "/register", icon: Users, description: "Creación de cuenta y ubicación" },
  { id: "home", name: "Home Dashboard", path: "/home", icon: Smartphone, description: "Vista principal del vecino" },
  { id: "reportar", name: "Reportar Incidente", path: "/reportar", icon: FileText, description: "Flujo de creación de reportes" },
  { id: "mapa", name: "Mapa Interactivo", path: "/mapa", icon: MapIcon, description: "Vista completa de incidencias" },
  { id: "alertas", name: "Alertas Activas", path: "/alertas", icon: ShieldAlert, description: "Lista de emergencias críticas" },
  { id: "historial", name: "Historial", path: "/historial", icon: RefreshCcw, description: "Explorador de incidencias pasadas" },
  { id: "estadisticas", name: "Estadísticas", path: "/estadisticas", icon: BarChart3, description: "Análisis y KPIs" },
  { id: "menor", name: "Menor Perdido", path: "/menor-perdido", icon: Users, description: "Módulo de búsqueda prioritario" },
  { id: "admin", name: "Panel Admin", path: "/admin", icon: Monitor, description: "Dashboard de gestión" },
]

export default function PreviewShowcase() {
  const [activeView, setActiveView] = useState("home")
  const [device, setDevice] = useState<"mobile" | "desktop">("desktop")

  const currentComponent = COMPONENTS.find(c => c.id === activeView)

  return (
    <div className="flex h-screen w-screen flex-col bg-background text-foreground overflow-hidden">
      {/* Top Control Bar */}
      <header className="flex h-16 items-center justify-between border-b px-6 bg-card/50 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground font-bold">R</div>
          <h1 className="font-bold tracking-tight text-lg">Radar <span className="text-primary">Preview</span></h1>
          <Badge variant="outline" className="ml-2 bg-primary/5 text-primary border-primary/20">v1.0.0-MVP</Badge>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-xl border border-border/40">
            <Button 
              variant={device === "mobile" ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => setDevice("mobile")}
              className={cn("h-8 rounded-lg px-3", device === "mobile" && "shadow-sm bg-background")}
            >
              <Smartphone className="h-4 w-4 mr-2" /> Móvil
            </Button>
            <Button 
              variant={device === "desktop" ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => setDevice("desktop")}
              className={cn("h-8 rounded-lg px-3", device === "desktop" && "shadow-sm bg-background")}
            >
              <Monitor className="h-4 w-4 mr-2" /> Desktop
            </Button>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl h-10 border-border/40" asChild>
            <a href={currentComponent?.path} target="_blank" rel="noopener noreferrer">
              Abrir en nueva pestaña <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-80 border-r bg-card/30 p-6 overflow-y-auto hidden lg:block">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Vistas Disponibles</p>
              <nav className="space-y-1">
                {COMPONENTS.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => setActiveView(comp.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left",
                      activeView === comp.id 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <comp.icon className={cn("h-4 w-4", activeView === comp.id ? "text-primary-foreground" : "text-primary")} />
                    <span className="flex-1">{comp.name}</span>
                    {activeView === comp.id && <ChevronRight className="h-4 w-4" />}
                  </button>
                ))}
              </nav>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4 space-y-3">
                <h4 className="font-bold text-sm flex items-center gap-2">
                  <RefreshCcw className="h-4 w-4 text-primary" /> Hot Reload Activo
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Cualquier cambio en el código se reflejará automáticamente en el frame de la derecha.
                </p>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Preview Frame */}
        <main className="flex-1 bg-secondary/20 p-4 md:p-8 overflow-hidden flex flex-col items-center justify-center">
          <div className={cn(
            "transition-all duration-500 shadow-2xl rounded-[2rem] border-[8px] border-card bg-background overflow-hidden",
            device === "mobile" ? "w-[375px] h-[667px]" : "w-full h-full"
          )}>
            <iframe 
              src={currentComponent?.path} 
              className="w-full h-full border-none"
              title="Radar Vecinal Preview"
            />
          </div>
        </main>
      </div>
    </div>
  )
}
