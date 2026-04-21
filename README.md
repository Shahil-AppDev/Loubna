# Loubna Abouz Manta — Site Juridique Premium

Site web professionnel pour Loubna Abouz Manta, juriste spécialisée en droit du travail.

**Stack :** Next.js 14 · TypeScript · Tailwind CSS  
**Design :** Rouge profond, Or, Noir — style cabinet juridique haut de gamme

---

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer en développement
npm run dev
# → http://localhost:3000

# 3. Build de production
npm run build
npm run start
```

---

## Configuration — Placeholders à modifier

Ouvrez `src/lib/constants.ts` et mettez à jour :

| Champ | Description |
|-------|-------------|
| `SITE_CONFIG.url` | URL du site en production |
| `SITE_CONFIG.email` | Adresse email de contact |
| `SITE_CONFIG.phone` | Numéro de téléphone |
| `SITE_CONFIG.address` | Adresse / ville |
| `SITE_CONFIG.hours` | Horaires d'ouverture |
| `SITE_CONFIG.linkedin` | URL LinkedIn |

### Formulaire de contact

Le formulaire (`src/components/forms/ContactForm.tsx`) est prêt à connecter.
Remplacez le bloc `await new Promise(...)` par votre service d'envoi :

**Option 1 — Formspree :**
```ts
const res = await fetch("https://formspree.io/f/VOTRE_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
if (!res.ok) throw new Error();
```

**Option 2 — EmailJS :**
```ts
import emailjs from "@emailjs/browser";
await emailjs.send("SERVICE_ID", "TEMPLATE_ID", formData, "PUBLIC_KEY");
```

**Option 3 — API Route Next.js + Resend :**
Créez `src/app/api/contact/route.ts` et utilisez `resend.emails.send(...)`.

---

## Structure du projet

```
src/
├── app/                          # Pages (App Router)
│   ├── layout.tsx                # Layout global + métadonnées SEO
│   ├── page.tsx                  # Accueil
│   ├── a-propos/page.tsx
│   ├── services/page.tsx
│   ├── contact/page.tsx
│   ├── faq/page.tsx
│   ├── mentions-legales/page.tsx
│   └── politique-de-confidentialite/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Navigation responsive avec scroll
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── SectionLabel.tsx      # Étiquette de section dorée
│   │   ├── StarRating.tsx        # Note étoiles
│   │   └── FaqAccordion.tsx      # Accordéon FAQ animé
│   └── forms/
│       └── ContactForm.tsx       # Formulaire complet avec validation
└── lib/
    ├── constants.ts              # Config, services, FAQ, témoignages
    └── utils.ts                  # Helper cn()
```

---

## Déploiement

### Vercel (recommandé)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Uploader le dossier .next/
```

### GitHub Pages (via GitHub Actions)
Ajoutez un fichier `.github/workflows/deploy.yml` avec Next.js static export.

---

## Personnalisation du contenu

- **Témoignages :** `src/lib/constants.ts` → `TESTIMONIALS`
- **Services :** `src/lib/constants.ts` → `SERVICES`
- **FAQ :** `src/lib/constants.ts` → `FAQ_ITEMS`
- **Logo :** Remplacer `public/logo.png`
- **OG Image :** Ajouter `public/og-image.png` (1200×630px)
- **Favicon :** Ajouter `public/favicon.ico`

---

## SEO

Chaque page dispose de ses propres métadonnées (`title`, `description`, `openGraph`).
La structure HTML utilise des balises sémantiques `h1/h2/h3` cohérentes.

Pour améliorer le référencement local, ajoutez vos vraies coordonnées dans `constants.ts`.

---

*Site développé avec Next.js 14, TypeScript et Tailwind CSS.*
