"use client";
import { Button } from "@/components/ui/button";
import {
 Sidebar,
 SidebarContent,
 SidebarFooter,
 SidebarGroup,
 SidebarHeader,
 SidebarMenu,
 SidebarMenuButton,
 SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarOptions } from "@/services/Constants";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
 const path = usePathname();
 return (
  <Sidebar>
   <SidebarHeader className="flex items-center mt-5">
    <Image
     src={"/images/logo.webp"}
     alt="logo"
     width={200}
     height={100}
     className="w-[150px]"
    />
    <Link href={"/dashboard/create-interview"}>
     <Button className="mt-5 self-start w-full">
      <Plus /> Create New Interview
     </Button>
    </Link>
   </SidebarHeader>
   <SidebarContent>
    <SidebarGroup>
     <SidebarContent>
      <SidebarMenu>
       {sidebarOptions.map((option, index) => (
        <SidebarMenuItem key={index} className="p-1">
         <SidebarMenuButton
          asChild
          className={`p-5 ${path == option.path && "bg-blue-50"}`}
         >
          <Link href={option.path}>
           <option.Icon />
           <span
            className={`text-[15px] font-medium ${
             path == option.path && "text-primary"
            }`}
           >
            {option.name}
           </span>
          </Link>
         </SidebarMenuButton>
        </SidebarMenuItem>
       ))}
      </SidebarMenu>
     </SidebarContent>
    </SidebarGroup>
   </SidebarContent>
   <SidebarFooter />
  </Sidebar>
 );
}
