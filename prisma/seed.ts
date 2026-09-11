/**
 * Seed de la base Wonder Tours depuis les données statiques du site.
 * Idempotent : utilise upsert par slug/label — rejouable sans dupliquer.
 * Lancer : bun prisma/seed.ts (ou bun run db:seed)
 */
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { CIRCUITS } from "../lib/data/circuits";
import { BLOG_POSTS } from "../lib/data/blog";
import { TESTIMONIALS } from "../lib/data/testimonials";
import { SERVICES, DESTINATIONS, CATEGORIES, SITE_CONFIG } from "../lib/constants";
import { slugify } from "../lib/slug";

// ⚠️ node-pg ≠ libpq : sslmode=require dans l'URI produit ssl={} qui
// écrase le ssl du config (cf. pg/lib/connection-parameters.js) → on
// retire le paramètre et on fixe ssl nous-même. Détail complet dans lib/db.ts.
const dbUrl = process.env.DATABASE_URL ?? "";
const url = dbUrl ? new URL(dbUrl) : null;
const sslmode = url?.searchParams.get("sslmode") ?? null;
const relaxSsl = sslmode === "require" || sslmode === "prefer";
if (url && relaxSsl) url.searchParams.delete("sslmode");
const adapter = new PrismaPg({
  connectionString: url ? url.toString() : dbUrl,
  ...(relaxSsl ? { ssl: { rejectUnauthorized: false } } : {}),
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seed Wonder Tours…");

  // ── Destinations ──
  for (const name of DESTINATIONS) {
    const slug = slugify(name);
    await prisma.destination.upsert({
      where: { slug },
      update: { name },
      create: { name, slug, country: "Bénin" },
    });
  }
  console.log(`✔ destinations: ${DESTINATIONS.length}`);

  // ── Catégories de circuits ──
  for (const [index, name] of CATEGORIES.entries()) {
    const slug = slugify(name);
    await prisma.category.upsert({
      where: { slug },
      update: { name },
      create: { name, slug, sortOrder: index },
    });
  }
  console.log(`✔ catégories: ${CATEGORIES.length}`);

  // ── Services ──
  for (const service of SERVICES) {
    const existing = await prisma.service.findFirst({ where: { title: service.title } });
    if (existing) {
      await prisma.service.update({
        where: { id: existing.id },
        data: {
          description: service.description,
          icon: service.icon,
          href: service.href,
          sortOrder: service.id,
        },
      });
    } else {
      await prisma.service.create({
        data: {
          title: service.title,
          description: service.description,
          icon: service.icon,
          href: service.href,
          sortOrder: service.id,
        },
      });
    }
  }
  console.log(`✔ services: ${SERVICES.length}`);

  // ── Catégories de blog (issues des articles existants) ──
  const blogCategoryNames = [...new Set(BLOG_POSTS.map((p) => p.category))];
  for (const [index, name] of blogCategoryNames.entries()) {
    const slug = slugify(name);
    await prisma.blogCategory.upsert({
      where: { slug },
      update: { name },
      create: { name, slug, sortOrder: index },
    });
  }
  console.log(`✔ catégories blog: ${blogCategoryNames.length}`);

  // ── Articles de blog ──
  for (const post of BLOG_POSTS) {
    const category = await prisma.blogCategory.findUnique({
      where: { slug: slugify(post.category) },
    });
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        imageUrl: post.image,
        readTime: parseInt(post.readTime, 10),
        isPublished: true,
        publishedAt: new Date(post.date),
      },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        imageUrl: post.image,
        readTime: parseInt(post.readTime, 10),
        tags: [],
        isPublished: true,
        isFeatured: false,
        publishedAt: new Date(post.date),
        categoryId: category?.id,
      },
    });
  }
  console.log(`✔ articles blog: ${BLOG_POSTS.length}`);

  // ── Circuits ──
  for (const circuit of CIRCUITS) {
    const destination = await prisma.destination.findUnique({
      where: { slug: slugify(circuit.destination) },
    });
    const category = await prisma.category.findUnique({
      where: { slug: slugify(circuit.category) },
    });
    const durationDays = parseInt(circuit.duration, 10) || 1;

    await prisma.circuit.upsert({
      where: { slug: circuit.slug },
      update: {
        title: circuit.title,
        description: circuit.description,
        imageUrl: circuit.image,
        highlights: circuit.highlights,
        itinerary: circuit.itinerary,
        included: circuit.included,
        excluded: circuit.excluded,
      },
      create: {
        slug: circuit.slug,
        title: circuit.title,
        description: circuit.description,
        imageUrl: circuit.image,
        price: circuit.price,
        currency: "XOF",
        durationDays,
        durationNights: Math.max(durationDays - 1, 0),
        highlights: circuit.highlights,
        itinerary: circuit.itinerary,
        included: circuit.included,
        excluded: circuit.excluded,
        destinationId: destination?.id,
        categoryId: category?.id,
      },
    });
  }
  console.log(`✔ circuits: ${CIRCUITS.length}`);

  // ── Témoignages ──
  // Clé de dédoublonnage nom+pays : les noms placeholder sont identiques,
  // un findFirst sur le nom seul écraserait 4 fois la même ligne.
  for (const t of TESTIMONIALS) {
    const existing = await prisma.testimonial.findFirst({
      where: { name: t.name, country: t.country },
    });
    const data = {
      name: t.name,
      country: t.country,
      rating: t.rating,
      text: t.text,
      avatarUrl: t.avatar,
      date: t.date ? new Date(t.date) : null,
      isVerified: true,
    };
    if (existing) {
      await prisma.testimonial.update({ where: { id: existing.id }, data });
    } else {
      await prisma.testimonial.create({ data });
    }
  }
  console.log(`✔ témoignages: ${TESTIMONIALS.length}`);

  // ── Paramètres du site ──
  const settings: Array<{ key: string; value: string; description: string }> = [
    { key: "site_name", value: SITE_CONFIG.name, description: "Nom du site" },
    { key: "site_description", value: SITE_CONFIG.description, description: "Description du site" },
    { key: "site_url", value: SITE_CONFIG.url, description: "URL publique du site" },
    { key: "contact_email", value: SITE_CONFIG.contact.email, description: "Email de contact" },
    { key: "contact_phone", value: SITE_CONFIG.contact.phone, description: "Téléphone de contact" },
    { key: "contact_address", value: SITE_CONFIG.contact.address, description: "Adresse" },
    { key: "social_facebook", value: SITE_CONFIG.links.facebook, description: "URL Facebook" },
    { key: "social_instagram", value: SITE_CONFIG.links.instagram, description: "URL Instagram" },
    { key: "social_youtube", value: SITE_CONFIG.links.youtube, description: "URL YouTube" },
    { key: "whatsapp_number", value: SITE_CONFIG.links.whatsapp, description: "Lien WhatsApp" },
  ];
  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log(`✔ paramètres: ${settings.length}`);

  console.log("🌱 Seed terminé.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
