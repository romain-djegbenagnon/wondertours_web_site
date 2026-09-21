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

### `IMGBB_API_KEY` — optionnel en local, recommandé en production

Clé du service d'hébergement d'images imgBB (https://api.imgbb.com, compte gratuit). Elle pilote la médiathèque (`lib/services/media.ts` + client `lib/services/imgbb.ts`) :

- **clé définie** : les uploads `POST /api/dashboard/media` partent vers imgBB — `url` est l'URL distante (`https://i.ibb.co/…`), `storagePath` conserve le `delete_url` imgBB (page de suppression manuelle — imgBB n'a pas d'API de suppression) ;
- **clé absente** : fallback sur le stockage local `public/uploads/` — parfait en dev/tests, mais **non persistant sur Vercel** (FS en lecture seule).

La clé est relue à chaque upload, pas au chargement du module.

### `DEEPL_API_KEY` — optionnel

Clé du service de traduction DeepL (`lib/services/deepl.ts`). Elle active la route `POST /api/dashboard/translate` (admin + éditeur), utilisée par le bouton « Traduire en anglais (DeepL) » des formulaires du dashboard (circuit, article blog, témoignage) pour pré-remplir les champs `*En` depuis les champs français. Sans la clé, la route répond `503` ; l'interface publique continue d'utiliser les traductions statiques de `lib/translations.ts`.

## Production (Vercel)

Ajouter au minimum : `DATABASE_URL`, `AUTH_SECRET`, et au premier déploiement `ADMIN_EMAIL` / `ADMIN_PASSWORD` + `EDITOR_EMAIL` / `EDITOR_PASSWORD` si le seed doit créer les comptes initiaux :

```bash
bunx vercel env add AUTH_SECRET production
```

Recommandées en production :

```bash
bunx vercel env add IMGBB_API_KEY production   # uploads média persistants (sinon fallback local non persistant)
bunx vercel env add DEEPL_API_KEY production   # optionnel : bouton « Traduire en anglais » du dashboard
```
