/**
 * Adaptateurs Prisma → view-models attendus par les composants front.
 *
 * Les cards et pages publiques ont été conçues autour des formes statiques de
 * `lib/data/*` (relations en strings, prix number, durées "2 jours"...).
 * Plutôt que modifier tous les composants, on convertit ici les enregistrements
 * de la base (relations objets, Decimal, Int, DateTime, Json) vers ces formes.
 */
import type { Circuit as StaticCircuit } from "@/lib/data/circuits";
import type { BlogPost as StaticBlogPost } from "@/lib/data/blog";
import type { Testimonial as StaticTestimonial } from "@/lib/data/testimonials";
import type { CircuitWithRelations } from "@/lib/services/circuits";
import type { BlogPostWithRelations } from "@/lib/services/blog";
import type { Testimonial } from "@/lib/db";

// ─────────────────────────────── Helpers ───────────────────────────────

/** Json → tableau de chaînes (highlights, included, excluded...). */
function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

/** Json → itinéraire typé (programme jour par jour). */
function toItinerary(
  value: unknown
): { day: number; title: string; description: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      if (typeof entry !== "object" || entry === null) return null;
      const e = entry as Record<string, unknown>;
      if (typeof e.day !== "number" || typeof e.title !== "string") return null;
      return {
        day: e.day,
        title: e.title,
        description: typeof e.description === "string" ? e.description : "",
      };
    })
    .filter((v): v is { day: number; title: string; description: string } => v !== null);
}

/** durationDays → "1 jour" / "2 jours" ; null → "Durée sur mesure". */
function formatDuration(days: number | null | undefined): string {
  if (!days || days < 1) return "Sur mesure";
  return `${days} jour${days > 1 ? "s" : ""}`;
}

/** Date ISO → "2024-01-15" (format des view-models statiques). */
function toDateString(date: Date | null | undefined): string {
  if (!date) return "";
  return date.toISOString().slice(0, 10);
}

// ─────────────────────────────── Circuits ───────────────────────────────

export function toCircuitVM(circuit: CircuitWithRelations): StaticCircuit {
  return {
    id: circuit.id,
    slug: circuit.slug,
    title: circuit.title,
    destination: circuit.destination?.name ?? "Bénin",
    category: circuit.category?.name ?? "Circuit",
    duration: formatDuration(circuit.durationDays),
    price: Number(circuit.price),
    image: circuit.imageUrl ?? "",
    description: circuit.description ?? "",
    highlights: toStringArray(circuit.highlights),
    itinerary: toItinerary(circuit.itinerary),
    included: toStringArray(circuit.included),
    excluded: toStringArray(circuit.excluded),
  };
}

// ─────────────────────────────── Blog ───────────────────────────────

export function toBlogPostVM(post: BlogPostWithRelations): StaticBlogPost {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    category: post.category?.name ?? "Voyage",
    excerpt: post.excerpt ?? "",
    content: post.content ?? "",
    image: post.imageUrl ?? "",
    date: toDateString(post.publishedAt ?? post.createdAt),
    author: post.author
      ? `${post.author.firstName} ${post.author.lastName}`.trim()
      : "Wonder Tours",
    readTime: post.readTime ? `${post.readTime} min` : "5 min",
  };
}

// ─────────────────────────────── Témoignages ───────────────────────────────

export function toTestimonialVM(testimonial: Testimonial): StaticTestimonial {
  return {
    id: testimonial.id,
    name: testimonial.name,
    country: testimonial.country ?? "",
    rating: testimonial.rating,
    text: testimonial.text,
    avatar: testimonial.avatarUrl ?? undefined,
    date: toDateString(testimonial.date),
  };
}
