"use client"

import React from "react"
import { AppShell } from "@/components/layout/AppShell"
import { PanicButton } from "@/components/shared/PanicButton"
import { ShieldAlert, MapPin, Bell, User, ChevronRight, Settings, LogOut, ShieldCheck, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PerfilPage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
          <p className="text-muted-foreground">Gestiona tu información personal y preferencias de seguridad.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <Card className="border-none bg-card/50 shadow-xl rounded-3xl overflow-hidden">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-primary/20">
                    <AvatarImage src="/avatars/user.png" alt="Juan Diego" />
                    <AvatarFallback className="text-4xl bg-secondary">JD</AvatarFallback>
                  </Avatar>
                  <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-10 w-10 shadow-lg">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Juan Diego</h3>
                  <p className="text-sm text-muted-foreground">Vecino Verificado</p>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1 rounded-full">
                  <ShieldCheck className="h-3 w-3 mr-2" /> Miraflores, Sector 4
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-none bg-secondary/20 rounded-3xl overflow-hidden">
              <CardContent className="p-4 space-y-1">
                <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl h-12 text-sm font-medium">
                  <User className="h-4 w-4" /> Mis Reportes
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl h-12 text-sm font-medium">
                  <Bell className="h-4 w-4" /> Notificaciones
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl h-12 text-sm font-medium">
                  <ShieldAlert className="h-4 w-4" /> Contactos de Emergencia
                </Button>
                <div className="pt-4 mt-4 border-t border-border/40">
                  <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl h-12 text-sm font-medium text-destructive hover:bg-destructive/10">
                    <LogOut className="h-4 w-4" /> Cerrar Sesión
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card className="border-none bg-card/50 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-bold">Información Personal</CardTitle>
                <CardDescription>Estos datos son visibles para las autoridades en caso de emergencia.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" defaultValue="Juan Diego" className="h-12 rounded-xl bg-secondary/20" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastname">Apellidos</Label>
                    <Input id="lastname" defaultValue="Ponce" className="h-12 rounded-xl bg-secondary/20" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" defaultValue="juan@radarvecinal.com" className="h-12 rounded-xl bg-secondary/20" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Teléfono de contacto</Label>
                  <Input id="phone" defaultValue="+51 987 654 321" className="h-12 rounded-xl bg-secondary/20" />
                </div>
                <div className="pt-4">
                  <Button className="rounded-xl h-12 px-8 font-bold shadow-lg shadow-primary/20">Guardar Cambios</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-card/50 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-bold">Ubicación Principal</CardTitle>
                <CardDescription>Tu distrito y sector de residencia.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/20 border border-border/40">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">Miraflores, Sector 4</p>
                      <p className="text-xs text-muted-foreground">Ubicación verificada</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl">Cambiar</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <PanicButton />
    </AppShell>
  )
}
