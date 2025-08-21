import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background layout-gradient">
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex h-[88vh] overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 lg:ml-0 content-gradient overflow-auto">
          <div className="container mx-auto p-6 h-full">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
