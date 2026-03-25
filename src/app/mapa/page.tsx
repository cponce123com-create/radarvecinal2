"use client"

import React from "react"
import { MapView } from "@/components/map/MapView"

export default function MapaPage() {
  return (
    <div className="h-[calc(100vh-160px)] md:h-[calc(100vh-200px)] animate-in fade-in duration-500">
      <MapView />
    </div>
  )
}
