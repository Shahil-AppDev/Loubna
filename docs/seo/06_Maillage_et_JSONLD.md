# MISSION 6 : PLAN DE MAILLAGE INTERNE

L'architecture du maillage interne est conçue en "Silos Sémantiques" (ou "Hub & Spoke"). L'objectif est de ne pas "diluer" la pertinence SEO : un article sur le licenciement ne doit pas lier vers une page sur le recrutement d'étrangers, mais uniquement vers des pages liées à la rupture du contrat de travail.

## Silo 1 : Rupture du contrat de travail
- **Page Pilier (Service)** : `/services/conseil-licenciement`
- **Page Pilier (Service)** : `/services/rupture-conventionnelle`
- **Articles "Spoke" associés** :
  - *Rupture conventionnelle 2024 : procédure et calcul* -> Lien vers `/services/rupture-conventionnelle` (Ancre : "procédure de rupture conventionnelle")
  - *Négocier son départ : 5 arguments* -> Lien vers `/services/negociation-accord-transactionnel` (Ancre : "accord transactionnel")
  - *Licenciement pour inaptitude* -> Lien vers `/services/conseil-licenciement` (Ancre : "analyser ma lettre de licenciement")
  - *Gérer un abandon de poste* -> Lien vers `/services/conseil-licenciement` (Ancre : "procédure de licenciement")

## Silo 2 : Exécution du contrat et RH
- **Page Pilier (Service)** : `/services/redaction-contrat-travail`
- **Page Pilier (Service)** : `/services/recrutement-salaries-etrangers`
- **Articles "Spoke" associés** :
  - *Rédiger un contrat de travail CDI* -> Lien vers `/services/redaction-contrat-travail` (Ancre : "audit de vos contrats de travail")
  - *Embaucher un salarié étranger* -> Lien vers `/services/recrutement-salaries-etrangers` (Ancre : "démarches d'autorisation de travail")
  - *Rupture de la période d'essai* -> Lien vers `/services/redaction-contrat-travail` (Ancre : "sécuriser vos embauches")

## Silo 3 : Discipline et Sanctions
- **Page Pilier (Service)** : `/services/sanctions-disciplinaires`
- **Articles "Spoke" associés** :
  - *Contester une sanction disciplinaire* -> Lien vers `/services/sanctions-disciplinaires` (Ancre : "contester une sanction")
  - *La mise à pied conservatoire* -> Lien vers `/services/sanctions-disciplinaires` (Ancre : "procédure disciplinaire")
  - *Harcèlement moral au travail* -> Lien vers `/services/sanctions-disciplinaires` (Ancre : "vous défendre")

## Silo 4 : Prévention et RSE
- **Page Pilier (Service)** : `/services/sensibilisation-rse-prevention`
- **Articles "Spoke" associés** :
  - *RSE et droit du travail : les obligations* -> Lien vers `/services/sensibilisation-rse-prevention` (Ancre : "politique de prévention des risques")
  - *Le Document Unique (DUERP)* -> Lien vers `/services/sensibilisation-rse-prevention` (Ancre : "rédaction du DUERP")
  - *Prévention des RPS* -> Lien vers `/services/sensibilisation-rse-prevention` (Ancre : "formation de prévention")
  - *Égalité professionnelle femmes-hommes* -> Lien vers `/services/sensibilisation-rse-prevention` (Ancre : "audit RSE")
  - *Droit à la déconnexion* -> Lien vers `/services/sensibilisation-rse-prevention` (Ancre : "charte de télétravail")

---

# MISSION 7 : DONNÉES STRUCTURÉES JSON-LD

Voici les scripts JSON-LD à intégrer dans la balise `<head>` des pages concernées. Ils respectent les standards Google pour remonter dans le Knowledge Graph et les Rich Snippets.

## 1. ProfessionalService (À intégrer sur l'Accueil, Contact, À propos)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Loubna Abouz Manta - Juriste Conseil",
  "image": "https://www.abouzmanta-loubna-conseiljuridique.com/logo.png",
  "@id": "https://www.abouzmanta-loubna-conseiljuridique.com",
  "url": "https://www.abouzmanta-loubna-conseiljuridique.com",
  "telephone": "+33659111108",
  "email": "louamjuristeconseil@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "45 rue des Mines",
    "addressLocality": "Audincourt",
    "postalCode": "25400",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.4833,
    "longitude": 6.8333
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "10:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Friday",
      "opens": "10:00",
      "closes": "12:30"
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/in/loubna-abouz-manta-27a5032b7/",
    "https://www.instagram.com/louaamm/",
    "https://www.tiktok.com/@loubna.am25"
  ],
  "priceRange": "€€",
  "description": "Juriste experte en droit du travail et responsabilité sociale des entreprises (RSE). Conseil et accompagnement pour employeurs et salariés."
}
```

## 2. FAQPage (Exemple pour la page Service "Rupture Conventionnelle")

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Le salarié a-t-il droit au chômage après une rupture conventionnelle ?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Oui, la signature d'une rupture conventionnelle homologuée ouvre droit aux allocations chômage (ARE), sous réserve de remplir les conditions habituelles d'affiliation fixées par France Travail."
    }
  }, {
    "@type": "Question",
    "name": "Quelle est la durée totale d'une procédure de rupture conventionnelle ?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Il faut compter au minimum 4 à 5 semaines entre le premier entretien et la fin effective du contrat. Ce délai inclut les 15 jours calendaires de rétractation et les 15 jours ouvrables d'homologation par la DREETS."
    }
  }]
}
```

## 3. Article (Exemple pour le blog "Embaucher un salarié étranger")

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Embaucher un salarié étranger en France : démarches et obligations 2024",
  "image": [
    "https://www.abouzmanta-loubna-conseiljuridique.com/images/blog/recrutement-etranger.jpg"
  ],
  "datePublished": "2024-04-20T08:00:00+02:00",
  "dateModified": "2024-04-20T08:00:00+02:00",
  "author": [{
      "@type": "Person",
      "name": "Loubna Abouz Manta",
      "url": "https://www.abouzmanta-loubna-conseiljuridique.com/a-propos"
  }],
  "publisher": {
    "@type": "Organization",
    "name": "Cabinet Loubna Abouz Manta",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.abouzmanta-loubna-conseiljuridique.com/logo.png"
    }
  },
  "description": "Employeurs, découvrez les démarches, autorisations de travail et obligations légales pour recruter un salarié étranger en toute conformité."
}
```
