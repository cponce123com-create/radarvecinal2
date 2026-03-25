"use client"

import React, { useState } from "react"
import { 
  Search, Filter, Map as MapIcon, List, 
  ChevronRight, Calendar, MapPin, ShieldAlert,
  AlertTriangle, CheckCircle2, Clock, Trash2, 
  Droplets, UserMinus, Plus, MoreHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const MOCK_HISTORY = [
  { id: "1", title: "Asalto a mano armada", category: "Robo / Asalto", urgency: "CRITICAL", status: "ACTIVE", date: "2026-03-24", location: "Miraflores, Sector 4", time: "10:15 AM", user: "Juan P." },
  { id: "2", title: "Pelea callejera", category: "Pelea / Disturbio", urgency: "HIGH", status: "IN_REVIEW", date: "2026-03-24", location: "Miraflores, Sector 2", time: "09:30 AM", user: "Maria G." },
  { id: "3", title: "Corte de agua", category: "Corte de agua / luz", urgency: "LOW", status: "RESOLVED", date: "2026-03-23", location: "Miraflores, Sector 5", time: "08:45 PM", user: "Carlos R." },
  { id: "4", title: "Basura acumulada", category: "Basura / limpieza", urgency: "MEDIUM", status: "ACTIVE", date: "2026-03-23", location: "Miraflores, Sector 1", time: "05:20 PM", user: "Ana T." },
  { id: "5", title: "Menor extraviado", category: "Menor perdido", urgency: "CRITICAL", status: "RESOLVED", date: "2026-03-22", location: "Miraflores, Sector 3", time: "11:10 AM", user: "Pedro S." },
]

const CATEGORY_ICONS: Record<string, any> = {
  "Robo / Asalto": ShieldAlert,
  "Pelea / Disturbio": AlertTriangle,
  "Corte de agua / luz": Droplets,
  "Basura / limpieza": Trash2,
  "Menor perdido": UserMinus,
  "Otro": Plus,
}

const STATUS_COLORS: Record<string, string> = {
  "ACTIVE": "text-destructive bg-destructive/10 border-destructive/20",
  "IN_REVIEW": "text-orange-500 bg-orange-500/10 border-orange-500/20",
  "RESOLVED": "text-green-500 bg-green-500/10 border-green-500/20",
  "ARCHIVED": "text-muted-foreground bg-secondary/20 border-border/40",
}

export default function HistoryPage() {
  const [view, setView] = useState<"list" | "map">("list")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Historial de Incidencias</h1>
          <p className="text-muted-foreground">Explora y filtra todos los reportes de tu comunidad.</p>
        </div>
        <div className="flex items-center gap-2 p-1 bg-secondary/30 rounded-2xl border border-border/40 self-start md:self-auto">
          <Button 
            variant={view === "list" ? "secondary" : "ghost"} 
            size="sm" 
            onClick={() => setView("list")}
            className={cn("rounded-xl h-9 px-4", view === "list" && "shadow-sm bg-background")}
          >
            <List className="mr-2 h-4 w-4" /> Lista
          </Button>
          <Button 
            variant={view === "map" ? "secondary" : "ghost"} 
            size="sm" 
            onClick={() => setView("map")}
            className={cn("rounded-xl h-9 px-4", view === "map" && "shadow-sm bg-background")}
          >
            <MapIcon className="mr-2 h-4 w-4" /> Mapa
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Buscar por título, categoría o ubicación..." 
            className="pl-10 h-12 rounded-xl bg-card/50 border-border/40 focus:bg-card transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-12 rounded-xl bg-secondary/20 border-border/40 px-6">
          <Filter className="mr-2 h-4 w-4" /> Filtros Avanzados
        </Button>
      </div>

      <div className="space-y-4">
        {MOCK_HISTORY.map((item) => {
          const Icon = CATEGORY_ICONS[item.category] || Plus
          return (
            <Card key={item.id} className="group border-none bg-card/40 hover:bg-card/60 transition-all hover:shadow-xl hover:shadow-primary/5 rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6 p-6">
                  <div className={cn(
                    "h-16 w-16 md:h-20 md:w-20 rounded-3xl flex items-center justify-center shrink-0 border border-border/40",
                    item.urgency === "CRITICAL" ? "bg-destructive/10 border-destructive/20 shadow-[0_0_15px_rgba(220,38,38,0.1)]" : "bg-secondary/20"
                  )}>
                    <Icon className={cn(
                      "h-8 w-8 md:h-10 md:w-10",
                      item.urgency === "CRITICAL" ? "text-destructive" : "text-primary"
                    )} />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className={cn("text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-lg", STATUS_COLORS[item.status])}>
                        {item.status}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-lg bg-primary/10 text-primary border-primary/20">
                        {item.category}
                      </Badge>
                      {item.urgency === "CRITICAL" && (
                        <Badge className="bg-destructive text-destructive-foreground text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-lg">
                          URGENTE
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-medium uppercase tracking-widest">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" /> {item.date} • {item.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-primary" /> {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-border/40 pt-4 md:pt-0 md:pl-6">
                    <div className="hidden md:flex flex-col items-end">
                      <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Reportado por</span>
                      <span className="font-bold">{item.user}</span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl border-border/40 shadow-2xl p-2 min-w-[160px]">
                        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="rounded-xl gap-3 h-10">
                          <Eye className="h-4 w-4" /> Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl gap-3 h-10">
                          <Share2 className="h-4 w-4" /> Compartir
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl gap-3 h-10 text-primary focus:text-primary">
                          <CheckCircle2 className="h-4 w-4" /> Confirmar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-center pt-8">
        <Button variant="outline" className="rounded-2xl h-12 px-8 border-border/40 bg-secondary/10 hover:bg-secondary/20 font-bold uppercase tracking-widest text-xs">
          Cargar más incidencias
        </Button>
      </div>
    </div>
  )
}
