import { AppNav } from "./app-nav"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen">
      <AppNav />
      <main className="md:pl-64 pt-16 md:pt-0">
        {children}
      </main>
    </div>
  )
}
