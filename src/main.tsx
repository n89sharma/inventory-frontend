import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidebarProvider className="items-stretch">
      <AppSidebar />
      <TooltipProvider>
        <div className="flex flex-col border-blue-500">
          <header className="flex h-8 items-center px-4">
            <SidebarTrigger />
          </header>
          <div className="flex-1">
            <App />
          </div>
        </div>
      </TooltipProvider>
    </SidebarProvider>
  </StrictMode>
)