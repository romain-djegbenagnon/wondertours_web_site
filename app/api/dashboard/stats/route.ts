import { ok, handleRoute } from "@/lib/api/utils";
import {
  getDashboardStats,
  getRecentBookings,
  getRecentContactRequests,
} from "@/lib/services/stats";

export async function GET() {
  return handleRoute(async () => {
    const [stats, recentBookings, recentContactRequests] = await Promise.all([
      getDashboardStats(),
      getRecentBookings(5),
      getRecentContactRequests(5),
    ]);

    return ok({
      ...stats,
      recentBookings,
      recentContactRequests,
    });
  });
}
