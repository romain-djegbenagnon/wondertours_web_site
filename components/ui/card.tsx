import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white shadow-lg overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CardImage({ src, alt, className }: CardImageProps) {
  // Un src vide recharge la page entière dans le navigateur : on rend
  // l'image de repli du site à la place.
  const isFallback = !src;
  const resolvedSrc = src || "/images/placeholder.svg";
  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden", className)}>
      <img
        src={resolvedSrc}
        alt={alt}
        className={cn(
          "h-full w-full object-cover transition-transform duration-500 hover:scale-105",
          isFallback && "img-fallback"
        )}
      />
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("p-6 pb-4", className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn("text-lg font-semibold text-gray-900", className)}>
      {children}
    </h3>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  );
}
