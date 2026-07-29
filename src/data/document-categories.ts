export type DocumentCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  target_audience: 'salarie' | 'employeur' | 'all';
  sort_order: number;
};

export const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  {
    id: 'salaries',
    name: 'Salariés',
    slug: 'salaries',
    description: 'Documents pour les salariés : réponses, courriers, démarches.',
    target_audience: 'salarie',
    sort_order: 1,
  },
  {
    id: 'employeurs',
    name: 'Employeurs',
    slug: 'employeurs',
    description: 'Documents pour les employeurs : prévention, procédures, RH.',
    target_audience: 'employeur',
    sort_order: 2,
  },
  {
    id: 'duerp-prevention',
    name: 'DUERP et prévention',
    slug: 'duerp-prevention',
    description: "Documents uniques d'évaluation des risques et outils de prévention.",
    target_audience: 'all',
    sort_order: 3,
  },
  {
    id: 'at-mp',
    name: 'Accidents du travail et maladies professionnelles',
    slug: 'at-mp',
    description: 'Documents liés aux AT/MP : checklists, démarches, courriers.',
    target_audience: 'salarie',
    sort_order: 4,
  },
  {
    id: 'procedures-disciplinaires',
    name: 'Procédures disciplinaires',
    slug: 'procedures-disciplinaires',
    description: 'Documents pour faire face ou mener une procédure disciplinaire.',
    target_audience: 'all',
    sort_order: 5,
  },
  {
    id: 'harcelement-rps',
    name: 'Harcèlement et risques psychosociaux',
    slug: 'harcelement-rps',
    description: 'Documents pour signaler, qualifier et agir face aux RPS.',
    target_audience: 'salarie',
    sort_order: 6,
  },
  {
    id: 'contrats-rupture',
    name: 'Contrats et rupture du contrat',
    slug: 'contrats-rupture',
    description: "Documents liés aux contrats de travail et à leur rupture.",
    target_audience: 'all',
    sort_order: 7,
  },
  {
    id: 'courriers-professionnels',
    name: 'Courriers professionnels',
    slug: 'courriers-professionnels',
    description: 'Modèles de courriers professionnels en droit du travail.',
    target_audience: 'all',
    sort_order: 8,
  },
  {
    id: 'suisse',
    name: 'Suisse — rédaction uniquement',
    slug: 'suisse',
    description: 'Courriers professionnels pour la Suisse, sans conseil juridique suisse.',
    target_audience: 'all',
    sort_order: 9,
  },
  {
    id: 'packs-thematiques',
    name: 'Packs thématiques',
    slug: 'packs-thematiques',
    description: 'Packs regroupant plusieurs documents complémentaires.',
    target_audience: 'all',
    sort_order: 10,
  },
];

export const DOCUMENT_SYNONYMS: Record<string, string[]> = {
  avertissement: ['sanction', 'blâme', 'observation'],
  salaire: ['rémunération', 'paie', 'fiche de paie'],
  accident: ['AT', 'accident du travail', 'sinistre'],
  'maladie professionnelle': ['MP', 'maladie pro', 'reconnaissance'],
  'risques psychosociaux': ['RPS', 'harcèlement', 'stress au travail'],
  'document unique': ['DUERP', 'évaluation des risques', 'document unique d\'évaluation'],
  licenciement: ['rupture', 'fin de contrat', 'licenciement'],
  courrier: ['lettre', 'missive', 'correspondance'],
  harcèlement: ['RPS', 'harcèlement moral', 'harcèlement sexuel', 'pression'],
  'mise à pied': ['suspension', 'mise à pied conservatoire', 'mise à pied disciplinaire'],
};

export const DOCUMENT_AUDIENCE_LABELS: Record<string, string> = {
  salarie: 'Salariés',
  employeur: 'Employeurs',
  all: 'Salariés & Employeurs',
};

export const DOCUMENT_STATUS_LABELS: Record<string, string> = {
  draft: 'Brouillon',
  published: 'Publié',
  archived: 'Archivé',
};

export const DISCLAIMER_GENERAL =
  "Ce document constitue un modèle général à compléter et à adapter à la situation réelle. Il ne remplace pas une analyse personnalisée par un professionnel compétent lorsque celle-ci est nécessaire.";

export const DISCLAIMER_SUISSE =
  "Ce document est proposé dans le cadre d'un accompagnement rédactionnel. Il ne constitue pas un conseil juridique suisse.";
