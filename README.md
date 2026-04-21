# Loubna Abouz Manta — Site Juridique Premium

Site web professionnel haut de gamme pour **Loubna Abouz Manta**, juriste spécialisée en droit du travail.

**Stack :** Next.js 14 · TypeScript · Tailwind CSS  
**Design :** Rouge profond · Or · Noir — Style cabinet juridique premium  
**Fonts :** Playfair Display (serif élégant) · DM Sans (corps lisible)

---

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env.local
# → Editez .env.local avec vos vraies valeurs

# 3. Lancer en développement
npm run dev
# → http://localhost:3000

# 4. Build de production
npm run build
npm run start
```

---

## ⚙️ Configuration — Personnalisation du contenu

Ouvrez `src/lib/constants.ts` et mettez à jour toutes les valeurs :

| Champ | Description | Exemple |
|---|---|---|
| `SITE_CONFIG.url` | URL du site en production | `https://votre-domaine.fr` |
| `SITE_CONFIG.email` | Email de contact | `contact@votre-email.fr` |
| `SITE_CONFIG.phone` | Numéro de téléphone | `+33 6 00 00 00 00` |
| `SITE_CONFIG.address` | Ville / adresse | `Paris, France` |
| `SITE_CONFIG.hours` | Horaires d'ouverture | `Lun–Ven : 9h–18h` |
| `SITE_CONFIG.linkedin` | URL LinkedIn | `https://linkedin.com/in/...` |
| `TESTIMONIALS` | Témoignages clients | Remplacez les exemples |

---

## 📬 Formulaire de contact — Connexion backend

Le formulaire (`src/components/forms/ContactForm.tsx`) est prêt à connecter.  
Remplacez le bloc `// Simulation` par votre service d'envoi :

### Option 1 — Formspree (le plus rapide, sans backend)

```bash
# Pas d'installation nécessaire
# Créez un compte sur https://formspree.io
```

```tsx
// Dans ContactForm.tsx, remplacez la simulation par :
const res = await fetch("https://formspree.io/f/VOTRE_ID_FORMSPREE", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
if (!res.ok) throw new Error("Erreur Formspree");
```

### Option 2 — EmailJS (sans serveur)

```bash
npm install @emailjs/browser
```

```tsx
import emailjs from "@emailjs/browser";

await emailjs.send(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  {
    from_name: `${form.prenom} ${form.nom}`,
    from_email: form.email,
    subject: form.sujet,
    message: form.message,
  },
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
);
```

### Option 3 — API Route Next.js + Resend (recommandé en production)

```bash
npm install resend
```

Décommentez le code dans `src/app/api/contact/route.ts` et ajoutez dans `ContactForm.tsx` :

```tsx
const res = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
if (!res.ok) throw new Error();
```

---

## 🗂️ Structure du projet

```
src/
├── app/                                    # App Router Next.js 14
│   ├── layout.tsx                          # Layout global + SEO + fonts
│   ├── globals.css                         # Styles globaux Tailwind
│   ├── page.tsx                            # Page Accueil
│   ├── a-propos/
│   │   └── page.tsx                        # Page À propos
│   ├── services/
│   │   └── page.tsx                        # Page Services (10 cartes)
│   ├── contact/
│   │   └── page.tsx                        # Page Contact
│   ├── faq/
│   │   └── page.tsx                        # Page FAQ (accordéon + Schema.org)
│   ├── mentions-legales/
│   │   └── page.tsx                        # Mentions légales
│   ├── politique-de-confidentialite/
│   │   └── page.tsx                        # Politique RGPD
│   └── api/
│       └── contact/
│           └── route.ts                    # API Route (optionnel, avec Resend)
├── components/
│   ├── layout/
│   │   ├── Header.tsx                      # Navigation responsive + scroll
│   │   └── Footer.tsx                      # Footer 4 colonnes
│   ├── ui/
│   │   └── FaqAccordion.tsx                # Accordéon FAQ animé (client)
│   └── forms/
│       └── ContactForm.tsx                 # Formulaire complet + validation
└── lib/
    ├── constants.ts                        # ← MODIFIER ICI (config, services, FAQ, témoignages)
    └── utils.ts                            # Helper cn()
```

---

## 🎨 Direction artistique

| Élément | Choix |
|---|---|
| Couleur principale | Rouge `#8B1A1A` (rouge profond juridique) |
| Couleur accent | Or `#C9A84C` (prestige) |
| Fond | Encre `#0A0A0A` (dark sections) · `#F8F7F5` (light sections) |
| Font titres | Playfair Display — élégance sérielle premium |
| Font corps | DM Sans — lisibilité parfaite |
| Style | Cabinet juridique parisien moderne |

---

## 🚀 Déploiement

### Vercel (recommandé — gratuit)

```bash
npm i -g vercel
vercel

# Pour les déploiements automatiques via GitHub :
# → Allez sur vercel.com
# → "Import Project" → Sélectionnez le repo Shahil-AppDev/Loubna
# → Chaque push sur main déclenche un déploiement automatique
```

### Netlify

```bash
npm run build
# Uploader le dossier .next/ sur netlify.com
# Ou connecter le repo GitHub pour CI/CD automatique
```

### GitHub Pages (export statique)

Ajoutez dans `next.config.mjs` :
```js
const nextConfig = {
  output: "export",
  // ...
};
```

Puis créez `.github/workflows/deploy.yml` avec Next.js static export.

---

## 📋 Checklist avant mise en ligne

- [ ] Remplir `src/lib/constants.ts` avec les vraies coordonnées
- [ ] Ajouter `public/logo.png` (logo de Loubna)
- [ ] Ajouter `public/og-image.png` (image Open Graph 1200×630px)
- [ ] Ajouter `public/favicon.ico`
- [ ] Connecter le formulaire (Formspree / EmailJS / Resend)
- [ ] Remplacer les témoignages placeholder par de vrais avis
- [ ] Vérifier les mentions légales (SIRET, adresse complète)
- [ ] Tester sur mobile (iOS + Android)
- [ ] Tester le formulaire end-to-end
- [ ] Configurer le domaine sur Vercel/Netlify
- [ ] Activer HTTPS (automatique sur Vercel)
- [ ] Soumettre le sitemap à Google Search Console

---

## 🔧 Scripts disponibles

```bash
npm run dev       # Développement avec hot reload → localhost:3000
npm run build     # Build de production (vérifie les erreurs TypeScript)
npm run start     # Serveur de production (après build)
npm run lint      # Vérification ESLint
```

---

## 📱 Responsive

Le site est entièrement responsive :
- **Mobile** : menu hamburger, colonnes empilées, CTA adaptés
- **Tablet** : grilles 2 colonnes
- **Desktop** : layout complet 4 colonnes

Testé sur iPhone, Android, iPad et les navigateurs principaux.

---

## SEO

Chaque page dispose de :
- `<title>` unique et optimisé
- `<meta description>` par page
- Balises Open Graph (og:title, og:description, og:image)
- Structure sémantique H1 → H2 → H3 cohérente
- Schema.org FAQPage sur la page FAQ
- Robots.txt configuré
- Images avec attributs `alt` descriptifs

---

*Site développé avec Next.js 14, TypeScript et Tailwind CSS.*  
*Design premium · Mobile-first · SEO-ready · RGPD-compliant*
