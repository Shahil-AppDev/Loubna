"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileMenu from "@/components/layout/MobileMenu";
import { MobileMenuProvider } from "@/components/layout/MobileMenuProvider";
import { usePathname } from "next/navigation";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) return <>{children}</>;

  return (
    <MobileMenuProvider>
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileMenu />
    </MobileMenuProvider>
  );
}
