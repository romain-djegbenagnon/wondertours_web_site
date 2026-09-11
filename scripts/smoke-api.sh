#!/usr/bin/env bash
# Smoke test de l'API Wonder Tours.
# Usage : ./scripts/smoke-api.sh [BASE_URL]
# Nécessite un serveur démarré (bun run dev) et une base seedée (bun run db:seed).
# Crée une demande de contact et une réservation puis les supprime de la base
# via psql (DATABASE_URL lu dans .env).

set -euo pipefail

BASE_URL="${1:-http://localhost:3000}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

PASS=0
FAIL=0
BOOKING_ID=""
CONTACT_ID=""

# ───────────────────────── Helpers ─────────────────────────

check() {
  local label="$1"
  local expected="$2"
  local actual="$3"
  if [ "$actual" = "$expected" ]; then
    PASS=$((PASS + 1))
    printf "✓ %s\n" "$label"
  else
    FAIL=$((FAIL + 1))
    printf "✗ %s (attendu %s, obtenu %s)\n" "$label" "$expected" "$actual" >&2
  fi
}

# check_json <label> <expected> <json> <champ python>
check_json() {
  local label="$1" expected="$2" json="$3" expr="$4"
  local actual
  actual=$(echo "$json" | python3 -c "import json,sys; d=json.load(sys.stdin); print($expr)" 2>/dev/null || echo "PARSE_ERROR")
  check "$label" "$expected" "$actual"
}

cleanup() {
  if [ -n "$BOOKING_ID" ] || [ -n "$CONTACT_ID" ]; then
    set +e
    DB_URL=$(grep -E '^DATABASE_URL=' "$ROOT_DIR/.env" | head -1 | cut -d= -f2-)
    if [ -n "$DB_URL" ]; then
      [ -n "$BOOKING_ID" ] && psql "${DB_URL%%\?*}" -q -c "DELETE FROM bookings WHERE id='$BOOKING_ID';" >/dev/null 2>&1
      [ -n "$CONTACT_ID" ] && psql "${DB_URL%%\?*}" -q -c "DELETE FROM contact_requests WHERE id='$CONTACT_ID';" >/dev/null 2>&1
    fi
    set -e
  fi
}
trap cleanup EXIT

echo "── Smoke API sur $BASE_URL ──"

# ───────────────────── Endpoints publics ─────────────────────

check "GET /api/circuits" 200 "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/api/circuits")"
check "GET /api/circuits?featured=true" 200 "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/api/circuits?featured=true")"
check "GET /api/circuits/maxPrice invalide" 400 "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/api/circuits?maxPrice=abc")"

CIRCUIT_SLUG=$(curl -s "$BASE_URL/api/circuits?pageSize=1" | python3 -c "import json,sys; print(json.load(sys.stdin)['items'][0]['slug'])")
check "GET /api/circuits/[slug]" 200 "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/api/circuits/$CIRCUIT_SLUG")"
check "GET /api/circuits/[slug] inexistant" 404 "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/api/circuits/slug-inexistant-xyz")"

check "GET /api/destinations" 200 "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/api/destinations")"
DEST_SLUG=$(curl -s "$BASE_URL/api/destinations" | python3 -c "import json,sys; print(json.load(sys.stdin)['items'][0]['slug'])")
check "GET /api/circuits?destination" 200 "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/api/circuits?destination=$DEST_SLUG")"
check "GET /api/categories" 200 "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/api/categories")"
check "GET /api/services" 200 "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/api/services")"
check "GET /api/testimonials" 200 "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/api/testimonials")"
check "GET /api/blog" 200 "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/api/blog")"
BLOG_SLUG=$(curl -s "$BASE_URL/api/blog?pageSize=1" | python3 -c "import json,sys; print(json.load(sys.stdin)['items'][0]['slug'])")
check "GET /api/blog/[slug]" 200 "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/api/blog/$BLOG_SLUG")"

# ───────────────────── Écritures publiques ─────────────────────

CONTACT_JSON=$(curl -s -X POST "$BASE_URL/api/contact" -H "Content-Type: application/json" \
  -d '{"name":"Smoke Test","email":"smoke@example.com","requestType":"sejour","travelers":2,"message":"Message de test smoke suffisamment long."}')
check "POST /api/contact" "Demande envoyée avec succès" "$(echo "$CONTACT_JSON" | python3 -c "import json,sys; print(json.load(sys.stdin)['message'])")"
CONTACT_ID=$(echo "$CONTACT_JSON" | python3 -c "import json,sys; print(json.load(sys.stdin)['id'])")

check "POST /api/contact invalide" 400 "$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE_URL/api/contact" -H "Content-Type: application/json" -d '{"name":"X","email":"pas-un-email","message":"court"}')"

CIRCUIT_ID=$(curl -s "$BASE_URL/api/circuits?pageSize=1" | python3 -c "import json,sys; print(json.load(sys.stdin)['items'][0]['id'])")
BOOKING_JSON=$(curl -s -X POST "$BASE_URL/api/bookings" -H "Content-Type: application/json" \
  -d "{\"circuitId\":\"$CIRCUIT_ID\",\"type\":\"circuit\",\"name\":\"Smoke Test\",\"email\":\"smoke@example.com\",\"participants\":2}")
BOOKING_ID=$(echo "$BOOKING_JSON" | python3 -c "import json,sys; print(json.load(sys.stdin)['id'])" 2>/dev/null || echo "")
if [ -n "$BOOKING_ID" ]; then
  check "POST /api/bookings" 1 1
  check_json "  référence WT-XXXXXX" "True" "$BOOKING_JSON" "bool(__import__('re').match(r'^WT-[A-Z0-9]{6}$', d['bookingReference']))"
else
  check "POST /api/bookings" 1 0
fi
check "POST /api/bookings circuit inconnu" 400 "$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE_URL/api/bookings" -H "Content-Type: application/json" -d '{"circuitId":"00000000-0000-0000-0000-000000000000","name":"X Test","email":"x@example.com"}')"

# ───────────────────── Endpoints dashboard ─────────────────────

for path in circuits destinations categories testimonials services blog blog-categories bookings contact-requests settings stats media users; do
  check "GET /api/dashboard/$path" 200 "$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/api/dashboard/$path")"
done

if [ -n "$BOOKING_ID" ]; then
  check "PATCH /api/dashboard/bookings/[id]/status" 200 "$(curl -s -o /dev/null -w '%{http_code}' -X PATCH "$BASE_URL/api/dashboard/bookings/$BOOKING_ID/status" -H "Content-Type: application/json" -d '{"status":"confirmed"}')"
fi
if [ -n "$CONTACT_ID" ]; then
  check "PATCH /api/dashboard/contact-requests/[id]/status" 200 "$(curl -s -o /dev/null -w '%{http_code}' -X PATCH "$BASE_URL/api/dashboard/contact-requests/$CONTACT_ID/status" -H "Content-Type: application/json" -d '{"status":"answered"}')"
fi

# ───────────────────── Bilan ─────────────────────

echo ""
if [ "$FAIL" -eq 0 ]; then
  printf "✅ %d vérifications OK, 0 échec\n" "$PASS"
  exit 0
else
  printf "❌ %d OK, %d échec(s)\n" "$PASS" "$FAIL" >&2
  exit 1
fi
