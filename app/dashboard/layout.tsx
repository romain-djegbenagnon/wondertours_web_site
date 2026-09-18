import type { Metadata } from "next";
import { DashboardLayoutClient } from "./dashboard-layout-client";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Dashboard - Wonder Tours and Services",
  description: "Panel d'administration Wonder Tours and Services",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Session (cookie JWT) pour personnaliser le chrome du dashboard : sidebar
  // filtrée par rôle (Utilisateurs → admin), menu utilisateur réel. Null sur
  // /dashboard/login (page sans chrome) — l'accès reste gardé par proxy.ts.
  const session = await getSession();

  return (
    <DashboardLayoutClient session={session}>{children}</DashboardLayoutClient>
  );
}
