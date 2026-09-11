# Wonder Tours and Services — Site vitrine

Site web bilingue (français / anglais) de l'agence de voyage **Wonder Tours and Services** (Bénin) : circuits touristiques, blog, témoignages, demandes de contact et réservations, avec un tableau de bord d'administration.

- **Production** : https://wondertourswebsite.vercel.app
- **Dépôt** : https://github.com/romain-djegbenagnon/wondertours_web_site (branche `master`)

## Stack

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 16 (App Router, React 19, Turbopack) |
| Langage | TypeScript |
| Base de données | PostgreSQL (Aiven en production, local en dev) |
| ORM | Prisma 7 (driver adapter `@prisma/adapter-pg`) |
| Validation | Zod 4 |
| UI | Tailwind CSS 4, framer-motion, lucide-react |
| Tests | `bun test` |
| Runtime / paquets | Bun |
| Hébergement | Vercel |

## Architecture backend

Le backend suit une architecture en couches : **route handler → service → Prisma → PostgreSQL**.

```
app/api/**/route.ts          Route handlers (Next.js) — HTTP seulement
        │
        ▼
lib/services/*.ts            Couche services — logique métier, requêtes Prisma
        │
        ▼
lib/db.ts                    Client Prisma singleton (adapter pg) + ré-exports
        │
        ▼
PostgreSQL (Aiven / local)
```

### Couches

- **`app/api/**/route.ts`** — Route handlers Next.js. Valident l'entrée avec des schémas **Zod** (`parseQuery` / `parseBody` de `lib/api/utils.ts`), appellent un service et renvoient du JSON via les helpers `ok`, `created`, `badRequest`, `notFound`, `conflict`… Ils ne contiennent aucune logique métier.
- **`lib/services/*.ts`** — Logique métier et accès aux données : un module par domaine (`circuits`, `destinations`, `bookings`, `contact-requests`, `blog`, `testimonials`, `categories`, `services`, `settings`, `stats`, `media`, `users`). Les services construisent les `where` Prisma (filtres, pagination) et retournent des types inférés.
- **`lib/db.ts`** — Client Prisma en singleton (pattern `globalThis` pour le hot-reload en dev) construit sur l'adapter driver `@prisma/adapter-pg`. Ré-exporte les types du modèle (`User`, `Circuit`…).
- **`lib/api/utils.ts`** — Helpers transverses : schémas de pagination, réponses JSON normalisées (y compris sérialisation BigInt), mapping d'erreurs Prisma (`P2002` → 409, `P2025` → 404, `P2003` → 400) via l'enveloppe `handleRoute`.
- **`prisma/schema.prisma`** — Schéma de 12 tables : `users`, `destinations`, `categories`, `circuits`, `testimonials`, `blog_categories`, `blog_posts`, `services`, `bookings`, `contact_requests`, `settings`, `media_library` (+ 6 enums : rôle, difficulté, type/statut de réservation, type de demande, statut de contact). Client généré dans `lib/generated/prisma` (gitignoré).

### TLS PostgreSQL (important)

Prisma 7 se connecte via le driver `pg` (node-postgres), dont la sémantique `sslmode` diffère de libpq : `sslmode=require` dans l'URI produit un `ssl={}` **vérifiant strictement** la chaîne de certificats, ce qui échoue avec la CA managée Aiven (`self signed certificate in certificate chain`). `lib/db.ts` retire donc `sslmode` de l'URI et fixe `ssl: { rejectUnauthorized: false }` (chiffrement sans vérification, conforme libpq).

### Endpoints API

