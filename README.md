# agent-data-template

Template `DATA_DIR` pour un agent conversationnel basé sur [`distant-agent`](https://github.com/AlexisLaporte/distant-agent) ou son fork [`WhatsApp_AgentSDK`](https://github.com/NicolasDoum/WhatsApp_AgentSDK).

Le code applicatif (FastAPI + Claude Agent SDK) est **séparé** des données (persona, knowledge, identity). Ce repo ne contient que les **données** d'une instance — fork/use-template pour créer une nouvelle instance (un nouveau persona).

## Démarrer une nouvelle instance

1. **"Use this template"** (ou fork) → créer ton repo `<ton-projet>-data`.
2. Remplir les fichiers ci-dessous selon ton persona.
3. Demander à l'admin du serveur (ou self-deploy) de cloner ton repo dans `/mnt/data/<ton-projet>-data` et brancher dessus une instance du code.
4. Pour mettre à jour : `git push` sur ce repo, puis `git pull && systemctl restart <ton-projet>-agent` côté serveur.

## Fichiers à remplir

| Fichier | Rôle | Obligatoire |
|---|---|---|
| `persona.md` | System prompt — qui est l'agent, comment il pense, ses limites | ✅ |
| `identity.md` | Branding pour la web UI (name, greeting, has_avatar) — YAML frontmatter | ✅ |
| `style.md` | Style de communication (longueur, ton, interdits) | recommandé |
| `knowledge/*.md` | Base de connaissances — l'agent les lit via l'outil `Read` | recommandé |
| `system/guardrails.md` | Sous-agent guardian (vérifie scope/style des réponses) | déjà fourni, ajuster si besoin |
| `system/update-fiche.md` | Sous-agent fiche (met à jour le profil contact après chaque échange) | déjà fourni, ajuster si besoin |

## Comment ça marche en runtime

- L'**agent principal** (Claude SDK) reçoit le `persona.md` + `style.md` + la liste des `knowledge/*.md` dans son system prompt. Quand un sujet matche un fichier, il le lit via l'outil `Read`.
- Les **sous-agents** (Haiku, max 1 turn, sans outils) utilisent `system/*.md` comme prompts.
- L'**UI web** (`/`) affiche le branding défini dans `identity.md`.
- Les **conversations user** sont stockées dans `users/{user_id}/` (gitignored — runtime).

## Structure conseillée pour `knowledge/`

Un fichier markdown par concept/méthode/outil. Garde-le bien titré, structuré, avec des exemples concrets si possible. L'agent peut combiner plusieurs fichiers dans une même réponse.

Exemple :
```
knowledge/
├── elan-vital.md         # méthode Élan Vital — questions, exercices, exemples
├── ikigai.md             # framework Ikigai
├── methode-X.md
└── ...
```

Voir [`knowledge/_example.md`](knowledge/_example.md) pour le format suggéré.
