import { cn } from "@/lib/utils"
import { SidebarTrigger } from "@/components/shadcn/sidebar"
import { SearchBar } from "./search-bar"

interface HeaderProps {
  className?: string
}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn("flex flex-row items-center px-4 py-2 gap-4 border-b", className)}>
      <div>
        <SidebarTrigger />
      </div>
      <div className={cn("flex w-full justify-center", className)}>
        <SearchBar />
      </div>
    </header>
  )
}