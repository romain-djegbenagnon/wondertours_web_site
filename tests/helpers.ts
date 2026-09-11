/** Utilitaires communs aux tests : suffixes uniques pour éviter les collisions. */

let counter = 0;

/** Préfixe unique par exécution de test (nom, slug, email…). */
export function uniquePrefix(prefix = "test"): string {
  counter += 1;
  return `${prefix}-${Date.now().toString(36)}${counter.toString(36)}${Math.random()
    .toString(36)
    .slice(2, 6)}`;
}
