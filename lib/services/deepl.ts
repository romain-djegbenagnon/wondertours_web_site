import {
  Translator,
  type SourceLanguageCode,
  type TargetLanguageCode,
} from 'deepl-node';
import type { Locale } from '../translations';

let translator: Translator | null = null;

/**
 * Clé API DeepL — résolue paresseusement à chaque usage (et non au chargement
 * du module), comme AUTH_SECRET dans lib/auth.ts.
 */
function getApiKey(): string | undefined {
  return process.env.DEEPL_API_KEY;
}

/**
 * Initialise le traducteur DeepL
 */
export function getTranslator(): Translator {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('DEEPL_API_KEY environment variable is not set');
  }

  if (!translator) {
    translator = new Translator(apiKey);
  }

  return translator;
}

/**
 * Traduit un texte d'une langue à une autre
 * @param text - Texte à traduire
 * @param targetLang - Langue cible (ex: 'en-US', 'fr')
 * @param sourceLang - Langue source (optionnel, auto-détection si non spécifié)
 */
export async function translateText(
  text: string,
  targetLang: TargetLanguageCode,
  sourceLang?: SourceLanguageCode
): Promise<string> {
  const translator = getTranslator();

  const result = await translator.translateText(
    text,
    sourceLang ?? null,
    targetLang
  );

  return result.text;
}

/**
 * Traduit plusieurs textes en une seule requête
 * @param texts - Tableau de textes à traduire
 * @param targetLang - Langue cible
 * @param sourceLang - Langue source (optionnel)
 */
export async function translateTexts(
  texts: string[],
  targetLang: TargetLanguageCode,
  sourceLang?: SourceLanguageCode
): Promise<string[]> {
  const translator = getTranslator();

  const results = await translator.translateText(
    texts,
    sourceLang ?? null,
    targetLang
  );

  return results.map((result) => result.text);
}

/**
 * Vérifie si la clé API DeepL est configurée
 */
export function isDeepLConfigured(): boolean {
  return Boolean(getApiKey());
}

// ─── Helpers de traduction dynamique (serveur uniquement) ───
// deepl-node est un package Node : ne jamais l'importer depuis un
// composant client, la clé API ne doit pas être exposée au navigateur.

/**
 * Traduit un texte dynamiquement en utilisant DeepL
 * @param text - Texte à traduire
 * @param targetLocale - Langue cible
 * @returns Texte traduit ou texte original si DeepL n'est pas configuré
 */
export async function translateDynamicText(
  text: string,
  targetLocale: Locale
): Promise<string> {
  // Si DeepL n'est pas configuré, retourne le texte original
  if (!isDeepLConfigured()) {
    console.warn('DeepL API key not configured. Using original text.');
    return text;
  }

  try {
    const targetLang = targetLocale === 'en' ? 'en-US' : 'fr';
    return await translateText(text, targetLang);
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text on error
  }
}

/**
 * Traduit un objet de traductions dynamiquement
 * @param obj - Objet avec des textes à traduire
 * @param targetLocale - Langue cible
 * @returns Objet avec les textes traduits
 */
export async function translateDynamicObject<
  T extends Record<string, unknown>
>(
  obj: T,
  targetLocale: Locale
): Promise<T> {
  if (!isDeepLConfigured()) {
    return obj;
  }

  const translatedObj: Record<string, unknown> = { ...obj };

  for (const key in translatedObj) {
    const value = translatedObj[key];
    if (typeof value === 'string') {
      translatedObj[key] = await translateDynamicText(value, targetLocale);
    } else if (value && typeof value === 'object') {
      translatedObj[key] = await translateDynamicObject(
        value as Record<string, unknown>,
        targetLocale
      );
    }
  }

  return translatedObj as T;
}
