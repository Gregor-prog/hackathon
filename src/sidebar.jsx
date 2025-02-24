// Home , dashboard, data visualization, Ai, About

import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings,PanelsTopLeft } from "lucide-react"
import "./index.css"
import Dashboard from "./dashboardbody";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { useState } from "react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Data Visualization",
    url: "#",
    icon: Calendar,
  },
  {
    title: "AI",
    url: "#",
    icon: Search,
  },
  {
    title: "About",
    url: "#",
    icon: Settings,
  },
]

function AppSidebar({data}){
  return (
    <SidebarProvider className="absolute bg-white w-[100vw]">
      <SideBar />
      <main>
        <SidebarTrigger className="relative text-[30px] text-black" />
        {/* {children} */}
      </main>
      <Dashboard prop={data} className="w-[100%] bg-[white]" />
    </SidebarProvider>
  )
}

function SideBar() {
  const { openMobile, toggleSidebar} = useSidebar();

  return (
    <Sidebar openMobile={openMobile} variant="floating" className="bg-white">
        <SidebarHeader className="sidebar">
        <div>
          <h1 className="text-[30px] font-serif font-semibold m-0">Health</h1>
          <h1>dashboard</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel> Nav
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-[20px] bg-black text-white hover:bg-[#555555] hover:text-[#ffffff] my-[5px]">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar