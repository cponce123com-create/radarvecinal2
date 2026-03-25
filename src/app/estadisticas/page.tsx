"use client"

import React from "react"
import { 
  BarChart3, TrendingUp, TrendingDown, 
  MapPin, ShieldAlert, Users, Calendar, 
  Download, Filter, ChevronRight, PieChart as PieChartIcon,
  Activity, ArrowUpRight, ArrowDownRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
} from "recharts"

const CATEGORY_DATA = [
  { name: "Robos", value: 45, color: "#ef4444" },
  { name: "Peleas", value: 30, color: "#f97316" },
  { name: "Limpieza", value: 25, color: "#22c55e" },
  { name: "Servicios", value: 20, color: "#3b82f6" },
  { name: "Otros", value: 15, color: "#64748b" },
]

const WEEKLY_TREND = [
  { day: "Lun", reports: 12 },
  { day: "Mar", reports: 18 },
  { day: "Mie", reports: 15 },
  { day: "Jue", reports: 22 },
  { day: "Vie", reports: 30 },
  { day: "Sab", reports: 25 },
  { day: "Dom", reports: 14 },
]

const KPI_STATS = [
  { label: "Reportes Totales", value: "1,248", trend: "+15%", isPositive: true, icon: Activity },
  { label: "Tiempo de Respuesta", value: "12m", trend: "-5%", isPositive: true, icon: Clock },
  { label: "Casos Resueltos", value: "892", trend: "+22%", isPositive: true, icon: CheckCircle2 },
  { label: "Vecinos Activos", value: "3,420", trend: "+8%", isPositive: true, icon: Users },
]

export default function StatsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Análisis de Inteligencia</h1>
          <p className="text-muted-foreground">Monitorea las tendencias y KPIs de seguridad en tu distrito.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-xl h-12 bg-secondary/20 border-border/40">
            <Download className="mr-2 h-4 w-4" /> Exportar Reporte
          </Button>
          <Button variant="outline" className="rounded-xl h-12 bg-secondary/20 border-border/40">
            <Filter className="mr-2 h-4 w-4" /> Filtros
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_STATS.map((stat) => (
          <Card key={stat.label} className="border-none bg-card/50 shadow-xl rounded-2xl overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className={cn(
                  "flex items-center text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full",
                  stat.isPositive ? "text-green-500 bg-green-500/10" : "text-destructive bg-destructive/10"
                )}>
                  {stat.isPositive ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Trend Chart */}
        <Card className="border-none bg-card/50 shadow-xl rounded-3xl overflow-hidden p-6 md:p-8">
          <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold">Tendencia Semanal</CardTitle>
              <CardDescription>Evolución de reportes en los últimos 7 días.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Reportes</span>
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEKLY_TREND}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: "bold" }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: "bold" }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "12px", boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                  itemStyle={{ color: "#3b82f6", fontWeight: "bold" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="reports" 
                  stroke="#3b82f6" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Categories Chart */}
        <Card className="border-none bg-card/50 shadow-xl rounded-3xl overflow-hidden p-6 md:p-8">
          <CardHeader className="p-0 mb-8">
            <CardTitle className="text-xl font-bold">Distribución por Categoría</CardTitle>
            <CardDescription>Los tipos de reportes más frecuentes en tu distrito.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 h-[300px] flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-full h-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {CATEGORY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-48">
              {CATEGORY_DATA.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Zones */}
      <Card className="border-none bg-card/50 shadow-xl rounded-3xl overflow-hidden p-6 md:p-8">
        <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold">Zonas de Mayor Incidencia</CardTitle>
            <CardDescription>Sectores con mayor volumen de alertas activas.</CardDescription>
          </div>
          <Button variant="link" className="text-primary font-bold text-xs p-0 h-auto">Ver mapa completo <ChevronRight className="ml-1 h-3 w-3" /></Button>
        </CardHeader>
        <CardContent className="p-0 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Sector 4 (Larco)", score: 85, color: "bg-red-600", count: 24 },
            { name: "Sector 2 (Diagonal)", score: 62, color: "bg-orange-500", count: 15 },
            { name: "Sector 5 (Tarapacá)", score: 45, color: "bg-yellow-500", count: 12 },
          ].map((sector) => (
            <div key={sector.name} className="p-6 rounded-2xl bg-secondary/20 border border-border/40 space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-sm">{sector.name}</h5>
                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest">{sector.count} reportes</Badge>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className={cn("h-full", sector.color)} style={{ width: `${sector.score}%` }} />
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                Nivel de Riesgo: <span className={cn(
                  "font-extrabold",
                  sector.score > 80 ? "text-red-600" : sector.score > 60 ? "text-orange-500" : "text-yellow-500"
                )}>
                  {sector.score > 80 ? "CRÍTICO" : sector.score > 60 ? "ALTO" : "MEDIO"}
                </span>
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
