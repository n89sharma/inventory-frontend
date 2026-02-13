import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/AppSidebar"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex h-8 items-center px-4 border-b">
          <SidebarTrigger />
        </header>
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}