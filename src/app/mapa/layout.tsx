import { AppShell } from "@/components/layout/AppShell"
import { PanicButton } from "@/components/shared/PanicButton"

export default function MapaLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      {children}
      <PanicButton />
    </AppShell>
  )
}
