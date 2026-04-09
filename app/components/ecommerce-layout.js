"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { EcommerceSidebar } from "./ecommerce-sidebar";
import Navbar from "./navbar";

export function EcommerceLayout({ children }) {
  return (
    <SidebarProvider>
      <EcommerceSidebar />
      <SidebarInset>
        <Navbar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
