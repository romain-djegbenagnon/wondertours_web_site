"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";

/**
 * Champ de recherche de liste dashboard : met à jour ?q= dans l'URL
 * (debounce 400 ms) ; les Server Components refiltrent via searchParams.
 */
export function SearchInput({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const [value, setValue] = useState(urlQuery);
  // Dernière valeur déjà reflétée dans l'URL : évite de reseter le champ
  // pendant que l'utilisateur tape (le debounce met l'URL à jour ensuite).
  const syncedValue = useRef(urlQuery);

  // Synchronise le champ si l'URL change pour une raison externe
  // (navigation, bouton retour), hors frappe en cours.
  useEffect(() => {
    if (urlQuery !== syncedValue.current) {
      syncedValue.current = urlQuery;
      setValue(urlQuery);
    }
  }, [urlQuery]);

  useEffect(() => {
    const current = searchParams.get("q") ?? "";
    if (value === current) return;
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set("q", value.trim());
      } else {
        params.delete("q");
      }
      const query = params.toString();
      syncedValue.current = value.trim();
      router.replace(query ? `${pathname}?${query}` : pathname);
    }, 400);
    return () => clearTimeout(timer);
  }, [value, pathname, router, searchParams]);

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Effacer la recherche"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
