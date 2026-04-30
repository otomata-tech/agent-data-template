# agent-data-template

Template `DATA_DIR` pour une instance d'agent conversationnel basée sur [`distant-agent`](https://github.com/otomata-tech/distant-agent).

Le code applicatif (FastAPI + Claude Agent SDK) est **séparé** des données (persona, knowledge, branding, config). Ce repo ne contient que les **données** d'une instance — fork/use-template pour créer une nouvelle instance.

## Démarrer une nouvelle instance

1. **"Use this template"** → créer ton repo `<projet>-data` (privé recommandé : contient persona = IP).
2. Remplir les fichiers ci-dessous selon ton agent.
3. Demander à l'admin du serveur (ou self-deploy) de cloner ton repo dans `/mnt/data/<projet>-agent-data` et brancher dessus une instance du code.
4. Update : `git push` sur ce repo, puis `git pull && systemctl restart <projet>-agent` côté serveur.

## Structure

```
.
├── README.md
├── persona.md              # System prompt admin (/admin)
├── persona-public.md       # System prompt chat public (/) — peut être identique à persona.md
├── style.md                # Style de communication
├── config.md               # Config non-secrète (MODEL, PUBLIC_CHAT_ENABLED, rate limits, …)
├── branding/
│   ├── identity.md         # YAML : name, favicon_url, og_image_url, placeholder, noindex
│   ├── header.html         # Fragment HTML zone <header>
│   ├── footer.html         # Fragment HTML zone <footer>
│   ├── init.js             # JS chargé après chat.js (greeting, comportements custom)
│   ├── styles.css          # CSS overrides (optionnel)
│   ├── avatar.png          # Avatar agent (optionnel)
│   └── favicon.svg         # Favicon (optionnel)
├── knowledge/              # Base de connaissances (lue par l'agent via outil Read)
│   └── *.md
└── system/                 # Prompts sous-agents (guardian, fiche)
    ├── guardrails.md
    └── update-fiche.md
```

## Fichiers à remplir

| Fichier | Rôle | Obligatoire |
|---|---|---|
| `persona.md` | Qui est l'agent, comment il pense, ses limites | ✅ |
| `persona-public.md` | Persona pour le chat public anonyme. Peut être identique à `persona.md` | ✅ si `PUBLIC_CHAT_ENABLED=true` |
| `branding/identity.md` | Métadonnées web (name, favicon, og, placeholder) | ✅ |
| `branding/header.html` | Logo / nom dans le header de la page web | recommandé |
| `branding/footer.html` | Mention légale dans le footer | recommandé |
| `branding/init.js` | Greeting d'accueil (premier message affiché) | recommandé |
| `style.md` | Style de communication | recommandé |
| `config.md` | Config (MODEL, rate limits, etc.) | recommandé (sinon defaults code) |
| `knowledge/*.md` | Base de connaissances | recommandé |
| `system/*.md` | Prompts sous-agents (guardian, fiche) | déjà fournis, ajuster si besoin |

## Quoi NE PAS mettre ici

- **Secrets** (`.env`) : `ANTHROPIC_API_KEY`, `ADMIN_PASSWORD`, `JWT_SECRET`, `TWILIO_*`, etc. → vivent dans `/opt/<projet>-agent/.env` côté serveur, pas dans ce repo.
- **Runtime data** : `users/`, `contacts.json`, `budget.json`, `*.jsonl` → généré par l'agent au fil de l'eau, gitignored.

## Comment ça marche en runtime

- L'**agent principal** (Claude SDK) reçoit `persona.md` + `style.md` + la liste des `knowledge/*.md` dans son system prompt. Quand un sujet matche un fichier, il le lit via l'outil `Read`.
- Les **sous-agents** (Haiku, max 1 turn, sans outils) utilisent `system/*.md` comme prompts.
- L'**UI web** (`/`) affiche le branding défini dans `branding/`.
- Le **chat.js générique** expose `window.appendMessage(role, text)` que `branding/init.js` peut appeler pour le greeting.
- `config.md` (YAML frontmatter) fournit les **defaults** pour les env vars non-secrètes (MODEL, PUBLIC_CHAT_ENABLED, …). Le `.env` côté serveur override en cas de besoin.

## Format `knowledge/*.md`

Un fichier markdown par concept/méthode/outil. Voir [`knowledge/_example.md`](knowledge/_example.md) pour le format suggéré. L'agent lit avec l'outil `Read`, donc tout `*.md` clair, structuré, avec des exemples concrets fonctionne.
