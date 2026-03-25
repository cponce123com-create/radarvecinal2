"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, User, Loader2, MapPin, ChevronRight, ChevronLeft, ShieldCheck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const DISTRICTS = [
  { id: "1", name: "Miraflores", sectors: ["Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5"] },
  { id: "2", name: "San Isidro", sectors: ["Sector 1", "Sector 2", "Sector 3"] },
  { id: "3", name: "Surco", sectors: ["Sector A", "Sector B", "Sector C", "Sector D"] },
]

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    district: "",
    sector: "",
  })
  const router = useRouter()

  const handleNext = () => setStep(step + 1)
  const handleBack = () => setStep(step - 1)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock register
    setTimeout(() => {
      setIsLoading(false)
      toast.success("¡Cuenta creada!", {
        description: "Tu registro se ha completado con éxito.",
      })
      router.push("/home")
    }, 2000)
  }

  const selectedDistrict = DISTRICTS.find((d) => d.name === formData.district)

  return (
    <div className="container relative min-h-screen flex items-center justify-center py-12 px-4">
      <div className="absolute top-8 left-8 hidden lg:flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground font-bold">
          R
        </div>
        <span className="font-bold tracking-tight text-2xl">Radar Vecinal</span>
      </div>

      <div className="mx-auto w-full max-w-[450px] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col space-y-2 text-center">
          <Badge variant="outline" className="w-fit mx-auto mb-2 text-[10px] border-primary/20 text-primary font-bold uppercase tracking-widest">
            Paso {step} de 2
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">
            {step === 1 ? "Crear Cuenta" : "Ubicación Vecinal"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {step === 1 
              ? "Ingresa tus datos personales para comenzar." 
              : "Selecciona tu zona para personalizar tu experiencia."}
          </p>
        </div>

        <Card className="border border-border/40 bg-card/50 shadow-2xl backdrop-blur-sm rounded-3xl overflow-hidden">
          <form onSubmit={handleRegister}>
            <CardContent className="p-8">
              {step === 1 ? (
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Juan Diego"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10 h-12 rounded-xl bg-secondary/20"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        placeholder="nombre@ejemplo.com"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 h-12 rounded-xl bg-secondary/20"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-10 h-12 rounded-xl bg-secondary/20"
                        required
                      />
                    </div>
                  </div>
                  <Button type="button" onClick={handleNext} className="h-12 rounded-xl font-bold text-lg group">
                    Siguiente <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="district">Distrito</Label>
                    <Select
                      value={formData.district}
                      onValueChange={(val) => setFormData({ ...formData, district: val, sector: "" })}
                      required
                    >
                      <SelectTrigger className="h-12 rounded-xl bg-secondary/20">
                        <SelectValue placeholder="Selecciona un distrito" />
                      </SelectTrigger>
                      <SelectContent>
                        {DISTRICTS.map((d) => (
                          <SelectItem key={d.id} value={d.name}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="sector">Sector</Label>
                    <Select
                      value={formData.sector}
                      onValueChange={(val) => setFormData({ ...formData, sector: val })}
                      disabled={!formData.district}
                      required
                    >
                      <SelectTrigger className="h-12 rounded-xl bg-secondary/20">
                        <SelectValue placeholder="Selecciona un sector" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedDistrict?.sectors.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-2xl bg-primary/5 p-4 border border-primary/20 flex gap-4">
                    <MapPin className="h-6 w-6 text-primary shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Tu ubicación nos ayuda a enviarte alertas relevantes de tu zona y conectarte con vecinos cercanos.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={handleBack} className="h-12 rounded-xl flex-1 bg-secondary/20">
                      <ChevronLeft className="mr-2 h-5 w-5" /> Atrás
                    </Button>
                    <Button type="submit" className="h-12 rounded-xl flex-1 font-bold text-lg" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Finalizar
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </form>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="text-primary font-bold hover:underline underline-offset-4"
          >
            Inicia sesión
          </Link>
        </p>

        <div className="text-center text-[10px] text-muted-foreground px-8 leading-relaxed">
          Al registrarte, aceptas nuestros <Link href="#" className="underline">Términos de Servicio</Link> y <Link href="#" className="underline">Política de Privacidad</Link>.
        </div>
      </div>
    </div>
  )
}
