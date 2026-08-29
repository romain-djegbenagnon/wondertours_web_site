"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Map,
  MapPin,
  Tag,
  MessageSquare,
  FileText,
  Briefcase,
  Calendar,
  Mail,
  Settings,
  Image as ImageIcon,
  Users,
} from "lucide-react";

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { name: "Circuits", href: "/dashboard/circuits", icon: Map },
  { name: "Destinations", href: "/dashboard/destinations", icon: MapPin },
  { name: "Catégories", href: "/dashboard/categories", icon: Tag },
  { name: "Témoignages", href: "/dashboard/testimonials", icon: MessageSquare },
  { name: "Blog", href: "/dashboard/blog", icon: FileText },
  { name: "Services", href: "/dashboard/services", icon: Briefcase },
  { name: "Réservations", href: "/dashboard/bookings", icon: Calendar },
  { name: "Contact", href: "/dashboard/contact", icon: Mail },
  { name: "Médiathèque", href: "/dashboard/media", icon: ImageIcon },
  { name: "Utilisateurs", href: "/dashboard/users", icon: Users },
  { name: "Paramètres", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center">
          <span className="font-heading font-bold text-xl text-primary">
            Wonder Tours
          </span>
        </Link>
        <p className="text-sm text-gray-500 mt-1">Panel d'administration</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-amber-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Link
          href="/"
          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors"
        >
          <span>← Retour au site</span>
        </Link>
      </div>
    </div>
  );
}
