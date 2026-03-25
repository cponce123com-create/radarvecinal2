"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ShieldAlert, AlertTriangle, Siren, Flame, Search, Plus, 
  MapPin, Trash2, Droplets, UserMinus, ChevronRight, 
  ChevronLeft, Camera, Loader2, CheckCircle2, Eye, EyeOff
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const CATEGORIES = [
  { id: "ROBO", label: "Robo / Asalto", icon: ShieldAlert, color: "text-red-500", bg: "bg-red-500/10" },
  { id: "PELEA", label: "Pelea / Disturbio", icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-500/10" },
  { id: "SOSPECHOSO", label: "Actividad Sospechosa", icon: Eye, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { id: "SERVICIO", label: "Corte Agua / Luz", icon: Droplets, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "LIMPIEZA", label: "Basura / Limpieza", icon: Trash2, color: "text-green-500", bg: "bg-green-500/10" },
  { id: "MENOR", label: "Menor Perdido", icon: UserMinus, color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: "INCENDIO", label: "Incendio", icon: Flame, color: "text-orange-600", bg: "bg-orange-600/10" },
  { id: "MEDICA", label: "Emergencia Médica", icon: Siren, color: "text-red-600", bg: "bg-red-600/10" },
  { id: "OTRO", label: "Otro", icon: Plus, color: "text-gray-500", bg: "bg-gray-500/10" },
]

const URGENCY_LEVELS = [
  { id: "LOW", label: "Baja", color: "bg-blue-500" },
  { id: "MEDIUM", label: "Media", color: "bg-yellow-500" },
  { id: "HIGH", label: "Alta", color: "bg-orange-500" },
  { id: "CRITICAL", label: "Crítica", color: "bg-red-600" },
]

export default function ReportPage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    category: "",
    urgency: "MEDIUM",
    title: "",
    description: "",
    isAnonymous: false,
    location: "Miraflores, Sector 4",
    image: null as File | null,
  })
  const router = useRouter()

  const handleNext = () => setStep(step + 1)
  const handleBack = () => setStep(step - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock report submission
    setTimeout(() => {
      setIsLoading(false)
      toast.success("¡Reporte Enviado!", {
        description: "Tu reporte ha sido registrado y notificado a la comunidad.",
      })
      router.push("/home")
    }, 2000)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] })
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col space-y-2 mb-8 text-center">
        <Badge variant="outline" className="w-fit mx-auto mb-2 text-[10px] border-primary/20 text-primary font-bold uppercase tracking-widest">
          Paso {step} de 4
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">Reportar Incidente</h1>
        <p className="text-muted-foreground">
          Ayuda a tu comunidad informando sobre lo que sucede en tu zona.
        </p>
      </div>

      <div className="mb-8 flex items-center justify-between">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2",
              step === s ? "bg-primary border-primary text-primary-foreground scale-110 shadow-lg shadow-primary/20" : 
              step > s ? "bg-primary/20 border-primary text-primary" : "bg-secondary border-border text-muted-foreground"
            )}>
              {step > s ? <CheckCircle2 className="h-6 w-6" /> : s}
            </div>
            {s < 4 && (
              <div className={cn(
                "h-1 w-12 md:w-24 mx-2 rounded-full",
                step > s ? "bg-primary" : "bg-secondary"
              )} />
            )}
          </div>
        ))}
      </div>

      <Card className="border border-border/40 bg-card/50 shadow-2xl backdrop-blur-sm rounded-3xl overflow-hidden">
        <form onSubmit={handleSubmit}>
          <CardContent className="p-8">
            {step === 1 && (
              <div className="grid gap-8">
                <div className="space-y-4">
                  <Label className="text-lg font-bold">1. Elige una categoría</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat.id })}
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 transition-all active:scale-95",
                          formData.category === cat.id 
                            ? "border-primary bg-primary/10 shadow-lg shadow-primary/5" 
                            : "border-border/40 bg-secondary/20 hover:bg-secondary/40 hover:border-border"
                        )}
                      >
                        <cat.icon className={cn("h-8 w-8", cat.color)} />
                        <span className="text-center text-[11px] font-bold leading-tight uppercase tracking-wider">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-bold">2. Nivel de urgencia</Label>
                  <div className="flex flex-wrap gap-3">
                    {URGENCY_LEVELS.map((level) => (
                      <button
                        key={level.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, urgency: level.id })}
                        className={cn(
                          "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all active:scale-95 border-2",
                          formData.urgency === level.id 
                            ? cn("border-transparent text-white", level.color) 
                            : "border-border/40 text-muted-foreground hover:bg-secondary/40"
                        )}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>

                <Button 
                  type="button" 
                  disabled={!formData.category} 
                  onClick={handleNext} 
                  className="h-14 rounded-2xl font-bold text-lg group w-full"
                >
                  Siguiente <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-8">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title" className="text-lg font-bold">Título del reporte</Label>
                    <Input
                      id="title"
                      placeholder="Ej: Robo de celular en esquina..."
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="h-14 rounded-xl bg-secondary/20 border-border/40"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description" className="text-lg font-bold">Descripción detallada</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe lo sucedido con el mayor detalle posible..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="min-h-[150px] rounded-xl bg-secondary/20 border-border/40 resize-none p-4"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={handleBack} className="h-14 rounded-2xl flex-1 bg-secondary/20 border-border/40">
                    <ChevronLeft className="mr-2 h-5 w-5" /> Atrás
                  </Button>
                  <Button 
                    type="button" 
                    disabled={!formData.title || !formData.description} 
                    onClick={handleNext} 
                    className="h-14 rounded-2xl flex-1 font-bold text-lg group"
                  >
                    Siguiente <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-8">
                <div className="space-y-4">
                  <Label className="text-lg font-bold">Subir Imagen (Opcional)</Label>
                  <div 
                    onClick={() => document.getElementById("image-upload")?.click()}
                    className="cursor-pointer group relative aspect-video rounded-3xl border-2 border-dashed border-border/40 bg-secondary/10 flex flex-col items-center justify-center transition-all hover:bg-secondary/20 hover:border-primary/50"
                  >
                    {formData.image ? (
                      <div className="relative h-full w-full p-2">
                        <img 
                          src={URL.createObjectURL(formData.image)} 
                          className="h-full w-full object-cover rounded-2xl" 
                          alt="Preview"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-2xl">
                          <Camera className="h-12 w-12 text-white" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                          <Camera className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-sm font-bold">Haz clic para subir una foto</p>
                        <p className="text-xs text-muted-foreground mt-1">Formatos: JPG, PNG, WEBP</p>
                      </>
                    )}
                    <input 
                      id="image-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-bold">Ubicación del incidente</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-4 h-5 w-5 text-primary" />
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="pl-10 h-14 rounded-xl bg-secondary/20 border-border/40"
                      required
                    />
                  </div>
                  <div className="aspect-video rounded-2xl overflow-hidden border border-border/40 grayscale opacity-60">
                    <img 
                      src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=400&auto=format&fit=crop" 
                      className="h-full w-full object-cover" 
                      alt="Map Preview"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={handleBack} className="h-14 rounded-2xl flex-1 bg-secondary/20 border-border/40">
                    <ChevronLeft className="mr-2 h-5 w-5" /> Atrás
                  </Button>
                  <Button type="button" onClick={handleNext} className="h-14 rounded-2xl flex-1 font-bold text-lg group">
                    Siguiente <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="grid gap-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 rounded-3xl bg-secondary/20 border border-border/40">
                    <div className="flex items-center gap-4">
                      <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center", formData.isAnonymous ? "bg-secondary" : "bg-primary/10")}>
                        {formData.isAnonymous ? <EyeOff className="h-6 w-6 text-muted-foreground" /> : <Eye className="h-6 w-6 text-primary" />}
                      </div>
                      <div>
                        <p className="font-bold">Reportar de forma anónima</p>
                        <p className="text-xs text-muted-foreground">Oculta tu nombre de la comunidad</p>
                      </div>
                    </div>
                    <Switch 
                      checked={formData.isAnonymous} 
                      onCheckedChange={(val) => setFormData({ ...formData, isAnonymous: val })}
                    />
                  </div>

                  <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 space-y-4">
                    <h3 className="font-bold flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Resumen del Reporte
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Categoría</p>
                        <p className="font-bold">{CATEGORIES.find(c => c.id === formData.category)?.label}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Urgencia</p>
                        <p className="font-bold">{URGENCY_LEVELS.find(l => l.id === formData.urgency)?.label}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Ubicación</p>
                        <p className="font-bold">{formData.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={handleBack} className="h-14 rounded-2xl flex-1 bg-secondary/20 border-border/40">
                    <ChevronLeft className="mr-2 h-5 w-5" /> Atrás
                  </Button>
                  <Button type="submit" className="h-14 rounded-2xl flex-1 font-bold text-lg shadow-2xl shadow-primary/30" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Confirmar y Enviar
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
