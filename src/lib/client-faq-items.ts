/** FAQ — texte strictement issu du document client « SITE INTERNET.docx » (onglet FAQ). */

export const FAQ_NOTE_IMPORTANTE =
  "Les informations fournies sur ce site ont une vocation informative et ne constituent pas une consultation juridique au sens de la réglementation applicable à la profession d'avocat.";

export const FAQ_HERO_SOUS_TITRE =
  "Retrouvez ici les réponses aux questions les plus courantes en droit du travail et en prévention des risques professionnels.Votre situation est différente ? N'hésitez pas à me contacter.";

export const FAQ_CTA_TEXTE =
  "Si vous ne trouvez pas l'information recherchée, vous pouvez me contacter pour une réponse adaptée à votre situation, sous 48 heures.";

export const FAQ_ITEMS = [
  {
    question: "Qu'est-ce qu'un accident du travail et comment réagir ?",
    answer: `Un accident du travail est un événement soudain survenu dans le cadre de votre activité professionnelle, ayant entraîné une lésion physique ou psychologique.

En cas d'accident, il est important de :

informer votre employeur rapidement

consulter un médecin

faire établir un certificat médical initial

vérifier que la déclaration est bien effectuée

Une bonne gestion dès le départ est essentielle pour la reconnaissance de l'accident et la prise en charge par la CPAM.`,
    category: "salarie" as const,
  },
  {
    question: "Quelle est la différence entre une maladie professionnelle et une maladie ordinaire ?",
    answer: `Une maladie professionnelle est reconnue comme étant liée à votre activité professionnelle.Elle ouvre droit à une prise en charge spécifique (indemnisation, protection renforcée).

Une maladie ordinaire, en revanche, n'est pas directement liée au travail.

La reconnaissance d'une maladie professionnelle repose sur des critères précis (tableaux ou procédure spécifique), d'où l'importance de bien constituer son dossier.`,
    category: "salarie" as const,
  },
  {
    question: "Comment identifier une situation de harcèlement moral ?",
    answer: `Le harcèlement moral se caractérise par des agissements répétés qui dégradent vos conditions de travail et peuvent porter atteinte à vos droits, votre dignité ou votre santé.

Il peut s'agir par exemple :

de remarques répétées ou dévalorisantes

d'une mise à l'écart

d'une surcharge ou d'un retrait injustifié de travail

L'analyse de la situation dans son ensemble est essentielle pour qualifier les faits et identifier les actions possibles.`,
    category: "salarie" as const,
  },
  {
    question: "Mon employeur peut-il me licencier sans motif valable ?",
    answer: `Non, un licenciement doit être fondé sur une cause réelle et sérieuse.

Cela signifie que :

le motif doit être réel (existant et vérifiable)

et sérieux (suffisamment important pour justifier la rupture)

En cas de doute, il est important de faire analyser votre situation pour comprendre les enjeux et les options possibles.`,
    category: "salarie" as const,
  },
  {
    question: "Qu'est-ce qu'une rupture conventionnelle ?",
    answer: `La rupture conventionnelle est un accord entre le salarié et l'employeur pour mettre fin au contrat de travail.

Elle nécessite :

un accord des deux parties

une procédure encadrée

une validation par l'administration

Elle ouvre droit, sous conditions, aux allocations chômage.Il est important de bien comprendre les implications avant de s'engager.`,
    category: "salarie" as const,
  },
  {
    question: "J'ai reçu une convocation à un entretien préalable : que faire ?",
    answer: `La convocation à un entretien préalable est une étape importante dans une procédure disciplinaire ou de licenciement.

Il est recommandé de :

Lire attentivement la convocation

Comprendre les faits reprochés

Préparer vos explications

vous faire assister si nécessaire

Une bonne préparation permet de mieux défendre votre position et d'éviter certaines erreurs.`,
    category: "salarie" as const,
  },
  {
    question: "Qu'est-ce que le DUERP et quelles entreprises sont concernées ?",
    answer: `Le Document Unique d'Évaluation des Risques Professionnels (DUERP) recense les risques auxquels sont exposés les salariés et les mesures de prévention mises en place.

Il est obligatoire pour toutes les entreprises dès l'embauche du premier salarié.

Le DUERP doit être :

mis à jour régulièrement

adapté aux situations de travail

utilisé comme un véritable outil de prévention`,
    category: "employeur" as const,
  },
  {
    question: "Qu'implique la prévention des risques professionnels ?",
    answer: `La prévention des risques consiste à identifier, évaluer et limiter les risques auxquels les salariés sont exposés.

Elle concerne notamment :

les risques psychosociaux (RPS)

les troubles musculosquelettiques (TMS)

les accidents du travail

Une démarche structurée permet de sécuriser les pratiques et de limiter les risques juridiques et humains.`,
    category: "employeur" as const,
  },
  {
    question: "Comment sécuriser une procédure de licenciement ?",
    answer: `Une procédure de licenciement doit respecter des étapes précises :

qualification du motif

respect de la procédure

respect des délais

rédaction des documents

Une erreur, même formelle, peut fragiliser la décision. Il est donc essentiel d'anticiper et de structurer chaque étape.`,
    category: "employeur" as const,
  },
  {
    question: "Quelle est la différence entre un juriste et un avocat ?",
    answer: `Le juriste et l'avocat interviennent tous deux en droit du travail, notamment pour analyser les situations et accompagner les personnes concernées.

La différence tient principalement au cadre d'intervention :

Le juriste intervient en amont, dans une logique de compréhension, de structuration et de sécurisation des démarches.

L'avocat est habilité à représenter et défendre les intérêts d'une personne dans le cadre d'une procédure contentieuse (tribunal).

Les deux approches sont complémentaires.Lorsque la situation nécessite une action en justice, une orientation vers un avocat est proposée.`,
    category: "general" as const,
  },
  {
    question: "Mes informations sont-elles confidentielles ?",
    answer: `Oui, les échanges et les informations que vous partagez sont traités avec confidentialité.

Le respect de la discrétion est essentiel dans l'accompagnement des situations professionnelles.`,
    category: "general" as const,
  },
  {
    question: "Intervenez-vous uniquement à distance ?",
    answer: `J'interviens principalement à distance (visioconférence), un format souple, efficace et adapté aux contraintes actuelles, permettant des échanges rapides et confidentiels.

Ce mode d'accompagnement offre également une grande flexibilité et permet de limiter les déplacements, dans une démarche plus responsable.

Des modalités spécifiques peuvent être envisagées en fonction des besoins.`,
    category: "general" as const,
  },
];