Publics :

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/circuits` | Liste paginée + filtres (`q`, `destination`, `category`, `featured`, `maxPrice`, `maxDuration`) |
| GET | `/api/circuits/[slug]` | Détail d'un circuit actif (404 sinon) |
| GET | `/api/destinations` | Destinations actives |
| GET | `/api/categories` | Catégories de circuits |
| GET | `/api/services` | Services |
| GET | `/api/testimonials` | Témoignages vérifiés |
| GET | `/api/blog` | Articles publiés, paginés |
| GET | `/api/blog/[slug]` | Détail d'un article |
| POST | `/api/contact` | Créer une demande de contact (validation Zod) |
| POST | `/api/bookings` | Créer une réservation (référence `WT-XXXXXX`) |

Dashboard (⚠️ **pas d'authentification** pour l'instant — ne pas partager l'URL) : `/api/dashboard/{circuits,destinations,categories,testimonials,services,blog,blog-categories,bookings,contact-requests,settings,stats,media,users}` avec CRUD complet (GET/POST, `…/[id]` GET/PATCH/DELETE) et `…/bookings/[id]/status`, `…/contact-requests/[id]/status`.

Le seed (`prisma/seed.ts`) alimente la base depuis les données statiques du site (`lib/data/`, `lib/constants`) par upserts — **rejouable** sans duplication.

## Variables d'environnement

| Variable | Où | Description |
|----------|-----|-------------|
| `DATABASE_URL` | `.env` (local), `.env.prod`, Vercel (Production) | URI PostgreSQL. Local : `postgres://…` (sans ssl). Aiven : `postgres://…?sslmode=require` (le paramètre est neutralisé au runtime, cf. TLS). |
| `NEXT_PUBLIC_SITE_URL` | optionnelle | URL publique pour les métadonnées ; à défaut `SITE_CONFIG.url` (`https://wondertours.bj`) |

Les fichiers `.env*` et `.vercel/` sont gitignorés. Le client Prisma généré (`lib/generated/prisma`) est gitigné et régénéré au `postinstall` (`prisma generate`) — donc pendant le build Vercel.

## Démarrage local

```bash
bun install                # installe + génère le client Prisma (postinstall)

# Base de données locale (PostgreSQL)
#   créez .env :  DATABASE_URL="postgres://user:pass@localhost:5432/wondertours"
bun run db:migrate         # prisma migrate dev (crée/applique la migration)
bun run db:seed            # upserts depuis les données statiques

bun run dev                # http://localhost:3000
```

Autres commandes utiles : `bun run build`, `bun run lint`, `bun test` (23 tests), `bun run db:studio` (Prisma Studio), `bash scripts/smoke-api.sh` (32 vérifications sur `localhost:3000`).

## Déploiement

Le site tourne en production sur **Vercel** avec une base **PostgreSQL managée Aiven**. Procédure détaillée et reproductible : [`docs/deployment.md`](docs/deployment.md).

Résumé :

1. **Base Aiven** — créer le service PostgreSQL (console Aiven, plan Hobbyist-1), récupérer le Service URI (`…?sslmode=require`) ;
2. **Schéma + données** — depuis la machine locale :
   ```bash
   DATABASE_URL="<URI-aiven>" bunx prisma migrate deploy
   DATABASE_URL="<URI-aiven>" bun run db:seed
   ```
3. **Vercel** — projet `wondertours_web_site` (team `amidala-samaris-projects`) :
   ```bash
   bunx vercel link                                          # une seule fois
   echo "<URI-aiven>" | bunx vercel env add DATABASE_URL production
   bunx vercel --prod
   ```
   Le build ne se connecte pas à la base (pages publiques en `force-dynamic`, API en route handlers) ; le client Prisma est régénéré au `postinstall`.
4. **Vérification** — `bash scripts/smoke-api.sh https://wondertourswebsite.vercel.app` (32 vérifications ; supprime les lignes de test via psql, sinon purge manuelle) ;
5. **Mises à jour** — nouvelle migration : `bun run db:migrate` en local → commit → `migrate deploy` sur Aiven → `bunx vercel --prod` (rollback : Deployments → *Promote to Production*).

> ⚠️ Si le CLI échoue en cours de déploiement avec `Error: fetch failed` pendant l'upload, supprimez le cache local (`rm -rf .next`) — les fichiers `.sst` volumineux du cache turbopack cassent l'upload — puis relancez.

## Limitations connues

1. **Uploads média éphémères** : `POST /api/dashboard/media` écrit dans `public/uploads/` → non persistant sur Vercel (FS en lecture seule). Utiliser la médiathèque en local ou migrer vers S3/Cloudinary/Supabase Storage.
2. **`GET/PUT /api/settings`** lisent/écrivent `lib/site-config.json` (FS) → non persistant en prod ; préférer `/api/dashboard/settings` (table `settings`).
3. **Pas d'authentification dashboard** — ne pas partager l'URL `/dashboard`.
4. **Images placeholder** (`[PHOTO … À REMPLACER]`) à remplacer par de vraies images.
5. **metadataBase** non défini (warning build) — définir `NEXT_PUBLIC_SITE_URL` sur le domaine final.
