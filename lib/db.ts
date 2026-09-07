import {
  PrismaClient,
  Prisma,
  type User,
  type Destination,
  type Category,
  type Circuit,
  type Testimonial,
  type BlogCategory,
  type BlogPost,
  type Service,
  type Booking,
  type ContactRequest,
  type Setting,
  type MediaFile,
} from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7 exige un driver adapter : on utilise pg (PostgreSQL local).
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Ré-exports pratiques pour la couche services.
export { Prisma };
export const { DbNull, JsonNull } = Prisma;
export type {
  User,
  Destination,
  Category,
  Circuit,
  Testimonial,
  BlogCategory,
  BlogPost,
  Service,
  Booking,
  ContactRequest,
  Setting,
  MediaFile,
};
