"use client"

import React from "react"
import Link from "next/link"
import { ShieldAlert, Map, Bell, Users, ChevronRight, PlayCircle, Star, ShieldCheck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const FEATURES = [
  {
    title: "Reportes en Tiempo Real",
    description: "Informa sobre incidentes de seguridad, servicios o emergencias al instante.",
    icon: Bell,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Mapa Interactivo",
    description: "Visualiza lo que sucede en tu distrito con un mapa inteligente y actualizado.",
    icon: Map,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Botón de Pánico",
    description: "Alertas inmediatas para situaciones críticas que requieren ayuda urgente.",
    icon: ShieldAlert,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    title: "Red Vecinal",
    description: "Conéctate con tus vecinos y mantén tu comunidad segura y organizada.",
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              R
            </div>
            <span className="font-bold text-xl tracking-tight">
              Radar <span className="text-primary">Vecinal</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-sm font-medium hover:text-primary transition-colors">
              Iniciar Sesión
            </Link>
            <Link href="/register">Registrarse</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary font-bold animate-in fade-in slide-in-from-top-4 duration-700">
              <Zap className="h-3 w-3 mr-2 fill-current" />
              EL FUTURO DE LA SEGURIDAD DISTRITAL
            </Badge>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              Toma el control de la <span className="text-primary">seguridad</span> de tu vecindario
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Radar Vecinal es la plataforma de inteligencia territorial que conecta a vecinos, autoridades y servicios para un distrito más seguro y eficiente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <Link href="/register">Empezar Ahora <ChevronRight className="ml-2 h-5 w-5" /></Link>
              <Button size="lg" variant="outline" className="rounded-2xl px-8 text-lg font-bold h-14 bg-secondary/20">
                <PlayCircle className="mr-2 h-5 w-5" /> Ver Demo
              </Button>
            </div>

            {/* Mockup Preview */}
            <div className="relative mt-16 w-full max-w-5xl aspect-video rounded-3xl border border-primary/20 bg-card/50 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-1000 delay-300">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=1200&auto=format&fit=crop"
                alt="Radar Vecinal Mockup"
                className="h-full w-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="flex flex-col items-center gap-4 bg-background/80 backdrop-blur-xl p-8 rounded-3xl border border-primary/30 shadow-2xl max-w-md">
                  <ShieldCheck className="h-16 w-16 text-primary" />
                  <h3 className="text-2xl font-bold">Mapa de Inteligencia</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Visualiza incidentes, patrullas y alertas en tiempo real con nuestra tecnología de mapeo avanzado.
                  </p>
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-xs font-bold overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                      </div>
                    ))}
                    <div className="h-10 w-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-xs font-bold">
                      +1k
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Vecinos activos en Miraflores</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="text-4xl md:text-5xl font-extrabold text-primary">24/7</span>
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Monitoreo</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="text-4xl md:text-5xl font-extrabold text-primary">+15k</span>
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Reportes</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="text-4xl md:text-5xl font-extrabold text-primary">12</span>
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Distritos</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="text-4xl md:text-5xl font-extrabold text-primary">98%</span>
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Satisfacción</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Todo lo que necesitas para tu distrito</h2>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Una plataforma integral diseñada para la era digital, priorizando la rapidez y la veracidad de la información.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => (
              <Card key={feature.title} className="group border-none bg-secondary/20 hover:bg-secondary/40 transition-all hover:-translate-y-2">
                <CardContent className="p-8 space-y-6">
                  <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", feature.bg)}>
                    <feature.icon className={cn("h-8 w-8", feature.color)} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="bg-primary/5 border-primary/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Star className="h-40 w-40 text-primary fill-current" />
            </div>
            <CardContent className="p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-6 w-6 text-primary fill-current" />
                  ))}
                </div>
                <blockquote className="text-2xl md:text-3xl font-bold italic leading-tight">
                  "Desde que implementamos Radar Vecinal en nuestro sector, la sensación de inseguridad ha disminuido drásticamente. Ahora estamos conectados y podemos actuar rápido."
                </blockquote>
                <div>
                  <p className="font-bold text-lg">Ricardo Benavides</p>
                  <p className="text-muted-foreground">Presidente de Junta Vecinal, Miraflores</p>
                </div>
              </div>
              <div className="h-64 w-64 md:h-80 md:w-80 rounded-3xl overflow-hidden border-4 border-primary/20 shadow-2xl rotate-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"
                  alt="Testimonial User"
                  className="h-full w-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8 bg-gradient-to-br from-primary/20 to-secondary/20 p-12 md:p-24 rounded-[3rem] border border-primary/20">
            <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight">¿Listo para un distrito más seguro?</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Únete a miles de vecinos que ya están protegiendo su comunidad. Es gratis y te toma menos de un minuto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/register">Crear Mi Cuenta</Link>
              <Link href="/login">Acceder</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-secondary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground font-bold text-sm">
                R
              </div>
              <span className="font-bold text-lg tracking-tight">Radar Vecinal</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground font-medium">
              <Link href="#" className="hover:text-primary transition-colors">Privacidad</Link>
              <Link href="#" className="hover:text-primary transition-colors">Términos</Link>
              <Link href="#" className="hover:text-primary transition-colors">Soporte</Link>
              <Link href="#" className="hover:text-primary transition-colors">Contacto</Link>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2026 Radar Vecinal. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
