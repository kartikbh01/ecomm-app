"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { EcommerceSidebar } from "./ecommerce-sidebar";
import Navbar from "./navbar";
import { Suspense } from "react";

export function EcommerceLayout({ children }) {
  return (
    <SidebarProvider>
      <EcommerceSidebar />
      <SidebarInset>
        <Suspense
          fallback={
            <div className="px-4 py-2 text-muted-foreground">
              Loading navigation...
            </div>
          }
        >
          <Navbar />
        </Suspense>{" "}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
