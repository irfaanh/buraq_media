import type { Metadata } from "next";
import { SidebarWrapper } from "@/components/sidebar/sidebar-wrapper";
import { APP_CONFIG } from "@/config/app";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
     headers: await headers(),
  });
  return (
    <SidebarWrapper user={session?.user}>
      <Toaster position="bottom-right" />
        {children}
    </SidebarWrapper>
  );
}
