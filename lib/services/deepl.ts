import { Translator } from 'deepl-node';

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;

let translator: Translator | null = null;

/**
 * Initialise le traducteur DeepL
 */
export function getTranslator(): Translator {
  if (!DEEPL_API_KEY) {
    throw new Error('DEEPL_API_KEY environment variable is not set');
  }

  if (!translator) {
    translator = new Translator(DEEPL_API_KEY);
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
  targetLang: 'en-US' | 'fr',
  sourceLang?: 'en-US' | 'fr'
): Promise<string> {
  const translator = getTranslator();

  const result = await translator.translateText(
    text,
    (sourceLang as any) || null,
    targetLang as any
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
  targetLang: 'en-US' | 'fr',
  sourceLang?: 'en-US' | 'fr'
): Promise<string[]> {
  const translator = getTranslator();

  const results = await translator.translateText(
    texts,
    (sourceLang as any) || null,
    targetLang as any
  );

  return results.map((result) => result.text);
}

/**
 * Vérifie si la clé API DeepL est configurée
 */
export function isDeepLConfigured(): boolean {
  return !!DEEPL_API_KEY;
}
