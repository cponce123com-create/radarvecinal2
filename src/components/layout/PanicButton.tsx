"use client"

import React, { useState, useEffect } from "react"
import { ShieldAlert, X, AlertTriangle, Siren, Flame, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const ALERT_TYPES = [
  { id: "ASSAULT", label: "Asalto / Hurto", icon: ShieldAlert, color: "text-red-500", bg: "bg-red-500/10" },
  { id: "MEDICAL_EMERGENCY", label: "Emergencia Médica", icon: Siren, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "FIGHT", label: "Pelea / Disturbio", icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-500/10" },
  { id: "FIRE", label: "Incendio", icon: Flame, color: "text-orange-600", bg: "bg-orange-600/10" },
  { id: "MISSING_PERSON", label: "Menor Perdido", icon: Search, color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: "OTHER", label: "Otro", icon: Plus, color: "text-gray-500", bg: "bg-gray-500/10" },
]

export function PanicButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [countdown, setCountdown] = useState<number | null>(null)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (countdown === 0) {
      handleConfirmAlert()
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleTriggerAlert = (type: string) => {
    setSelectedType(type)
    setCountdown(5)
  }

  const handleCancelAlert = () => {
    setCountdown(null)
    setSelectedType(null)
  }

  const handleConfirmAlert = () => {
    setCountdown(null)
    setIsOpen(false)
    toast.error("¡ALERTA ENVIADA!", {
      description: `Se ha notificado una emergencia de tipo ${selectedType}. Las autoridades y vecinos cercanos han sido alertados.`,
      duration: 5000,
    })
    setSelectedType(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button
          size="lg"
          className="fixed bottom-24 right-6 z-50 h-16 w-16 rounded-full bg-destructive p-0 shadow-2xl shadow-destructive/40 hover:scale-110 active:scale-95 transition-all md:bottom-8 md:right-8"
        >
          <ShieldAlert className="h-8 w-8 text-destructive-foreground animate-pulse" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-background border-destructive/20 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-destructive">
            BOTÓN DE PÁNICO
          </DialogTitle>
        </DialogHeader>

        {countdown !== null ? (
          <div className="flex flex-col items-center justify-center space-y-8 py-12">
            <div className="relative flex h-32 w-32 items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-destructive/20" />
              <div
                className="absolute inset-0 rounded-full border-4 border-destructive transition-all duration-1000"
                style={{
                  clipPath: `inset(0 0 0 ${100 - (countdown / 5) * 100}%)`,
                }}
              />
              <span className="text-6xl font-bold text-destructive">{countdown}</span>
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold">Enviando alerta en {countdown} segundos...</p>
              <p className="text-sm text-muted-foreground">
                Tipo: {ALERT_TYPES.find((t) => t.id === selectedType)?.label}
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={handleCancelAlert}
              className="w-full rounded-xl"
            >
              CANCELAR
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 py-4">
            {ALERT_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTriggerAlert(type.id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-3 rounded-2xl border p-6 transition-all hover:border-destructive/50 hover:bg-destructive/5 active:scale-95",
                  type.bg
                )}
              >
                <type.icon className={cn("h-10 w-10", type.color)} />
                <span className="text-center text-sm font-bold leading-tight">{type.label}</span>
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
