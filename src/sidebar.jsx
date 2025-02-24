// Home , dashboard, data visualization, Ai, About

import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings,PanelsTopLeft } from "lucide-react"
import "./index.css"
import Dashboard from "./dashboardbody";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import DataVisualization from "./dataVisualization";
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
import AvatarDemo from "./avatar";
import Aipromptpage from "./aipage";

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
    url: "https://dashboard-six-zeta-24.vercel.app/dataVisuals",
    icon: Calendar,
  },
  {
    title: "AI",
    url: "https://dashboard-six-zeta-24.vercel.app/AIpage",
    icon: Search,
  },
  {
    title: "About",
    url: "#",
    icon: Settings,
  },
]

function AppSidebar({data}){
  console.log("sidebar" + data)
  return (
    <SidebarProvider className="absolute bg-white w-[100vw]">
      <SideBar />
      <main>
        <SidebarTrigger className="relative text-[30px] text-black" />
        {/* {children} */}
      </main> <div>
      <div className="h-[50px] bg-[#000000] w-[100%]  mb-[30px] flex flex-row items-center justify-between p-[10px]"><AvatarDemo/> <p><p className="text-[10px]">Welcome</p> <p className="font-bold">User 567</p></p></div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard prop={data} className="w-[100%] bg-[white]" />}/>
          <Route path="https://dashboard-six-zeta-24.vercel.app/datahttps://dashboard-six-zeta-24.vercel.app/dataVisuals" element={<DataVisualization prop={data} className="w-[100%] bg-[white]"/>}/>
          <Route path="https://dashboard-six-zeta-24.vercel.app//AIpage" element={<Aipromptpage prop={data} className="w-[100%] bg-[white]"/>}/>
        </Routes>
      </BrowserRouter>
      </div>
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