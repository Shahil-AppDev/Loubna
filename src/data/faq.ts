/**
 * FAQ centralisée - Source: document client SITE INTERNET.docx
 */

export const FAQ_CONTENT = {
  hero: {
    title: "Questions fréquentes",
    subtitle: "Retrouvez ici les réponses aux questions les plus courantes en droit du travail et en prévention des risques professionnels. Votre situation est différente ? N'hésitez pas à me contacter.",
  },
  cta: {
    text: "Si vous ne trouvez pas l'information recherchée, vous pouvez me contacter pour une réponse adaptée à votre situation, sous 48 heures.",
  },
} as const;

export const FAQ_ITEMS = [
  {
    question: "Qu'est-ce qu'un accident du travail et comment réagir ?",
    answer: `Un accident du travail est un événement soudain survenu dans le cadre de votre activité professionnelle, ayant entraîné une lésion physique ou psychologique.

En cas d'accident, il est important de :

• informer votre employeur rapidement
• consulter un médecin
• faire établir un certificat médical initial
• vérifier que la déclaration est bien effectuée

Une bonne gestion dès le départ est essentielle pour la reconnaissance de l'accident et la prise en charge par la CPAM.`,
    category: "salarie" as const,
  },
  {
    question: "Quelle est la différence entre une maladie professionnelle et une maladie ordinaire ?",
    answer: `Une maladie professionnelle est reconnue comme étant liée à votre activité professionnelle. Elle ouvre droit à une prise en charge spécifique (indemnisation, protection renforcée).

Une maladie ordinaire, en revanche, n'est pas directement liée au travail.

La reconnaissance d'une maladie professionnelle repose sur des critères précis (tableaux ou procédure spécifique), d'où l'importance de bien constituer son dossier.`,
    category: "salarie" as const,
  },
  {
    question: "Comment identifier une situation de harcèlement moral ?",
    answer: `Le harcèlement moral se caractérise par des agissements répétés qui dégradent vos conditions de travail et peuvent porter atteinte à vos droits, votre dignité ou votre santé.

Il peut s'agir par exemple :

• de remarques répétées ou dévalorisantes
• d'une mise à l'écart
• d'une surcharge ou d'un retrait injustifié de travail
• de critiques systématiques
• d'une surveillance excessive

L'identification de ces situations nécessite une analyse des faits dans leur ensemble et dans la durée.`,
    category: "salarie" as const,
  },
  {
    question: "Qu'est-ce que le DUERP et pourquoi est-il obligatoire ?",
    answer: `Le Document Unique d'Évaluation des Risques Professionnels (DUERP) est un document obligatoire dès le premier salarié.

Il permet de :

• identifier les risques présents dans l'entreprise
• évaluer ces risques
• mettre en place des actions de prévention adaptées

Le DUERP doit être mis à jour au moins une fois par an et à chaque modification importante des conditions de travail.

C'est un outil de prévention essentiel qui permet d'anticiper les difficultés et de sécuriser les pratiques de l'employeur.`,
    category: "employeur" as const,
  },
  {
    question: "Quelles sont les obligations de l'employeur en matière de santé et sécurité ?",
    answer: `L'employeur a une obligation de sécurité envers ses salariés. Il doit prendre les mesures nécessaires pour assurer leur sécurité et protéger leur santé physique et mentale.

Cela comprend notamment :

• l'évaluation des risques professionnels
• la mise en place d'actions de prévention
• la formation et l'information des salariés
• la mise à disposition d'équipements de protection adaptés
• l'organisation du travail de manière à limiter les risques

En cas de manquement, la responsabilité de l'employeur peut être engagée, y compris au titre de la faute inexcusable.`,
    category: "employeur" as const,
  },
  {
    question: "Quelle est la différence entre une faute simple, grave et lourde ?",
    answer: `La faute simple est un manquement aux obligations du salarié qui ne rend pas impossible son maintien dans l'entreprise pendant le préavis.

La faute grave rend impossible le maintien du salarié dans l'entreprise, même pendant le préavis. Elle prive le salarié de l'indemnité de préavis et de l'indemnité de licenciement.

La faute lourde suppose l'intention de nuire à l'employeur ou à l'entreprise. Elle prive le salarié de l'indemnité de préavis, de l'indemnité de licenciement et peut ouvrir droit à des dommages et intérêts pour l'employeur.`,
    category: "general" as const,
  },
  {
    question: "Puis-je contester une sanction disciplinaire ?",
    answer: `Oui, vous pouvez contester une sanction disciplinaire si :

• elle est disproportionnée par rapport aux faits reprochés
• la procédure n'a pas été respectée
• les délais légaux n'ont pas été respectés
• les faits reprochés ne sont pas établis

La contestation peut se faire par courrier à l'employeur, puis éventuellement devant le conseil de prud'hommes.

Il est important de ne pas laisser passer une sanction injustifiée, car elle peut être utilisée ultérieurement pour justifier un licenciement.`,
    category: "salarie" as const,
  },
  {
    question: "Comment se déroule une rupture conventionnelle ?",
    answer: `La rupture conventionnelle permet de mettre fin au CDI d'un commun accord entre l'employeur et le salarié.

Les étapes sont :

• un ou plusieurs entretiens entre l'employeur et le salarié
• la signature d'une convention de rupture
• un délai de rétractation de 15 jours calendaires
• la transmission de la convention à la DREETS pour homologation
• la rupture effective du contrat après validation

Le salarié bénéficie d'une indemnité au moins égale à l'indemnité légale de licenciement et peut percevoir les allocations chômage.`,
    category: "general" as const,
  },
] as const;

export const FAQ_CATEGORIES = [
  { key: "salarie", label: "Questions salariés" },
  { key: "employeur", label: "Questions employeurs" },
  { key: "general", label: "Questions générales" },
] as const;
