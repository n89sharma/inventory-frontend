import { cn } from "@/lib/utils"
import { SidebarTrigger } from "@/components/shadcn/sidebar"

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps): React.JSX.Element {
  return (
    <header className={cn("flex flex-row items-center px-4 py-2 gap-4 border-b", className)}>
      <div>
        <SidebarTrigger />
      </div>
    </header>
  )
}