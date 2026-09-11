# Configuration des variables d'environnement

## Variables requises

### DeepL API
Pour utiliser la traduction automatique via DeepL, vous devez configurer la variable suivante dans votre fichier `.env.local` :

```env
DEEPL_API_KEY=votre_clé_api_deepl_ici
```

**Comment obtenir une clé API DeepL :**
1. Créez un compte sur [DeepL](https://www.deepl.com/pro-api)
2. Obtenez votre clé API gratuite ou payante
3. Ajoutez-la à votre fichier `.env.local`

**Note :** La clé API DeepL est requise pour le fonctionnement du service de traduction. Sans cette clé, l'application utilisera les traductions statiques définies dans `lib/translations.ts`.
