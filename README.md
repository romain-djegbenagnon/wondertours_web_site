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
- **`lib/services/*.ts`** — Logique métier et accès aux données : un module par domaine (`circuits`, `destinations`, `bookings`, `contact-requests`, `blog`, `testimonials`, `categories`, `services`, `settings`, `stats`, `media`, `users`), complétés par les clients externes `imgbb` (hébergement d'images) et `deepl` (traduction). Les services construisent les `where` Prisma (filtres, pagination) et retournent des types inférés.
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

Dashboard (**authentification requise** — cf. ci-dessous) : `/api/dashboard/{circuits,destinations,categories,testimonials,services,blog,blog-categories,bookings,contact-requests,settings,stats,media,users}` avec CRUD complet (GET/POST, `…/[id]` GET/PATCH/DELETE), `…/bookings/[id]/status`, `…/contact-requests/[id]/status` et `POST …/translate` (traduction DeepL, admin+éditeur).

### Authentification dashboard

Sessions JWT (jose) signées avec `AUTH_SECRET`, stockées dans le cookie httpOnly `wt_session` (7 jours). Trois rôles : **admin** (accès complet, dont la gestion des comptes), **editor** (lecture + écriture du contenu), **viewer** (lecture seule).

- `POST /api/auth/login` — vérifie le mot de passe (bcrypt), émet la session ; `POST /api/auth/logout` — supprime le cookie ;
- les routes `/api/dashboard/**` passent par `handleProtectedRoute` (lib/api/utils.ts) : 401 sans session, 403 si le rôle est insuffisant — GET du contenu pour tous les rôles, écritures pour admin+editor, gestion des comptes (`users/**`) réservée à admin ;
- `proxy.ts` (Next 16 : middleware renommé « proxy ») protège les pages `/dashboard/**` : sans session → redirection vers `/dashboard/login` ; `/dashboard/users**` → admin uniquement (double contrôle : redirection proxy + re-vérification serveur dans la page via `getSession()`, lib/session.ts) ;
- l'UI reflète le rôle : l'entrée « Utilisateurs » de la sidebar n'apparaît que pour l'admin, le header affiche le nom/email/rôle de la session ;
- le seed crée **deux comptes** depuis `.env` : l'admin (`ADMIN_EMAIL` / `ADMIN_PASSWORD`) et un éditeur (`EDITOR_EMAIL` / `EDITOR_PASSWORD`) — idempotent, le mot de passe n'est posé qu'à la création. L'admin crée ensuite d'autres comptes (admin, éditeur ou lecteur) depuis `/dashboard/users/new`.

Le seed (`prisma/seed.ts`) alimente la base depuis les données statiques du site (`lib/data/`, `lib/constants`) par upserts — **rejouable** sans duplication.

## Variables d'environnement

| Variable | Où | Description |
|----------|-----|-------------|
| `DATABASE_URL` | `.env` (local), `.env.prod`, Vercel (Production) | URI PostgreSQL. Local : `postgres://…` (sans ssl). Aiven : `postgres://…?sslmode=require` (le paramètre est neutralisé au runtime, cf. TLS). |
| `AUTH_SECRET` | `.env`, Vercel (Production) | Secret de signature des sessions JWT du dashboard (`openssl rand -base64 32`). **Requis** pour l'authentification. |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | `.env` | Compte administrateur initial créé par le seed (le mot de passe n'est posé qu'à la création). |
| `EDITOR_EMAIL` / `EDITOR_PASSWORD` | `.env` | Compte éditeur initial créé par le seed (idempotent, mêmes règles que l'admin). |
| `NEXT_PUBLIC_SITE_URL` | optionnelle | URL publique pour les métadonnées ; à défaut `SITE_CONFIG.url` (`https://wondertours.bj`) |
| `IMGBB_API_KEY` | `.env`, Vercel (Production) | Optionnelle — stockage distant imgBB pour la médiathèque. **Recommandée en prod** (FS Vercel en lecture seule) ; sans elle, fallback local `public/uploads/` (non persistant). |
| `DEEPL_API_KEY` | `.env`, Vercel (Production) | Optionnelle — active `POST /api/dashboard/translate` (bouton « Traduire en anglais » des formulaires du dashboard) ; sans elle, la route répond `503`. |

Les fichiers `.env*` et `.vercel/` sont gitignorés. Le client Prisma généré (`lib/generated/prisma`) est gitigné et régénéré au `postinstall` (`prisma generate`) — donc pendant le build Vercel.

## Démarrage local

```bash
bun install                # installe + génère le client Prisma (postinstall)

# Base de données locale (PostgreSQL)
#   créez .env :  DATABASE_URL="postgres://user:pass@localhost:5432/wondertours"
bun run db:migrate         # prisma migrate dev (crée/applique la migration)
bun run db:seed            # upserts depuis les données statiques + comptes admin & éditeur

bun run dev                # http://localhost:3000 → dashboard : /dashboard
                           # (connexion : ADMIN_* ou EDITOR_* du .env)
```

Autres commandes utiles : `bun run build`, `bun run lint`, `bun test` (41 tests), `bun run db:studio` (Prisma Studio), `bash scripts/smoke-api.sh` (45 vérifications sur `localhost:3000` : publics, auth, rôles, dashboard).

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
   echo "<secret>"    | bunx vercel env add AUTH_SECRET production
   echo "<clé-imgbb>" | bunx vercel env add IMGBB_API_KEY production  # optionnel : uploads persistants
   bunx vercel --prod
   ```
   Le build ne se connecte pas à la base (pages publiques en `force-dynamic`, API en route handlers) ; le client Prisma est régénéré au `postinstall`.
4. **Vérification** — `bash scripts/smoke-api.sh https://wondertourswebsite.vercel.app` (32 vérifications ; supprime les lignes de test via psql, sinon purge manuelle) ;
5. **Mises à jour** — nouvelle migration : `bun run db:migrate` en local → commit → `migrate deploy` sur Aiven → `bunx vercel --prod` (rollback : Deployments → *Promote to Production*).

> ⚠️ Si le CLI échoue en cours de déploiement avec `Error: fetch failed` pendant l'upload, supprimez le cache local (`rm -rf .next`) — les fichiers `.sst` volumineux du cache turbopack cassent l'upload — puis relancez.

### Hébergement LWS (cPanel mutualisé / Passenger)

Un second hébergement **LWS** est préparé : bundle autonome (`output: "standalone"` dans `next.config.ts`) construit localement ou en CI, déployé via « Setup Node.js App » — aucun build ni `npm install` sur le serveur. La base reste **Aiven** dans un premier temps (bascule future vers le PostgreSQL local LWS documentée). Procédure complète : [`docs/deployment-lws.md`](docs/deployment-lws.md).

```bash
bash scripts/package-lws.sh --smoke   # build + tar.gz dans dist-lws/ + test local du bundle exact
```

### CI/CD GitHub Actions

- **CI** — [`.github/workflows/ci.yml`](.github/workflows/ci.yml) : à chaque push `master` et chaque PR — lint, typecheck, tests sur un PostgreSQL 16 éphémère (migrations + seed, aucune clé externe requise), build + vérification du bundle standalone.
- **Package LWS** — [`.github/workflows/package-lws.yml`](.github/workflows/package-lws.yml) : manuel ou sur tag `lws-v*` — construit le tar.gz de déploiement, le publie en artefact (Release GitHub sur tag). L'upload vers cPanel reste manuel (pas d'accès SSH/API sur le mutualisé).

## Limitations connues

1. **Sessions JWT irrévocables** : stateless (7 jours) — désactiver ou rétrograder un utilisateur n'invalide pas ses sessions déjà émises ; faire tourner `AUTH_SECRET` pour tout révoquer.
2. **Images placeholder** (`[PHOTO … À REMPLACER]`) à remplacer par de vraies images.
3. **metadataBase** non défini (warning build) — définir `NEXT_PUBLIC_SITE_URL` sur le domaine final.
4. **Suppression imgBB manuelle** : imgBB n'expose pas d'API de suppression — supprimer un média en dashboard retire la ligne de la médiathèque, mais l'image distante reste hébergée ; le `delete_url` conservé en base (`storagePath`) permet une suppression manuelle.
5. **Média sans imgBB en prod** : sans `IMGBB_API_KEY`, la médiathèque retombe sur `public/uploads/`, non persistant sur Vercel — définir la clé (cf. « Variables d'environnement »).
