import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  className?: string;
}

export function WhatsAppButton({ className }: WhatsAppButtonProps) {
  return (
    <a
      href={SITE_CONFIG.links.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-50 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 hover:scale-110 flex items-center space-x-2 group",
        className
      )}
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden md:inline font-medium">WhatsApp</span>
    </a>
  );
}
