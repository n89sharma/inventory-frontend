import { cn } from "@/lib/utils"
import { SidebarTrigger } from "@/components/shadcn/sidebar"
import { AssetSearch } from '@/components/custom/asset-search'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps): React.JSX.Element {
  return (
    <header className={cn("flex flex-row items-center px-4 py-2 gap-4 border-b", className)}>
      <SidebarTrigger />
      <AssetSearch className="w-64" />
    </header>
  )
}
