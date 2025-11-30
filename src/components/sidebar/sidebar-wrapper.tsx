"use client";

import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { SiteHeader } from "../common/site-header";
import { theme } from "../../config/app";
import type { UserProfile } from "../../types/user";

interface SidebarWrapperProps {
  user?: UserProfile;
  children: React.ReactNode;
}

export function SidebarWrapper({ user, children }: SidebarWrapperProps) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": theme.sidebarWidth,
          "--header-height": theme.headerHeight,
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="floating" user={user} />
      <SidebarInset>
        <SiteHeader />
        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

