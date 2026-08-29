import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "accent";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        {
          "bg-primary/10 text-primary": variant === "default",
          "bg-secondary/20 text-text": variant === "secondary",
          "bg-accent/10 text-accent": variant === "accent",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
