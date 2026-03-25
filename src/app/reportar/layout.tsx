import { AppShell } from "@/components/layout/AppShell"
import { PanicButton } from "@/components/shared/PanicButton"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      {children}
      <PanicButton />
    </AppShell>
  )
}
