---
name: [Nom affiché de l'agent]
favicon_url: ""
og_image_url: ""
placeholder: "Votre message…"
noindex: true
---

# Identity

Lu par `services/branding.py:load_identity()` côté distant-agent. Pilote la page web `/` (chat public).

Champs :
- `name` : titre de l'onglet et fallback header (utilisé seulement si `header.html` absent)
- `favicon_url` : URL absolue (ex `https://tonsite.com/favicon.svg`). Sinon, fallback sur `/api/branding/favicon` si tu mets un fichier `favicon.svg` à côté.
- `og_image_url` : pour le partage social
- `placeholder` : texte du `<textarea>` du chat
- `noindex` : `true` pour bloquer les moteurs de recherche

Remplace les `[...]` par ton contenu et supprime cette section.
