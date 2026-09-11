# Utilisation de DeepL pour la traduction

## Vue d'ensemble

L'intégration DeepL permet de traduire dynamiquement du contenu dans votre application Next.js. Le système utilise l'API DeepL pour traduire du texte et des objets entre le français et l'anglais.

## Configuration

1. Assurez-vous d'avoir configuré la variable d'environnement `DEEPL_API_KEY` dans votre fichier `.env.local` (voir `docs/env-setup.md`)

2. Le package `deepl-node` est déjà installé dans le projet.

## Utilisation

### Traduire un texte simple

```typescript
import { translateDynamicText } from '@/lib/services/deepl';

// Traduire un texte en anglais
const translatedText = await translateDynamicText(
  "Bonjour, comment allez-vous ?",
  "en"
);

// Traduire un texte en français
const translatedText = await translateDynamicText(
  "Hello, how are you?",
  "fr"
);
```

### Traduire un objet complet

```typescript
import { translateDynamicObject } from '@/lib/services/deepl';

const content = {
  title: "Découvrez nos circuits",
  description: "Explorez le Bénin avec nos guides expérimentés",
  button: "En savoir plus"
};

const translatedContent = await translateDynamicObject(content, "en");
// Résultat:
// {
//   title: "Discover our tours",
//   description: "Explore Benin with our experienced guides",
//   button: "Learn more"
// }
```

### Utilisation côté serveur uniquement

`deepl-node` est un package Node : il ne peut pas être importé dans un
composant client (`"use client"`), ni via `lib/translations.ts` qui est
partagé avec le bundle navigateur. Utilisez ces helpers uniquement depuis
le serveur (Server Component, Route Handler) ou exposez une route API
que le client appellera :

```typescript
// app/api/translate/route.ts (exemple serveur)
import { translateDynamicText } from "@/lib/services/deepl";

export async function POST(request: Request) {
  const { text, locale } = await request.json();
  const translated = await translateDynamicText(text, locale ?? "en");
  return Response.json({ text: translated });
}
```

## Comportement de fallback

Si la clé API DeepL n'est pas configurée ou si une erreur survient lors de la traduction :
- Le texte original est retourné
- Un avertissement est affiché dans la console
- L'application continue de fonctionner normalement

## Limites

- L'API DeepL a des limites de caractères par requête (selon votre plan)
- Les traductions sont asynchrones, donc assurez-vous de gérer les états de chargement
- Pour les traductions statiques de l'interface, utilisez le système de traductions existant dans `lib/translations.ts`

## Cas d'utilisation recommandés

- **Contenu dynamique** : Traduire du contenu généré par les utilisateurs ou provenant d'une base de données
- **Contenu CMS** : Traduire des articles de blog, des descriptions de circuits, etc.
- **Textes variables** : Traduire des messages personnalisés ou des notifications

Pour les éléments statiques de l'interface (navigation, boutons, etc.), continuez d'utiliser le système de traductions existant.
