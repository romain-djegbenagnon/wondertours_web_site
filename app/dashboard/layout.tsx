import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { DashboardLayoutClient } from "./dashboard-layout-client";

export const metadata: Metadata = {
  title: "Dashboard - Wonder Tours and Services",
  description: "Panel d'administration Wonder Tours and Services",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
