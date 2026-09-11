import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { listBookings } from "@/lib/services/bookings";
import { BookingRowActions } from "@/components/dashboard/row-actions";
import { SearchInput } from "@/components/dashboard/search-input";
import { formatDate, formatFcfa } from "@/lib/format";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  cancelled: "Annulée",
  completed: "Terminée",
};

/** Date de voyage au format "15 janv. 2024". */
function travelDate(booking: { travelDate: Date | null }): string {
  return formatDate(booking.travelDate);
}

interface BookingsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BookingsPage({ searchParams }: BookingsPageProps) {
  const filters = await searchParams;
  const q = typeof filters.q === "string" ? filters.q : undefined;
  const status =
    typeof filters.status === "string" &&
    ["pending", "confirmed", "cancelled", "completed"].includes(filters.status)
      ? (filters.status as "pending" | "confirmed" | "cancelled" | "completed")
      : undefined;

  const { items: bookings, total } = await listBookings({
    pageSize: 100,
    q,
    status,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Réservations</h1>
        <p className="text-gray-600 mt-1">
          {total} réservation{total > 1 ? "s" : ""}
        </p>
      </div>

      <Card>
        <CardContent className="p-4">
          <SearchInput placeholder="Rechercher une réservation (client, email, référence)…" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Référence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Circuit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    Aucune réservation.
                  </td>
                </tr>
              )}
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {booking.bookingReference}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{booking.customerName}</p>
                        <p className="text-sm text-gray-500">{booking.customerEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {booking.circuit?.title ?? "—"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{travelDate(booking)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{booking.participants ?? "—"}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {booking.totalPrice !== null
                      ? formatFcfa(Number(booking.totalPrice))
                      : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {STATUS_LABELS[booking.status] ?? booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <BookingRowActions id={booking.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
