import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Koodathai News | Authentication",
  description: "Login or sign up to access your Koodathai News account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      {children}
    </main>
  );
}
