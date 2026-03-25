"use client"

import React, { useState } from "react"
import { ShieldAlert, AlertTriangle, Siren, Flame, Plus, Trash2, Droplets, UserMinus, MessageSquare, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const MOCK_REPORTS = [
  { id: "1", type: "ROBO", x: 30, y: 40, title: "Asalto a mano armada", urgency: "CRITICAL", status: "ACTIVE", category: "Robo / Asalto" },
  { id: "2", type: "FIGHT", x: 55, y: 25, title: "Pelea callejera", urgency: "HIGH", status: "IN_REVIEW", category: "Pelea / Disturbio" },
  { id: "3", type: "FIRE", x: 70, y: 60, title: "Incendio en departamento", urgency: "CRITICAL", status: "ACTIVE", category: "Incendio" },
  { id: "4", type: "SERVICE", x: 20, y: 70, title: "Corte de agua", urgency: "LOW", status: "RESOLVED", category: "Corte de agua / luz" },
]

const CATEGORY_ICONS: Record<string, any> = {
  "Robo / Asalto": ShieldAlert,
  "Pelea / Disturbio": AlertTriangle,
  "Incendio": Flame,
  "Emergencia médica": Siren,
  "Corte de agua / luz": Droplets,
  "Basura / limpieza": Trash2,
  "Menor perdido": UserMinus,
  "Otro": Plus,
}

const CATEGORY_COLORS: Record<string, string> = {
  "Robo / Asalto": "bg-red-500",
  "Pelea / Disturbio": "bg-orange-500",
  "Incendio": "bg-red-600",
  "Emergencia médica": "bg-blue-500",
  "Corte de agua / luz": "bg-blue-400",
  "Basura / limpieza": "bg-green-500",
  "Menor perdido": "bg-purple-500",
  "Otro": "bg-gray-500",
}

export function MapView() {
  const [selectedReport, setSelectedReport] = useState<any>(null)

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border shadow-inner bg-muted">
      {/* Placeholder map background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="35%" x2="100%" y2="38%" stroke="white" strokeWidth="2"/>
          <line x1="0" y1="65%" x2="100%" y2="62%" stroke="white" strokeWidth="1"/>
          <line x1="30%" y1="0" x2="28%" y2="100%" stroke="white" strokeWidth="2"/>
          <line x1="65%" y1="0" x2="67%" y2="100%" stroke="white" strokeWidth="1"/>
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="0.5"/>
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="0.5"/>
        </svg>
      </div>

      {/* Report markers */}
      {MOCK_REPORTS.map((report) => {
        const Icon = CATEGORY_ICONS[report.category] || Plus
        return (
          <div
            key={report.id}
            className="absolute cursor-pointer"
            style={{ left: `${report.x}%`, top: `${report.y}%`, transform: "translate(-50%, -50%)" }}
            onClick={() => setSelectedReport(selectedReport?.id === report.id ? null : report)}
          >
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-xl transition-transform hover:scale-125",
                CATEGORY_COLORS[report.category]
              )}
            >
              <Icon className="h-5 w-5 text-white" />
            </div>
          </div>
        )
      })}

      {/* Popup */}
      {selectedReport && (
        <div
          className="absolute z-50"
          style={{ left: `${selectedReport.x}%`, top: `${selectedReport.y - 5}%`, transform: "translate(-50%, -100%)" }}
        >
          <Card className="w-64 shadow-2xl">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge
                  variant={selectedReport.urgency === "CRITICAL" ? "destructive" : "secondary"}
                  className="uppercase text-[10px]"
                >
                  {selectedReport.urgency}
                </Badge>
                <span className="text-[10px] text-muted-foreground">Hace 10 min</span>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">{selectedReport.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{selectedReport.category}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="w-full h-8 text-xs rounded-lg">
                  Ver Detalle
                </Button>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-lg" onClick={() => setSelectedReport(null)}>
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filter buttons */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-2 md:bottom-8 md:left-8">
        <Button variant="secondary" size="sm" className="rounded-full whitespace-nowrap bg-background/80 backdrop-blur shadow-lg">
          Todos
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full whitespace-nowrap bg-background/40 backdrop-blur text-foreground">
          Seguridad
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full whitespace-nowrap bg-background/40 backdrop-blur text-foreground">
          Servicios
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full whitespace-nowrap bg-background/40 backdrop-blur text-foreground">
          Limpieza
        </Button>
      </div>

      {/* Map placeholder notice */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <Badge variant="secondary" className="bg-background/70 backdrop-blur text-xs">
          <MapPin className="h-3 w-3 mr-1" /> Vista previa del mapa
        </Badge>
      </div>
    </div>
  )
}
