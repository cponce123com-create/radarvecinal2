"use client"

import React from "react"
import Link from "next/link"
import { Bell, User, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/home" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
              R
            </div>
            <span className="hidden font-bold sm:inline-block text-xl tracking-tight">
              Radar <span className="text-primary">Vecinal</span>
            </span>
          </Link>
          <div className="hidden items-center gap-1 rounded-full bg-secondary/50 px-3 py-1 text-sm font-medium md:flex">
            <MapPin className="h-4 w-4 text-primary" />
            <span>Miraflores, Sector 4</span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className="relative h-9 w-9 rounded-full p-0 inline-flex items-center justify-center">
                <Avatar className="h-9 w-9 border-2 border-primary/20">
                  <AvatarImage src="/avatars/user.png" alt="Usuario" />
                  <AvatarFallback className="bg-secondary">JD</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Juan Diego</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    juan@radarvecinal.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href="/perfil" className="w-full">Mi Perfil</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href="/admin" className="w-full">Panel Admin</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
