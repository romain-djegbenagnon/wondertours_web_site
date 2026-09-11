import { z } from "zod";
import { created, parseBody, badRequest, handleRoute } from "@/lib/api/utils";
import { createBooking } from "@/lib/services/bookings";
import { getCircuitById } from "@/lib/services/circuits";

const bodySchema = z.object({
  circuitId: z.string().uuid().optional(),
  type: z.enum(["circuit", "stay", "hotel"]).default("circuit"),
  name: z.string().trim().min(2).max(255),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(50).optional(),
  travelDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format attendu YYYY-MM-DD")
    .optional()
    .or(z.literal("")),
  returnDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format attendu YYYY-MM-DD")
    .optional()
    .or(z.literal("")),
  participants: z.coerce.number().int().min(1).max(100).optional(),
  notes: z.string().trim().max(5000).optional(),
});

export async function POST(request: Request) {
  return handleRoute(async () => {
    const [body, errorResponse] = await parseBody(request, bodySchema);
    if (errorResponse) return errorResponse;

    // Si un circuit est fourni, il doit exister et être actif.
    if (body.circuitId) {
      const circuit = await getCircuitById(body.circuitId);
      if (!circuit || !circuit.isActive) {
        return badRequest("Circuit invalide ou introuvable");
      }
    }

    const booking = await createBooking({
      circuitId: body.circuitId ?? null,
      type: body.type,
      customerName: body.name,
      customerEmail: body.email,
      customerPhone: body.phone || null,
      travelDate: body.travelDate ? new Date(body.travelDate) : null,
      returnDate: body.returnDate ? new Date(body.returnDate) : null,
      participants: body.participants ?? null,
      notes: body.notes || null,
    });

    return created({
      message: "Réservation enregistrée avec succès",
      id: booking.id,
      bookingReference: booking.bookingReference,
      totalPrice: booking.totalPrice,
      currency: booking.currency,
      status: booking.status,
    });
  });
}
