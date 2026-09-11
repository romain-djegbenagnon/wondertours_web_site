import { prisma } from "@/lib/db";

/** Agrégats pour le tableau de bord principal. */
export async function getDashboardStats(): Promise<{
  circuits: { total: number; active: number; featured: number };
  destinations: { total: number; active: number };
  categories: { total: number; active: number };
  testimonials: { total: number; active: number; averageRating: number | null };
  blog: { total: number; published: number };
  bookings: {
    total: number;
    pending: number;
    confirmed: number;
    thisMonth: number;
    revenueThisMonth: number;
  };
  contactRequests: { total: number; new: number; inProgress: number };
  mediaFiles: { total: number };
  users: { total: number };
}> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    circuitActive,
    circuitTotal,
    circuitFeatured,
    destinationActive,
    destinationTotal,
    categoryActive,
    categoryTotal,
    testimonialAgg,
    testimonialTotal,
    blogPublished,
    blogTotal,
    bookingTotal,
    bookingPending,
    bookingConfirmed,
    bookingsThisMonth,
    contactTotal,
    contactNew,
    contactInProgress,
    mediaCount,
    userCount,
  ] = await prisma.$transaction([
    prisma.circuit.count({ where: { isActive: true } }),
    prisma.circuit.count(),
    prisma.circuit.count({ where: { isActive: true, isFeatured: true } }),
    prisma.destination.count({ where: { isActive: true } }),
    prisma.destination.count(),
    prisma.category.count({ where: { isActive: true } }),
    prisma.category.count(),
    prisma.testimonial.aggregate({
      _avg: { rating: true },
      _count: { _all: true },
      where: { isActive: true },
    }),
    prisma.testimonial.count(),
    prisma.blogPost.count({ where: { isPublished: true } }),
    prisma.blogPost.count(),
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "pending" } }),
    prisma.booking.count({ where: { status: "confirmed" } }),
    prisma.booking.aggregate({
      _count: { _all: true },
      _sum: { totalPrice: true },
      where: { createdAt: { gte: startOfMonth } },
    }),
    prisma.contactRequest.count(),
    prisma.contactRequest.count({ where: { status: "new" } }),
    prisma.contactRequest.count({ where: { status: "in_progress" } }),
    prisma.mediaFile.count(),
    prisma.user.count(),
  ]);

  return {
    circuits: {
      total: circuitTotal,
      active: circuitActive,
      featured: circuitFeatured,
    },
    destinations: { total: destinationTotal, active: destinationActive },
    categories: { total: categoryTotal, active: categoryActive },
    testimonials: {
      total: testimonialTotal,
      active: testimonialAgg._count._all,
      averageRating: testimonialAgg._avg.rating
        ? Math.round(testimonialAgg._avg.rating * 10) / 10
        : null,
    },
    blog: { total: blogTotal, published: blogPublished },
    bookings: {
      total: bookingTotal,
      pending: bookingPending,
      confirmed: bookingConfirmed,
      thisMonth: bookingsThisMonth._count._all,
      revenueThisMonth: Number(bookingsThisMonth._sum.totalPrice ?? 0),
    },
    contactRequests: {
      total: contactTotal,
      new: contactNew,
      inProgress: contactInProgress,
    },
    mediaFiles: { total: mediaCount },
    users: { total: userCount },
  };
}

/** Dernières réservations pour le widget dashboard. */
export async function getRecentBookings(limit = 5) {
  return prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { circuit: { select: { title: true, slug: true } } },
  });
}

/** Dernières demandes de contact pour le widget dashboard. */
export async function getRecentContactRequests(limit = 5) {
  return prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
