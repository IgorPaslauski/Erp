"use client";
import HeaderLayot from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex flex-row min-h-screen bg-municipal-background">
      <AppSidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />
      <div className="flex flex-col flex-1 min-h-screen">
        <HeaderLayot />
        <main className="overflow-auto w-full flex-1 p-4 sm:p-6 bg-municipal-background">
          {children}
        </main>
      </div>
    </div>
  );
}
