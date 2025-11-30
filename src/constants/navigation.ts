import {
  IconNews,
  IconMapPin,
  IconCategory,
  IconDashboard,
} from "@tabler/icons-react";
import type { SidebarData } from "../types/navigation";
import { APP_CONFIG } from "../config/app";

export const SIDEBAR_DATA: SidebarData = {
  // main navigation for all users

  admin: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "News",
      url: "/admin/news",
      icon: IconNews,
    },
    {
      title: "Locations",
      url: "/admin/locations",
      icon: IconMapPin,
    },
    {
      title: "Categories",
      url: "/admin/categories",
      icon: IconCategory,
    },
  ],
};

export const COMPANY_INFO = {
  name: APP_CONFIG.name,
  description: APP_CONFIG.description,
} as const;
