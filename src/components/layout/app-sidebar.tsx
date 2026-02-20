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
import { ChartLineUpIcon, InvoiceIcon, LineSegmentsIcon, LockOpenIcon, MagnifyingGlassIcon, PrinterIcon, StackIcon, TruckTrailerIcon, UserIcon, WarehouseIcon } from "@phosphor-icons/react"
import { Link, useLocation } from 'react-router-dom'

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
    title: "Assets",
    url: "/assets",
    icon: <PrinterIcon />
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

export function AppSidebar(): React.JSX.Element {
  const location = useLocation()

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
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={location.pathname === item.url ? true : undefined}>
                        <Link to={item.url}>
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