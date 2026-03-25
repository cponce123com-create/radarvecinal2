import { AppShell } from "@/components/layout/AppShell"
import { PanicButton } from "@/components/shared/PanicButton"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      {children}
      <PanicButton />
    </AppShell>
  )
}
