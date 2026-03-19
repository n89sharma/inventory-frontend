import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarRail
} from "@/components/shadcn/sidebar"
import { ChartLineUpIcon, InvoiceIcon, LineSegmentsIcon, LockOpenIcon, MagnifyingGlassIcon, StackIcon, TruckTrailerIcon, UserIcon, WarehouseIcon } from "@phosphor-icons/react"
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigationStore, type NavSection } from '@/data/store/navigation-store'

const sidebarItems = [
  {
    title: "Arrivals",
    url: "/arrivals",
    icon: <WarehouseIcon />
  },
  {
    title: "Transfers",
    url: "/transfers",
    icon: <LineSegmentsIcon />
  },
  {
    title: "Departures",
    url: "/departures",
    icon: <TruckTrailerIcon />
  },
  {
    title: "Holds",
    url: "/holds",
    icon: <LockOpenIcon />
  },
  {
    title: "Invoices",
    url: "/invoices",
    icon: <InvoiceIcon />
  },
  {
    title: "Query",
    url: "/query",
    icon: <MagnifyingGlassIcon />
  },
  {
    title: "Reports",
    url: "/reports",
    icon: <ChartLineUpIcon />
  }

]

const NAV_SECTIONS = new Set(['arrivals', 'transfers', 'departures', 'holds', 'invoices'])

export function AppSidebar(): React.JSX.Element {
  const location = useLocation()
  const lastPaths = useNavigationStore(state => state.lastPaths)
  const clearLastPath = useNavigationStore(state => state.clearLastPath)

  useEffect(() => {
    const section = location.pathname.slice(1) as NavSection
    if (NAV_SECTIONS.has(section)) {
      clearLastPath(section)
    }
  }, [location.pathname])

  return (
    <Sidebar collapsible="icon">

      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex flex-row gap-2">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <StackIcon></StackIcon>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Shiva Exports Ltd</span>
                <span className="truncate text-xs">Inventory</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>

      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                sidebarItems.map((item) => {
                  const section = item.url.slice(1)
                  const isNavSection = NAV_SECTIONS.has(section)
                  const resolvedUrl = isNavSection
                    ? (lastPaths[section as NavSection] ?? item.url)
                    : item.url
                  const isActive = location.pathname.startsWith(item.url)
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive ? true : undefined}>
                        <Link to={resolvedUrl}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <UserIcon /> Username
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar >
  )
}