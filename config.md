---
MODEL: claude-haiku-4-5
PUBLIC_CHAT_ENABLED: true
PUBLIC_BUDGET_EUR_DAILY: 5.0
PUBLIC_RATE_LIMIT_MIN: 10/minute
PUBLIC_RATE_LIMIT_HOUR: 60/hour
PUBLIC_MESSAGE_MAX_CHARS: 2000
CONNECTORS: web
WHATSAPP_BACKEND: twilio
---

# Configuration

Lu au boot par `config.py` côté distant-agent. Fournit les **defaults** pour les variables d'environnement non-secrètes. Le `.env` (secrets) override ces valeurs au runtime.

| Var | Description |
|---|---|
| `MODEL` | Modèle Anthropic (`claude-haiku-4-5`, `claude-sonnet-4-6`, etc.) |
| `PUBLIC_CHAT_ENABLED` | `false` → `/` redirige vers `/admin`, `/api/public/*` désactivé |
| `PUBLIC_BUDGET_EUR_DAILY` | Cap journalier Anthropic (EUR), 503 quand atteint |
| `PUBLIC_RATE_LIMIT_MIN/HOUR` | Rate limits par IP (slowapi syntax) |
| `PUBLIC_MESSAGE_MAX_CHARS` | Cap longueur input |
| `CONNECTORS` | `web`, `web,whatsapp` |
| `WHATSAPP_BACKEND` | `twilio` ou `meta` (uniquement si `whatsapp` est dans CONNECTORS) |

## Quoi va dans `.env` vs `config.md` ?

- **`.env` (secrets, par instance, gitignored)** : `ANTHROPIC_API_KEY`, `ADMIN_PASSWORD`, `JWT_SECRET`, `TWILIO_*`, `META_APP_SECRET`, `OPENAI_API_KEY`, `MCP_API_KEY`, `TURNSTILE_SECRET_KEY`, `DATA_DIR`, `PERSONA_FILE`, `PUBLIC_PERSONA_FILE`
- **`config.md` (versionné dans ce repo)** : tout le reste — éditable par git push
