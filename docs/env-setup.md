# Configuration des variables d'environnement

Les fichiers `.env*` sont gitignorés. Next.js/Bun chargent `.env.local` (priorité) puis `.env` ; en production, les variables sont définies côté Vercel.

## Variables

### `DATABASE_URL` — requis

URI PostgreSQL. Local : `postgres://user:pass@localhost:5432/wondertours` (sans ssl). Aiven : `postgres://…?sslmode=require` (le paramètre est neutralisé au runtime, cf. `lib/db.ts`).

### `AUTH_SECRET` — requis (dashboard)

Secret de signature des sessions JWT du dashboard (cookie `wt_session`, 7 jours).

```bash
openssl rand -base64 32
```

Sans cette variable, la connexion au dashboard est impossible (les tokens ne peuvent être ni signés ni vérifiés).

### `ADMIN_EMAIL` / `ADMIN_PASSWORD` — recommandé (seed)

Compte administrateur initial créé par `bun run db:seed` :

- si aucun utilisateur n'existe pour `ADMIN_EMAIL`, il est créé admin avec `ADMIN_PASSWORD` (hash bcrypt) ;
- si l'utilisateur existe déjà, seul son rôle est re-synchronisé — **le mot de passe n'est jamais écrasé** : changer `ADMIN_PASSWORD` après création ne fait rien.

### `EDITOR_EMAIL` / `EDITOR_PASSWORD` — recommandé (seed)

Compte éditeur initial créé par `bun run db:seed` (mêmes règles que l'admin) : créé avec `EDITOR_PASSWORD` (hash bcrypt) s'il n'existe pas ; sinon seul son rôle est re-synchronisé — **le mot de passe n'est jamais écrasé**.

Ce deuxième compte permet de vérifier les accès par rôle : l'éditeur lit et écrit le contenu, mais n'a pas accès à la gestion des comptes (entrée « Utilisateurs » masquée, pages `/dashboard/users**` et API `users/**` réservées à l'admin).

### `NEXT_PUBLIC_SITE_URL` — optionnel

URL publique utilisée pour les métadonnées (`metadataBase`, canonicals). À défaut, `SITE_CONFIG.url` (`https://wondertours.bj`).

### `DEEPL_API_KEY` — optionnel (actuellement inutilisé)

Clé du service de traduction DeepL (`lib/services/deepl.ts`). Le service n'est pour l'instant branché nulle part : sans la clé, l'application utilise les traductions statiques de `lib/translations.ts`.

## Production (Vercel)

Ajouter au minimum : `DATABASE_URL`, `AUTH_SECRET`, et au premier déploiement `ADMIN_EMAIL` / `ADMIN_PASSWORD` + `EDITOR_EMAIL` / `EDITOR_PASSWORD` si le seed doit créer les comptes initiaux :

```bash
bunx vercel env add AUTH_SECRET production
```
