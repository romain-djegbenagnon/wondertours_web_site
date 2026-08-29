"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { NAVIGATION, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

export function Header() {
  const { locale, setLocale, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <span className="font-heading font-bold text-xl text-text">
              Wonder Tours
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-text-secondary hover:text-primary transition-colors font-medium"
              >
                {locale === "fr" ? item.name : item.nameEn}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="/contact"
              className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
            </a>
          </div>

          {/* Language Switcher */}
          <div className="hidden lg:flex items-center space-x-2 border-l border-gray-200 pl-4">
            <button className="text-text font-medium">FR</button>
            <span className="text-text-secondary">|</span>
            <button className="text-text-secondary hover:text-text transition-colors">
              EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-text"
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
              <a
                href="/contact"
                className="flex items-center justify-center space-x-2 py-3 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>{t.header.planTrip}</span>
              </a>
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
    </header>
  );
}
