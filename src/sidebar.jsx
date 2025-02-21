// Home , dashboard, data visualization, Ai, About
import Dashboard from "./dashboardbody";
import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings,PanelsTopLeft } from "lucide-react"
import "./index.css"

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
} from "@/components/ui/sidebar"

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

function AppSidebar(){
  return <SidebarProvider className="bg-white">
    <SideBar/>
    <Dashboard/>
  </SidebarProvider>
}

function SideBar() {
  const {open, toggleSidebar} = useSidebar()

  return (
      <Sidebar open={open} className="bg-white">
      <button onClick={toggleSidebar} className="p-2  rounded-md absolute w-[40px] left-[255px] text-black"><PanelsTopLeft/></button>
      <SidebarHeader className="sidebar">
        <div>
          <h1 className="text-[30px] font-serif font-semibold">Health</h1>
          <h1>dashboard</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white/30 backdrop-filter backdrop-blur-md">
        <SidebarGroup className="bg-white/30 backdrop-filter backdrop-blur-md ">
          <SidebarGroupContent className="bg-white/30 backdrop-filter backdrop-blur-md">
            <SidebarMenu className="bg-white/30 backdrop-filter backdrop-blur-md  ">
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