"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { NAVIGATION, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";
import { ReservationsSidebar } from "@/components/common/reservations-sidebar";
import { useReservations } from "@/contexts/reservations-context";

export function Header() {
  const { locale, setLocale, t } = useLanguage();
  const { reservations } = useReservations();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReservationsOpen, setIsReservationsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className={cn(
              "font-heading font-bold text-xl",
              isScrolled ? "text-text" : "text-white"
            )}>
              Wonder Tours
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "hover:text-amber-600 transition-colors font-medium relative",
                  isScrolled ? "text-text-secondary" : "text-white",
                  pathname === item.href && "text-amber-600"
                )}
              >
                {pathname === item.href && (
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-amber-600 rounded-full" />
                )}
                {locale === "fr" ? item.name : item.nameEn}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => setIsReservationsOpen(true)}
              className={cn(
                "relative flex items-center space-x-2 hover:text-primary/80 transition-all duration-300 hover:animate-bounce",
                isScrolled ? "text-primary" : "text-white"
              )}
            >
              <ShoppingCart className="w-6 h-6" />
              {reservations.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {reservations.length}
                </span>
              )}
            </button>
          </div>

          {/* Language Switcher */}
          <div className={cn(
            "hidden lg:flex items-center space-x-2 pl-4",
            isScrolled ? "border-l border-gray-200" : "border-l border-white/30"
          )}>
            <button
              onClick={() => setLocale("fr")}
              className={cn(
                "font-medium transition-all duration-300 hover:animate-bounce",
                isScrolled ? "text-text" : "text-white"
              )}
            >FR</button>
            <span className={cn(
              isScrolled ? "text-text-secondary" : "text-white/70"
            )}>|</span>
            <button
              onClick={() => setLocale("en")}
              className={cn(
                "hover:text-text transition-all duration-300 hover:animate-bounce",
                isScrolled ? "text-text-secondary" : "text-white/70"
              )}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2",
              isScrolled ? "text-text" : "text-white"
            )}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-6 space-y-4">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-text hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {locale === "fr" ? item.name : item.nameEn}
              </Link>
            ))}
            <div className="pt-4 border-t space-y-3">
              <button
                onClick={() => setIsReservationsOpen(true)}
                className="flex items-center justify-center space-x-2 py-3 text-primary hover:text-primary/80 transition-colors font-medium w-full"
              >
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {reservations.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {reservations.length}
                    </span>
                  )}
                </div>
                <span>Mes réservations</span>
              </button>
            </div>
            <div className="flex items-center justify-center space-x-4 pt-4 border-t">
              <button
                onClick={() => setLocale("fr")}
                className={cn(
                  "font-medium transition-colors",
                  locale === "fr" ? "text-text" : "text-text-secondary hover:text-text"
                )}
              >
                FR
              </button>
              <span className="text-text-secondary">|</span>
              <button
                onClick={() => setLocale("en")}
                className={cn(
                  "transition-colors",
                  locale === "en" ? "text-text" : "text-text-secondary hover:text-text"
                )}
              >
                EN
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Reservations Sidebar */}
      <ReservationsSidebar
        isOpen={isReservationsOpen}
        onClose={() => setIsReservationsOpen(false)}
      />
    </header>
  );
}
