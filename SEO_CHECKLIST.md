# Checklist de Validation SEO Google, Bing & Go-Live

Ce document récapitule les étapes d'intégration aux moteurs de recherche et les outils à utiliser pour garantir une indexation maximale du site **https://juriste-droit-du-travail.com**.

---

## 🚀 1. Validation de l'Indexation & Outils pour les Webmasters

### 📂 Google Search Console
- [ ] **Propriété validée** : Déclarer la propriété sur la Google Search Console via l'enregistrement DNS TXT ou le fichier de validation HTML.
- [ ] **Sitemap soumis** : Envoyer l'URL du sitemap pour accélérer l'indexation :
  `https://juriste-droit-du-travail.com/sitemap.xml`
- [ ] **Inspection d'URL** : Tester l'URL d'accueil `/` et de la FAQ `/faq` pour forcer le premier passage de Googlebot.

### 🌐 Bing Webmaster Tools
- [ ] **Importation automatique** : Lier le compte Bing Webmaster Tools à la Google Search Console pour importer la configuration en un clic.
- [ ] **Sitemap validé** : S'assurer que le sitemap est bien lu par Bing.
- [ ] **IndexNow activé** : Configurer la soumission d'URL instantanée via l'API IndexNow (idéal pour informer Bing en temps réel de nouveaux articles).

---

## 🏢 2. SEO Local & Visibilité

### 📍 Google Business Profile (ex-Google My Business)
- [ ] **Fiche créée** : Créer ou revendiquer la fiche "Loubna Abouz Manta - Juriste Droit du Travail" à Audincourt.
- [ ] **Informations alignées** :
  - **Adresse** : 45 rue des Mines, 25400 Audincourt (identique au site web).
  - **Téléphone** : 06 59 11 11 08.
  - **Horaires** : Lun-Jeu : 10h-12h, 14h-18h · Ven : 10h-12h30.
- [ ] **Lien vers le site** : Pointer le bouton "Site web" de la fiche vers `https://juriste-droit-du-travail.com`.
- [ ] **Catégorie principale** : Sélectionner *Consultant juridique* ou *Services d'aide juridique*.

---

## 🔬 3. Tests de Validité Technique

### 📊 Rich Results Test (Test des résultats enrichis Google)
- [ ] **Test des breadcrumbs** : Tester une page interne (ex: `/services`) sur [Google Rich Results Test](https://search.google.com/test/rich-results) pour valider le schéma `BreadcrumbList`.
- [ ] **Test de la FAQ** : Tester la page `/faq` pour valider l'intégration du schéma `FAQPage`.
- [ ] **Test des articles** : Tester un article individuel (ex: `/blog/rupture-conventionnelle-procedure-indemnites-2026`) pour valider la détection du schéma `Article`.
- [ ] **Test de l'Organisation / LocalBusiness** : Valider le script de `RootLayout` (`src/app/layout.tsx`) contenant le type `ProfessionalService` et `Person`.

### ⚡ Performance & Core Web Vitals
- [ ] **Lighthouse** : Lancer un audit Google Lighthouse pour s'assurer que les scores SEO et d'Accessibilité restent supérieurs à **95%**.
- [ ] **PageSpeed Insights** : Vérifier que le temps de chargement mobile (LCP et FID) respecte les critères de Google.

---

## 🛠️ 4. Maintenance & Routine SEO

- [ ] **Publication de contenus** : Rédiger un nouvel article de blog toutes les 4 à 6 semaines sur les thématiques du droit du travail (RSE, DUERP, Risques psychosociaux).
- [ ] **Suivi des mots-clés** : Suivre l'évolution des positions sur les requêtes ciblées :
  - *juriste droit du travail*
  - *prévention risques professionnels*
  - *DUERP*
  - *accident du travail*
  - *maladie professionnelle*
  - *risques psychosociaux*
  - *droit du travail suisse*
- [ ] **Monitoring des erreurs d'indexation** : Surveiller mensuellement l'onglet "Pages" de la Google Search Console pour corriger les éventuelles erreurs d'exploration.
