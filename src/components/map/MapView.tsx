"use client"

import React, { useState, useEffect } from "react"
import Map, { Marker, NavigationControl, GeolocateControl, Popup } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { ShieldAlert, AlertTriangle, Siren, Flame, Search, Plus, MapPin, Trash2, Droplets, UserMinus, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const MOCK_REPORTS = [
  { id: "1", type: "ROBO", latitude: -12.1221, longitude: -77.0298, title: "Asalto a mano armada", urgency: "CRITICAL", status: "ACTIVE", category: "Robo / Asalto" },
  { id: "2", type: "FIGHT", latitude: -12.1195, longitude: -77.0345, title: "Pelea callejera", urgency: "HIGH", status: "IN_REVIEW", category: "Pelea / Disturbio" },
  { id: "3", type: "FIRE", latitude: -12.1250, longitude: -77.0310, title: "Incendio en departamento", urgency: "CRITICAL", status: "ACTIVE", category: "Incendio" },
  { id: "4", type: "SERVICE", latitude: -12.1180, longitude: -77.0280, title: "Corte de agua", urgency: "LOW", status: "RESOLVED", category: "Corte de agua / luz" },
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
  const [viewState, setViewState] = useState({
    latitude: -12.1221,
    longitude: -77.0298,
    zoom: 14,
  })
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border shadow-inner">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      >
        <GeolocateControl position="top-right" />
        <NavigationControl position="top-right" />

        {MOCK_REPORTS.map((report) => {
          const Icon = CATEGORY_ICONS[report.category] || Plus
          return (
            <Marker
              key={report.id}
              latitude={report.latitude}
              longitude={report.longitude}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation()
                setSelectedReport(report)
              }}
            >
              <div
                className={cn(
                  "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white shadow-xl transition-transform hover:scale-125",
                  CATEGORY_COLORS[report.category]
                )}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
            </Marker>
          )
        })}

        {selectedReport && (
          <Popup
            latitude={selectedReport.latitude}
            longitude={selectedReport.longitude}
            onClose={() => setSelectedReport(null)}
            closeButton={false}
            anchor="bottom"
            offset={40}
            className="z-50"
          >
            <Card className="w-64 border-none shadow-none">
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
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-lg">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Popup>
        )}
      </Map>

      {/* Map Layers / Filters Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar md:bottom-8 md:left-8">
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
    </div>
  )
}
