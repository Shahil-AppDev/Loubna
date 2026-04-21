# MISSION 10 : RECOMMANDATIONS DE MISE EN LIGNE ET TABLEAU RÉCAPITULATIF

## 1. RECOMMANDATIONS DE MISE EN LIGNE IMMÉDIATE

Pour que l'ensemble du travail SEO soit effectif dès aujourd'hui, voici les actions techniques à réaliser sur le site Next.js :

1. **Intégration des balises Meta et H1** :
   - Mettre à jour le fichier `src/lib/constants.ts` (déjà fait pour le domaine).
   - Injecter les balises Title et Meta Description (définies dans la Mission 5) dans le composant `layout.tsx` ou via l'API Metadata de Next.js 14 pour chaque page.

2. **Création des pages Services manquantes** :
   - Créer les dossiers dynamiques (ex: `src/app/services/[slug]/page.tsx`).
   - Intégrer le contenu rédigé (Mission 2) en respectant la structure H1/H2/H3 et les FAQ.
   - Ajouter les CTA pointant vers `/contact`.

3. **Création du Blog** :
   - Créer le dossier `src/app/blog/page.tsx` (liste des articles) et `src/app/blog/[slug]/page.tsx` (article unique).
   - Intégrer les 5 premiers articles (Mission 4).
   - S'assurer que le rendu markdown/MDX est propre et lisible sur mobile.

4. **Intégration du JSON-LD** :
   - Insérer le script `ProfessionalService` (Mission 7) dans le `layout.tsx` global pour qu'il soit présent sur toutes les pages.
   - Insérer les scripts `Article` et `FAQPage` dynamiquement sur les pages concernées.

5. **Génération du Sitemap et `robots.txt`** :
   - Utiliser un package comme `next-sitemap` pour générer automatiquement le fichier XML regroupant toutes les nouvelles URLs.
   - Soumettre le sitemap à la **Google Search Console**.

6. **Déploiement et Google Business Profile** :
   - Pousser les modifications sur le serveur (Vercel).
   - Mettre à jour le lien du site Web sur la fiche GBP (Audincourt) vers `www.abouzmanta-loubna-conseiljuridique.com`.

---

## 2. TABLEAU RÉCAPITULATIF FINAL (PAGES CLÉS)

Ce tableau synthétise les éléments essentiels pour le déploiement des nouvelles pages (Services et Blog).

| Type | Page / Sujet | URL (Slug) | Mot-clé principal | Cible | CTA associé | Liens internes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Service** | Contrat de travail | `/services/redaction-contrat-travail` | conseil contrat de travail | B2B/B2C | Sécuriser l'embauche / Relire contrat | Sensibilisation RSE |
| **Service** | Sanctions | `/services/sanctions-disciplinaires` | contester sanction | B2C | Contester sanction / Sécuriser procédure | Article Sanction |
| **Service** | Recrutement | `/services/recrutement-salaries-etrangers` | aide recrutement étranger | B2B | Externaliser démarches | Article Recrutement |
| **Service** | Licenciement | `/services/conseil-licenciement` | accompagnement licenciement | B2B/B2C | Analyser lettre / Sécuriser procédure | Négociation |
| **Service** | Négociation | `/services/negociation-accord-transactionnel` | négocier départ amiable | B2B/B2C | Évaluer transaction amiable | Licenciement |
| **Service** | Rupture Conv. | `/services/rupture-conventionnelle` | conseil rupture conventionnelle | B2B/B2C | Calculer indemnité / Homologation | Article Rupture |
| **Service** | RSE / DUERP | `/services/sensibilisation-rse-prevention` | obligation prévention rse | B2B | Conformité juridique RSE | Article Obligations |
| **Blog** | Article Rupture | `/blog/rupture-conventionnelle-procedure-indemnites-2024` | procédure rupture conventionnelle | Mixte | Calculer mon indemnité | Service Rupture / Négociation |
| **Blog** | Article Sanction | `/blog/comment-contester-sanction-disciplinaire-avertissement` | contester sanction disciplinaire | Salarié | Contester une sanction | Service Sanctions |
| **Blog** | Article Étranger | `/blog/recrutement-salarie-etranger-demarches-employeur` | embaucher salarié étranger | B2B | Externaliser mes démarches | Service Recrutement |
| **Blog** | Article CDI | `/blog/rediger-contrat-travail-cdi-clauses-obligatoires` | rédaction contrat travail CDI | B2B | Sécuriser mes contrats | Service Contrat |
| **Blog** | Article RSE | `/blog/obligations-employeur-rse-prevention-risques-duerp` | obligations employeur rse | B2B | Audit de conformité RSE | Service RSE |
