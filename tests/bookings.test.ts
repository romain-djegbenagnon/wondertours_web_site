import { describe, expect, test } from "bun:test";
import {
  listBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
} from "@/lib/services/bookings";
import { createCircuit, deleteCircuit } from "@/lib/services/circuits";
import { uniquePrefix } from "./helpers";

describe("réservations", () => {
  test("création avec référence, calcul du prix depuis le circuit, changement de statut", async () => {
    const title = uniquePrefix("Circuit");
    const circuit = await createCircuit({
      title,
      slug: uniquePrefix("circuit"),
      price: 45000,
      durationDays: 1,
    });

    let bookingId: string | undefined;
    try {
      const booking = await createBooking({
        circuitId: circuit.id,
        type: "circuit",
        customerName: "Client Test",
        customerEmail: "client@example.com",
        participants: 2,
      });

      bookingId = booking.id;
      expect(booking.bookingReference).toMatch(/^WT-[A-Z0-9]{6}$/);
      expect(booking.status).toBe("pending");
      expect(Number(booking.totalPrice)).toBe(90000); // 45000 × 2

      // Filtre par statut
      expect((await listBookings({ status: "pending" })).total).toBeGreaterThanOrEqual(1);

      // Changement de statut
      const confirmed = await updateBookingStatus(booking.id, "confirmed");
      expect(confirmed.status).toBe("confirmed");
      expect((await getBookingById(booking.id))?.status).toBe("confirmed");
      expect((await listBookings({ status: "pending", q: "client@example.com" })).total).toBe(0);
    } finally {
      if (bookingId) await prismaDeleteBooking(bookingId);
      await deleteCircuit(circuit.id);
    }
  });

  test("sans circuit : totalPrice null, référence unique", async () => {
    const booking = await createBooking({
      type: "stay",
      customerName: "Séjour Test",
      customerEmail: "sejour@example.com",
      participants: 3,
    });
    try {
      expect(booking.circuitId).toBeNull();
      expect(booking.totalPrice).toBeNull();
      expect(booking.bookingReference).toMatch(/^WT-[A-Z0-9]{6}$/);
    } finally {
      await prismaDeleteBooking(booking.id);
    }
  });
});

// Le service bookings n'expose volontairement pas de suppression (historique),
// mais les tests nettoient leurs données via Prisma directement.
async function prismaDeleteBooking(id: string) {
  const { prisma } = await import("@/lib/db");
  await prisma.booking.delete({ where: { id } });
}
