"use client"

import React from "react"
import { ShieldAlert, AlertTriangle, UserMinus, PlusSquare, History, BarChart3, TrendingUp, MapPin, ChevronRight, MessageSquare, ThumbsUp, Share2, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapView } from "@/components/map/MapView"
import { cn } from "@/lib/utils"
import Link from "next/link"

const QUICK_ACTIONS = [
  { label: "Reportar Incidente", icon: PlusSquare, href: "/reportar", color: "bg-primary" },
  { label: "Alertas Activas", icon: ShieldAlert, href: "/alertas", color: "bg-destructive" },
  { label: "Menor Perdido", icon: UserMinus, href: "/menor-perdido", color: "bg-purple-500" },
  { label: "Historial", icon: History, href: "/historial", color: "bg-secondary" },
]

const RECENT_INCIDENTS = [
  {
    id: "1",
    user: "Maria L.",
    category: "Robo / Asalto",
    title: "Intento de robo en calle Tarapacá",
    time: "hace 15 min",
    urgency: "HIGH",
    likes: 12,
    comments: 4,
    image: "https://images.unsplash.com/photo-1541888941255-24e0736184a5?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "2",
    user: "Carlos G.",
    category: "Pelea / Disturbio",
    title: "Pelea de bar en Av. Larco",
    time: "hace 45 min",
    urgency: "MEDIUM",
    likes: 8,
    comments: 2,
    image: null,
  },
  {
    id: "3",
    user: "Ana R.",
    category: "Menor Perdido",
    title: "Se busca a niño de 5 años visto por última vez en Parque Kennedy",
    time: "hace 1 hora",
    urgency: "CRITICAL",
    likes: 45,
    comments: 12,
    image: "https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?q=80&w=200&auto=format&fit=crop",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Summary */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="col-span-1 md:col-span-3 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">¡Hola, Juan Diego!</h2>
                <p className="text-muted-foreground max-w-md">
                  Hay <span className="text-destructive font-bold">3 alertas activas</span> hoy en tu zona. Mantente alerta y reporta cualquier anomalía.
                </p>
              </div>
              <div className="flex items-center gap-6 overflow-x-auto pb-2 no-scrollbar">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-destructive">12</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Incidentes hoy</span>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-primary">02</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Alertas activas</span>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-orange-500">Larco</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Zona crítica</span>
                </div>
              </div>
              <Button className="rounded-xl px-8 shadow-lg shadow-primary/20">Ver Todo</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hidden md:flex bg-secondary/30 border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-3">
            <Megaphone className="h-8 w-8 text-primary/60" />
            <div className="space-y-1">
              <p className="text-sm font-bold">Publicidad Local</p>
              <p className="text-xs text-muted-foreground">Apoya a los negocios de tu distrito.</p>
            </div>
            <Button variant="outline" size="sm" className="w-full rounded-lg text-[10px] uppercase tracking-wider">Ver Anuncios</Button>
          </CardContent>
        </Card>
      </section>

      {/* Main Map */}
      <section className="relative aspect-video w-full md:aspect-[21/9] overflow-hidden rounded-3xl border shadow-2xl">
        <MapView />
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {QUICK_ACTIONS.map((action) => (
          <Link key={action.href} href={action.href}>
            <Card className="group cursor-pointer border-none bg-secondary/40 transition-all hover:bg-secondary/60 hover:-translate-y-1 active:scale-95">
              <CardContent className="flex items-center gap-4 p-4">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg", action.color)}>
                  <action.icon className="h-6 w-6" />
                </div>
                <span className="font-bold text-sm">{action.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      {/* Feed & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feed */}
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Actividad Reciente
            </h3>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              Ver historial completo
            </Button>
          </div>

          <div className="space-y-4">
            {RECENT_INCIDENTS.map((incident) => (
              <Card key={incident.id} className="overflow-hidden border-none bg-card/50 hover:bg-card transition-colors">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {incident.image && (
                      <div className="md:w-48 h-48 md:h-auto overflow-hidden">
                        <img
                          src={incident.image}
                          alt={incident.title}
                          className="h-full w-full object-cover transition-transform hover:scale-105 duration-500"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-5 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant={incident.urgency === "CRITICAL" ? "destructive" : "secondary"} className="text-[10px]">
                              {incident.urgency}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                              {incident.category}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold leading-tight">{incident.title}</h4>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{incident.time}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold">
                            {incident.user[0]}
                          </div>
                          <span className="text-xs font-medium">{incident.user}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            {incident.likes}
                          </button>
                          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                            <MessageSquare className="h-4 w-4" />
                            {incident.comments}
                          </button>
                          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sidebar Stats & Ads */}
        <section className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                Resumen de hoy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Seguridad</span>
                <Badge variant="outline" className="text-destructive border-destructive/20 bg-destructive/5 font-bold">85% Crítico</Badge>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-destructive w-[85%]" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Limpieza</span>
                <Badge variant="outline" className="text-green-500 border-green-500/20 bg-green-500/5 font-bold">92% OK</Badge>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[92%]" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Alumbrado</span>
                <Badge variant="outline" className="text-orange-500 border-orange-500/20 bg-orange-500/5 font-bold">64% Regular</Badge>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[64%]" />
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden bg-secondary/20 group cursor-pointer border-none">
            <div className="relative h-32">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop"
                className="h-full w-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <Badge className="absolute top-2 right-2 bg-primary/80 backdrop-blur">PATROCINADO</Badge>
            </div>
            <CardContent className="p-4">
              <h5 className="font-bold">Restaurante El Vecino</h5>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                20% de descuento en platos de fondo para todos los usuarios de Radar Vecinal. ¡Te esperamos!
              </p>
              <Button variant="link" size="sm" className="p-0 h-auto mt-2 text-primary text-xs font-bold group-hover:translate-x-1 transition-transform">
                Ver promoción <ChevronRight className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
