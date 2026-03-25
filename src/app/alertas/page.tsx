"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ShieldAlert, AlertTriangle, Siren, Flame, Search, Plus, 
  MapPin, Trash2, Droplets, UserMinus, ChevronRight, 
  ChevronLeft, Camera, Loader2, CheckCircle2, Eye, EyeOff,
  Bell, History, BarChart3, TrendingUp, ThumbsUp, MessageSquare, Share2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AppShell } from "@/components/layout/AppShell"
import { PanicButton } from "@/components/shared/PanicButton"

const ACTIVE_ALERTS = [
  { id: "1", title: "Asalto a mano armada", category: "Robo / Asalto", urgency: "CRITICAL", time: "hace 10 min", location: "Sector 4", user: "Juan P.", icon: ShieldAlert, color: "text-red-500", bg: "bg-red-500/10" },
  { id: "2", title: "Incendio en departamento", category: "Incendio", urgency: "CRITICAL", time: "hace 25 min", location: "Sector 2", user: "Maria G.", icon: Flame, color: "text-orange-600", bg: "bg-orange-600/10" },
  { id: "3", title: "Menor extraviado", category: "Menor perdido", urgency: "CRITICAL", time: "hace 45 min", location: "Sector 3", user: "Pedro S.", icon: UserMinus, color: "text-purple-500", bg: "bg-purple-500/10" },
]

export default function AlertasPage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <ShieldAlert className="h-8 w-8 text-destructive" />
              Alertas Activas
            </h1>
            <p className="text-muted-foreground">Situaciones críticas en curso en tu distrito.</p>
          </div>
          <Badge className="bg-destructive text-destructive-foreground px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px] animate-pulse">
            3 Alertas Prioritarias
          </Badge>
        </div>

        <div className="grid gap-6">
          {ACTIVE_ALERTS.map((alert) => (
            <Card key={alert.id} className="border-none bg-card/50 shadow-xl rounded-[2rem] overflow-hidden group hover:bg-card transition-all">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className={cn("h-20 w-20 rounded-3xl flex items-center justify-center shrink-0 border border-border/40", alert.bg)}>
                    <alert.icon className={cn("h-10 w-10", alert.color)} />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-lg">ACTIVA</Badge>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{alert.category}</span>
                        </div>
                        <h3 className="text-2xl font-bold leading-tight">{alert.title}</h3>
                      </div>
                      <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest whitespace-nowrap">{alert.time}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium uppercase tracking-widest">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-primary" /> {alert.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="h-4 w-4 text-primary" /> Reportado por {alert.user}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/40">
                      <Button className="rounded-xl h-12 px-6 font-bold shadow-lg shadow-primary/20">
                        Ver Detalles e Instrucciones
                      </Button>
                      <Button variant="outline" className="rounded-xl h-12 px-6 font-bold border-border/40 bg-secondary/20">
                        Compartir Alerta
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-none bg-primary/5 border-primary/20 rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-12 text-center space-y-6">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Bell className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">¿Ves algo sospechoso?</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Tu reporte puede salvar vidas. No dudes en informar sobre cualquier incidente o emergencia.
              </p>
            </div>
            <Button size="lg" className="rounded-2xl h-14 px-12 font-bold text-lg shadow-2xl shadow-primary/30" asChild>
              <a href="/reportar">Crear Reporte Ahora</a>
            </Button>
          </CardContent>
        </Card>
      </div>
      <PanicButton />
    </AppShell>
  )
}
