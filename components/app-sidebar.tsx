"use client"

import { LayoutDashboard, Zap, Layers, BookTemplate, BarChart3, Settings, Users, PlusCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInput,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function AppSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      active: pathname === "/",
    },
    {
      title: "Prompts",
      icon: Zap,
      href: "/prompts",
      active: pathname === "/prompts" || pathname.startsWith("/prompts/"),
    },
    {
      title: "Component Library",
      icon: Layers,
      href: "/components",
      active: pathname === "/components",
    },
    {
      title: "Templates",
      icon: BookTemplate,
      href: "/templates",
      active: pathname === "/templates" || pathname.startsWith("/templates/"),
    },
    {
      title: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      active: pathname === "/analytics",
    },
    {
      title: "Governance",
      icon: Settings,
      href: "/governance",
      active: pathname === "/governance",
    },
    {
      title: "Team Management",
      icon: Users,
      href: "/team",
      active: pathname === "/team",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center px-2">
          <div className="flex items-center gap-2 font-semibold text-xl">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-primary-foreground font-bold">
              {">"}
            </div>
            <span className="group-data-[collapsible=icon]:hidden text-primary font-bold">PromptFlow</span>
          </div>
          <div className="ml-auto md:hidden">
            <SidebarTrigger />
          </div>
        </div>
        <div className="mt-4 px-2">
          <Button className="w-full justify-start gap-2 bg-primary hover:bg-primary/90" size="sm">
            <PlusCircle className="h-4 w-4" />
            <span>New Prompt</span>
          </Button>
        </div>
        <div className="mt-2 px-2">
          <SidebarInput placeholder="Search..." />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild isActive={route.active} tooltip={route.title}>
                <a href={route.href}>
                  <route.icon className="h-4 w-4" />
                  <span>{route.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <span className="text-xs font-medium text-white">JD</span>
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Content Strategist</p>
            </div>
          </div>
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
