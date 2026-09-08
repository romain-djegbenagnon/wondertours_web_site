// Cache pour éviter de traduire le même texte plusieurs fois
const translationCache = new Map<string, Map<string, string>>();

export async function translateText(
  text: string,
  targetLanguage: string,
  sourceLanguage: string = 'fr'
): Promise<string> {
  // Vérifier le cache
  const cacheKey = text.toLowerCase();
  if (translationCache.has(cacheKey)) {
    const cached = translationCache.get(cacheKey)!;
    if (cached.has(targetLanguage)) {
      return cached.get(targetLanguage)!;
    }
  }

  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    console.warn('GOOGLE_TRANSLATE_API_KEY not set. Google Translate fallback will not work.');
    return text;
  }

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLanguage,
          target: targetLanguage,
          format: 'text',
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.statusText}`);
    }

    const data = await response.json();
    const translation = data.data.translations[0].translatedText;

    // Mettre en cache
    if (!translationCache.has(cacheKey)) {
      translationCache.set(cacheKey, new Map());
    }
    translationCache.get(cacheKey)!.set(targetLanguage, translation);

    return translation;
  } catch (error) {
    console.error('Translation error:', error);
    // En cas d'erreur, retourner le texte original
    return text;
  }
}

export async function translateWithFallback(
  text: string,
  targetLanguage: string,
  manualTranslation?: string,
  sourceLanguage: string = 'fr'
): Promise<string> {
  // Si une traduction manuelle existe et n'est pas vide, l'utiliser
  if (manualTranslation && manualTranslation.trim() !== '') {
    return manualTranslation;
  }

  // Sinon, utiliser Google Translate
  return translateText(text, targetLanguage, sourceLanguage);
}
