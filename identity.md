---
name: [Nom affiché de l'agent]
greeting: [Phrase d'accueil quand l'utilisateur ouvre la page web — ex: "Bonjour. Que voulez-vous explorer aujourd'hui ?"]
has_avatar: false
---

## Comment ça s'affiche

Ce fichier est lu par le code (`connectors/web.py:_load_identity()` côté repo Nicolas, ou `services/branding.py:load_identity()` côté distant-agent d'Alexis) pour générer la page web `/`.

- `name` apparaît dans le header et le `<title>`.
- `greeting` est le premier message affiché (avant que l'utilisateur ait écrit quoi que ce soit).
- `has_avatar: true` → le code cherchera un fichier `avatar.png` (à la racine ou dans `branding/`) et l'affichera. Sinon, pas d'avatar.

## Optionnel — branding plus poussé (distant-agent uniquement)

Si tu déploies via le code `distant-agent` d'Alexis, tu peux ajouter un dossier `branding/` à la racine avec :

```
branding/
├── identity.md          # YAML plus complet (brand_link, brand_email, favicon_url, og_image_url, legal_name, placeholder, ...)
├── custom.css           # CSS overrides
├── custom-header.html   # fragment HTML zone .brand
├── custom-footer.html   # fragment HTML footer
├── avatar.png
└── favicon.svg
```

Si tu déploies via `WhatsApp_AgentSDK` (repo Nicolas), seul ce `identity.md` à la racine est lu.
