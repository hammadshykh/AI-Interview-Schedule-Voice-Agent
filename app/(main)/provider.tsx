import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
import { AppSidebar } from "./_components/AppSidebar";

interface Props {
 children: ReactNode;
}

const DashboardProvider = ({ children }: Props) => {
 return (
  <SidebarProvider>
   <AppSidebar />
   <div className="w-full">
    <SidebarTrigger />
    {children}
   </div>
  </SidebarProvider>
 );
};

export default DashboardProvider;
