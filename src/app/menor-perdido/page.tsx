"use client"

import React, { useState } from "react"
import { 
  UserMinus, Search, MapPin, Phone, 
  Calendar, Clock, Camera, Plus, 
  ChevronRight, ChevronLeft, Loader2, 
  CheckCircle2, Info, Share2, Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const MOCK_MISSING_PERSONS = [
  {
    id: "1",
    name: "Mateo S.",
    age: 5,
    clothing: "Polera azul, jeans celestes, zapatillas blancas",
    description: "Visto por última vez cerca a los juegos del Parque Kennedy.",
    lastLocation: "Parque Kennedy, Miraflores",
    time: "hace 45 min",
    contact: "987 654 321",
    photo: "https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?q=80&w=200&auto=format&fit=crop",
    status: "ACTIVE",
  },
]

export default function MissingPersonPage() {
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    clothing: "",
    description: "",
    lastLocation: "",
    contact: "",
    image: null as File | null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock submission
    setTimeout(() => {
      setIsLoading(false)
      setShowForm(false)
      toast.error("¡ALERTA DE MENOR PERDIDO ACTIVADA!", {
        description: "Se ha enviado una notificación prioritaria a todos los vecinos y autoridades.",
        duration: 8000,
      })
    }, 2000)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] })
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <UserMinus className="h-8 w-8 text-purple-500" />
            Menor Perdido
          </h1>
          <p className="text-muted-foreground">Alertas de máxima prioridad para la búsqueda de menores en el distrito.</p>
        </div>
        {!showForm && (
          <Button 
            onClick={() => setShowForm(true)} 
            className="rounded-2xl h-14 px-8 font-bold text-lg bg-purple-600 hover:bg-purple-700 shadow-2xl shadow-purple-500/30"
          >
            <Plus className="mr-2 h-6 w-6" /> Activar Alerta
          </Button>
        )}
      </div>

      {showForm ? (
        <Card className="border-2 border-purple-500/30 bg-card/50 shadow-2xl backdrop-blur-sm rounded-[2.5rem] overflow-hidden">
          <form onSubmit={handleSubmit}>
            <CardContent className="p-8 md:p-12 space-y-8">
              <div className="flex items-center justify-between border-b border-border/40 pb-6">
                <h2 className="text-2xl font-bold text-purple-500">Formulario de Emergencia</h2>
                <Button variant="ghost" type="button" onClick={() => setShowForm(false)} className="rounded-xl h-10 px-4">
                  Cancelar
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="grid gap-2">
                    <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Nombre o Alias</Label>
                    <Input 
                      placeholder="Ej: Mateo S." 
                      className="h-14 rounded-2xl bg-secondary/20 border-border/40 text-lg font-medium"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Edad Aproximada</Label>
                    <Input 
                      placeholder="Ej: 5 años" 
                      className="h-14 rounded-2xl bg-secondary/20 border-border/40 text-lg font-medium"
                      required
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Vestimenta</Label>
                    <Input 
                      placeholder="Ej: Polera azul, jeans celestes..." 
                      className="h-14 rounded-2xl bg-secondary/20 border-border/40 text-lg font-medium"
                      required
                      value={formData.clothing}
                      onChange={(e) => setFormData({ ...formData, clothing: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid gap-2">
                    <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Foto Reciente</Label>
                    <div 
                      onClick={() => document.getElementById("photo-upload")?.click()}
                      className="cursor-pointer group relative aspect-square w-full md:w-48 rounded-3xl border-2 border-dashed border-purple-500/20 bg-purple-500/5 flex flex-col items-center justify-center transition-all hover:bg-purple-500/10 hover:border-purple-500/50"
                    >
                      {formData.image ? (
                        <div className="relative h-full w-full p-2">
                          <img 
                            src={URL.createObjectURL(formData.image)} 
                            className="h-full w-full object-cover rounded-2xl" 
                            alt="Preview"
                          />
                        </div>
                      ) : (
                        <>
                          <Camera className="h-8 w-8 text-purple-500 mb-2" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500/60">Subir Foto</span>
                        </>
                      )}
                      <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Última Ubicación Vista</Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-6 w-6 text-purple-500" />
                    <Input 
                      placeholder="Ej: Parque Kennedy, Miraflores..." 
                      className="h-14 rounded-2xl bg-secondary/20 border-border/40 pl-12 text-lg font-medium"
                      required
                      value={formData.lastLocation}
                      onChange={(e) => setFormData({ ...formData, lastLocation: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Descripción Adicional</Label>
                  <Textarea 
                    placeholder="Cualquier seña particular o detalle importante..." 
                    className="min-h-[120px] rounded-2xl bg-secondary/20 border-border/40 p-4 text-lg font-medium resize-none"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Teléfono de Contacto Directo</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 h-6 w-6 text-purple-500" />
                    <Input 
                      placeholder="Ej: 987 654 321" 
                      className="h-14 rounded-2xl bg-secondary/20 border-border/40 pl-12 text-lg font-medium"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-purple-500/5 border border-purple-500/20 flex gap-4">
                <Info className="h-6 w-6 text-purple-500 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Al enviar esta alerta, se notificará inmediatamente a la central de serenazgo, patrullas de la zona y todos los usuarios activos en el distrito. Por favor, asegúrese de que la información sea veraz.
                </p>
              </div>

              <Button type="submit" className="w-full h-16 rounded-2xl font-extrabold text-xl bg-purple-600 hover:bg-purple-700 shadow-2xl shadow-purple-500/30" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-6 w-6 animate-spin" />}
                ACTIVAR ALERTA PRIORITARIA
              </Button>
            </CardContent>
          </form>
        </Card>
      ) : (
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Bell className="h-5 w-5 text-purple-500" />
            Alertas Activas
          </h2>
          {MOCK_MISSING_PERSONS.length > 0 ? (
            MOCK_MISSING_PERSONS.map((person) => (
              <Card key={person.id} className="border-none bg-purple-500/10 shadow-xl rounded-[2rem] overflow-hidden group hover:bg-purple-500/15 transition-colors">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-64 h-64 md:h-auto overflow-hidden">
                      <img src={person.photo} className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-700" alt={person.name} />
                    </div>
                    <div className="flex-1 p-8 space-y-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-purple-600 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-lg">ACTIVA</Badge>
                            <span className="text-[10px] text-purple-500 uppercase tracking-widest font-bold">EMERGENCIA PRIORITARIA</span>
                          </div>
                          <h3 className="text-3xl font-extrabold">{person.name}, {person.age} años</h3>
                        </div>
                        <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{person.time}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Vestimenta</p>
                            <p className="font-bold text-sm">{person.clothing}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Última Ubicación</p>
                            <p className="font-bold text-sm flex items-center gap-1.5">
                              <MapPin className="h-4 w-4 text-purple-500" /> {person.lastLocation}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Descripción</p>
                          <p className="text-sm font-medium leading-relaxed">{person.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-purple-500/20">
                        <Button className="rounded-xl bg-purple-600 hover:bg-purple-700 h-12 px-6 font-bold shadow-lg shadow-purple-500/20">
                          <Phone className="mr-2 h-4 w-4" /> Contactar: {person.contact}
                        </Button>
                        <Button variant="outline" className="rounded-xl h-12 px-6 font-bold border-purple-500/30 bg-background/50 backdrop-blur">
                          <Share2 className="mr-2 h-4 w-4" /> Compartir Alerta
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 rounded-[2.5rem] border-2 border-dashed border-border/40 bg-secondary/5">
              <div className="h-20 w-20 rounded-full bg-secondary/20 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-muted-foreground/40" />
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold">No hay alertas activas</p>
                <p className="text-sm text-muted-foreground max-w-xs">Afortunadamente, no hay reportes de menores perdidos en tu distrito hoy.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
