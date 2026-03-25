"use client"

import React from "react"
import {
  Users, ShieldAlert, FileText, Megaphone,
  TrendingUp, TrendingDown, Clock, CheckCircle2,
  AlertTriangle, Filter, Download, MoreVertical,
  BarChart, SquarePlus
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AppShell } from "@/components/layout/AppShell"

const STATS = [
  { label: "Usuarios Totales", value: "2,543", trend: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Reportes Hoy", value: "48", trend: "+5%", icon: FileText, color: "text-primary", bg: "bg-primary/10" },
  { label: "Alertas Activas", value: "3", trend: "-2%", icon: ShieldAlert, color: "text-destructive", bg: "bg-destructive/10" },
  { label: "Anuncios Activos", value: "12", trend: "0%", icon: Megaphone, color: "text-purple-500", bg: "bg-purple-500/10" },
]

const RECENT_REPORTS = [
  { id: "REP-001", user: "Juan Pérez", category: "Robo", status: "ACTIVE", date: "2026-03-24 10:15", urgency: "CRITICAL" },
  { id: "REP-002", user: "Maria García", category: "Limpieza", status: "RESOLVED", date: "2026-03-24 09:30", urgency: "LOW" },
  { id: "REP-003", user: "Carlos Ruiz", category: "Pelea", status: "IN_REVIEW", date: "2026-03-24 08:45", urgency: "HIGH" },
  { id: "REP-004", user: "Ana Torres", category: "Servicios", status: "ACTIVE", date: "2026-03-24 07:20", urgency: "MEDIUM" },
]

export default function AdminDashboard() {
  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
            <p className="text-muted-foreground">Bienvenido al centro de control de Radar Vecinal.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl bg-secondary/20">
              <Download className="mr-2 h-4 w-4" /> Exportar Datos
            </Button>
            <Button className="rounded-xl shadow-lg shadow-primary/20">
              <SquarePlus className="mr-2 h-4 w-4" /> Nuevo Anuncio
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <Card key={stat.label} className="border-none bg-card/50 shadow-xl rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", stat.bg)}>
                    <stat.icon className={cn("h-6 w-6", stat.color)} />
                  </div>
                  <div className={cn(
                    "flex items-center text-xs font-bold",
                    stat.trend.startsWith("+") ? "text-green-500" : stat.trend === "0%" ? "text-muted-foreground" : "text-destructive"
                  )}>
                    {stat.trend.startsWith("+") ? <TrendingUp className="mr-1 h-3 w-3" /> : stat.trend === "0%" ? null : <TrendingDown className="mr-1 h-3 w-3" />}
                    {stat.trend}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none bg-card/50 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Reportes Recientes</CardTitle>
                <CardDescription>Gestión de las últimas incidencias recibidas.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Filter className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-secondary/20">
                  <TableRow className="border-border/40">
                    <TableHead className="px-8 py-4 font-bold text-xs uppercase tracking-widest">Reporte</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-widest">Categoría</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-widest">Urgencia</TableHead>
                    <TableHead className="font-bold text-xs uppercase tracking-widest">Estado</TableHead>
                    <TableHead className="px-8 py-4 text-right font-bold text-xs uppercase tracking-widest">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {RECENT_REPORTS.map((report) => (
                    <TableRow key={report.id} className="border-border/40 hover:bg-secondary/10 transition-colors">
                      <TableCell className="px-8 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">{report.id}</span>
                          <span className="text-xs text-muted-foreground">{report.user}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="rounded-lg text-[10px] uppercase font-bold px-2 py-0.5">
                          {report.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "h-2 w-2 rounded-full",
                            report.urgency === "CRITICAL" ? "bg-red-600" :
                            report.urgency === "HIGH" ? "bg-orange-500" : "bg-blue-500"
                          )} />
                          <span className="text-xs font-medium">{report.urgency}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "rounded-lg text-[10px] uppercase font-bold px-2 py-0.5",
                          report.status === "ACTIVE" ? "bg-destructive/10 text-destructive border-destructive/20" :
                          report.status === "IN_REVIEW" ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                          "bg-green-500/10 text-green-500 border-green-500/20"
                        )} variant="outline">
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-8 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button variant="ghost" size="icon" className="rounded-full" onClick={(e) => e.stopPropagation()}>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl border-border/40 shadow-2xl">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2">
                              <Clock className="h-4 w-4" /> En Revisión
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-green-500">
                              <CheckCircle2 className="h-4 w-4" /> Resolver
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <AlertTriangle className="h-4 w-4" /> Archivar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <div className="p-8 pt-4 flex items-center justify-between border-t border-border/40">
              <p className="text-xs text-muted-foreground">Mostrando 4 de 128 reportes</p>
              <Button variant="link" className="text-primary font-bold text-xs p-0 h-auto">Ver todos los reportes</Button>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="border-none bg-card/50 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-bold">Actividad del Sistema</CardTitle>
                <CardDescription>Eventos en tiempo real.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-4 relative">
                    {i < 4 && <div className="absolute left-4 top-10 bottom-0 w-px bg-border/40" />}
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0 border border-border/40">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Nuevo reporte de <span className="text-primary">Juan Pérez</span></p>
                      <p className="text-xs text-muted-foreground">Hace 5 minutos en Miraflores Sector 4</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full rounded-xl bg-secondary/20 border-border/40 h-10 text-xs font-bold uppercase tracking-widest">
                  Ver Todo el Registro
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none bg-gradient-to-br from-primary/20 to-purple-500/20 shadow-xl rounded-3xl overflow-hidden">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
                    <BarChart className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-lg">Analítica Avanzada</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Obtén insights profundos sobre las tendencias de seguridad y comportamiento vecinal en tu distrito.
                </p>
                <Button className="w-full rounded-xl bg-background/50 hover:bg-background/80 backdrop-blur border border-primary/20 text-foreground font-bold h-10 text-xs uppercase tracking-widest">
                  Abrir Reportes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
