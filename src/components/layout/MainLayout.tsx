import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { Header } from "./Header"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full">
        <Header className="sticky top-0 bg-background" />
        <main className="p-4 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}