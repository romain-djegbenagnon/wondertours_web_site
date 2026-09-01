"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ReservationItem {
  id: string;
  type: "circuit" | "sejour" | "hotel";
  title: string;
  price: number;
  image: string;
  date: string;
  userId: string;
}

interface ReservationsContextType {
  reservations: ReservationItem[];
  addReservation: (item: Omit<ReservationItem, "id" | "userId">) => void;
  removeReservation: (id: string) => void;
  clearReservations: () => void;
  getCurrentUserReservations: () => ReservationItem[];
}

const ReservationsContext = createContext<ReservationsContextType | undefined>(undefined);

// Simuler un ID utilisateur (en production, cela viendrait de l'auth)
const getCurrentUserId = () => {
  if (typeof window === "undefined") return "default_user";
  const storedUserId = localStorage.getItem("userId");
  if (storedUserId) return storedUserId;
  const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem("userId", newUserId);
  return newUserId;
};

export function ReservationsProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem("reservations");
    if (stored) {
      setReservations(JSON.parse(stored));
    }
  }, []);

  const addReservation = (item: Omit<ReservationItem, "id" | "userId">) => {
    if (!isMounted) return;
    const userId = getCurrentUserId();
    const newReservation: ReservationItem = {
      ...item,
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
    };
    const updated = [...reservations, newReservation];
    setReservations(updated);
    localStorage.setItem("reservations", JSON.stringify(updated));
  };

  const removeReservation = (id: string) => {
    if (!isMounted) return;
    const updated = reservations.filter((r) => r.id !== id);
    setReservations(updated);
    localStorage.setItem("reservations", JSON.stringify(updated));
  };

  const clearReservations = () => {
    if (!isMounted) return;
    const userId = getCurrentUserId();
    const updated = reservations.filter((r) => r.userId !== userId);
    setReservations(updated);
    localStorage.setItem("reservations", JSON.stringify(updated));
  };

  const getCurrentUserReservations = () => {
    if (!isMounted) return [];
    const userId = getCurrentUserId();
    return reservations.filter((r) => r.userId === userId);
  };

  return (
    <ReservationsContext.Provider
      value={{
        reservations: getCurrentUserReservations(),
        addReservation,
        removeReservation,
        clearReservations,
        getCurrentUserReservations,
      }}
    >
      {children}
    </ReservationsContext.Provider>
  );
}

export function useReservations() {
  const context = useContext(ReservationsContext);
  if (context === undefined) {
    throw new Error("useReservations must be used within a ReservationsProvider");
  }
  return context;
}
