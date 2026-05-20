/**
 * Structure éditoriale des formations — textes littéraux issus de client-formations.ts
 */

export type FormationModule = {
  title: string;
  items: string[];
};

export type FormationSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export type FormationProductMeta = {
  format: string;
  duree: string;
  public: string;
  tarifLabel?: string;
  tarif?: string;
};

export type FormationData = {
  id: string;
  label: string;
  titre: string;
  /** Titre affiché sur la carte produit (si différent du titre officiel) */
  carteTitre?: string;
  tagline?: string;
  intro: string[];
  sections: FormationSection[];
  programme?: {
    title: string;
    modules: FormationModule[];
  };
  productMeta?: FormationProductMeta;
  highlights?: string[];
  demarche?: string;
  disclaimer: string;
};

export const FORMATION_ACCIDENTS_DATA: FormationData = {
  id: "accidents-travail",
  label: "FORMATION",
  titre: "FORMATION – REDUIRE LES ZONES DE RISQUE EN MATIERE D'ACCIDENTS DU TRAVAIL",
  tagline:
    "Identifier les failles, renforcer la prévention et sécuriser les pratiques liées aux accidents du travail",
  intro: [
    "Je propose une formation centrée sur les situations concrètes rencontrées en entreprise, avec une approche à la fois préventive, organisationnelle, administrative et juridique.",
    "L'objectif n'est pas de promettre l'absence totale d'accidents du travail, car le risque zéro n'existe pas, mais d'aider les employeurs à mettre en place les mesures nécessaires afin de réduire les zones de risque, renforcer leurs pratiques de prévention et sécuriser leur position en cas de difficulté.",
    "Même lorsqu'une entreprise met en œuvre des actions de prévention, des formations, des équipements de protection ou des consignes de sécurité, un accident peut toujours survenir.",
    "En revanche, l'employeur doit être en capacité de démontrer qu'il a pris les mesures nécessaires pour assurer la sécurité et protéger la santé physique et mentale des salariés, conformément aux articles L4121-1 et L4121-2 du Code du travail.",
  ],
  sections: [
    {
      title: "En pratique, certaines difficultés fragilisent régulièrement les entreprises :",
      items: [
        "absence ou insuffisance de prévention ;",
        "DUERP incomplet ou inadapté ;",
        "manque de traçabilité ;",
        "défaut de communication ;",
        "insuffisance de sensibilisation des salariés et des managers ;",
        "mauvaise circulation des informations ;",
        "absence de vigilance autour des EPI ;",
        "erreurs dans les premières démarches administratives ;",
        "ou encore absence d'anticipation des risques liés aux contentieux.",
      ],
    },
    {
      title: "",
      paragraphs: [
        "Ces éléments peuvent compliquer la gestion d'un accident du travail et fragiliser l'entreprise, notamment en cas de contrôle, de contestation, de contentieux ou de mise en cause de la responsabilité de l'employeur, y compris dans le cadre d'une faute inexcusable.",
      ],
    },
    {
      title: "Objectifs de la formation",
      items: [
        "Identifier les zones de risque et les points de vigilance en entreprise ;",
        "comprendre les obligations de l'employeur en matière de sécurité ;",
        "améliorer les pratiques de prévention et la circulation des informations ;",
        "renforcer la sensibilisation autour des règles de sécurité et des EPI ;",
        "adopter les bons réflexes dès la survenance d'un accident du travail ;",
        "sécuriser les démarches administratives et les premières étapes de gestion ;",
        "limiter les erreurs pouvant fragiliser l'entreprise en cas de contrôle ou de contentieux.",
      ],
    },
    {
      title: "Pourquoi suivre cette formation ?",
      paragraphs: [
        "Même lorsqu'un employeur met en place des mesures de prévention, un accident du travail peut survenir.",
        "Cependant, certaines difficultés peuvent être limitées grâce à :",
      ],
      items: [
        "une meilleure organisation ;",
        "une prévention adaptée ;",
        "une communication plus efficace ;",
        "une meilleure traçabilité ;",
        "et une gestion plus structurée des premières étapes.",
      ],
    },
    {
      title: "",
      paragraphs: [
        "Les premières réactions et les démarches mises en œuvre sont souvent déterminantes et peuvent avoir des conséquences importantes sur la suite du dossier.",
        "Cette formation permet donc d'agir avec davantage de méthode, de vigilance et de sécurité afin de renforcer les pratiques internes et sécuriser la position de l'entreprise en cas de difficulté.",
      ],
    },
    {
      title: "Public concerné",
      items: [
        "employeurs ;",
        "responsables RH ;",
        "managers ;",
        "référents sécurité ;",
        "toute personne amenée à intervenir dans la gestion ou la prévention des accidents du travail.",
      ],
    },
    {
      title: "Modalités",
      items: [
        "formation adaptable selon les besoins de l'entreprise ;",
        "possibilité de formation à distance ;",
        "contenu basé sur des situations concrètes et des cas pratiques.",
      ],
    },
  ],
  programme: {
    title: "Programme de la formation",
    modules: [
      {
        title: "1. Identifier et réduire les zones de risque",
        items: [
          "obligations de l'employeur en matière de santé et sécurité ;",
          "rôle du DUERP et intérêt pratique ;",
          "identification des failles organisationnelles ;",
          "importance de la traçabilité et de la communication interne ;",
          "sensibilisation des salariés et des managers ;",
          "vigilance autour des EPI et des pratiques terrain ;",
          "prévention des situations pouvant fragiliser l'entreprise.",
        ],
      },
      {
        title: "2. Comprendre l'accident du travail",
        items: [
          "définition juridique de l'accident du travail ;",
          "notion d'événement soudain ;",
          "distinction entre accident du travail et maladie professionnelle ;",
          "enjeux liés à la reconnaissance de l'accident ;",
          "compréhension des conséquences administratives et juridiques.",
        ],
      },
      {
        title: "3. Réagir dès la survenance d'un accident",
        items: [
          "premiers réflexes à adopter ;",
          "posture à adopter face à la situation ;",
          "gestion des informations et des échanges ;",
          "erreurs fréquentes à éviter ;",
          "importance des premières démarches ;",
          "anticipation des difficultés pouvant apparaître par la suite.",
        ],
      },
      {
        title: "4. Sécuriser les démarches administratives",
        items: [
          "déclaration d'accident du travail ;",
          "respect des délais ;",
          "rédaction des réserves ;",
          "gestion des questionnaires CPAM ;",
          "vigilance sur les éléments transmis et leur formulation ;",
          "compréhension des enjeux administratifs et contentieux.",
        ],
      },
    ],
  },
  productMeta: {
    format: "Présentiel ou à distance",
    duree: "Adaptable selon les besoins de l'entreprise",
    public:
      "Employeurs, responsables RH, managers, référents sécurité et toute personne amenée à intervenir dans la gestion ou la prévention des accidents du travail",
    tarifLabel: "Tarif par groupe",
    tarif: "À partir de 999 € HT par groupe de 5 participants",
  },
  highlights: [
    "Formation basée sur des situations concrètes",
    "Contenu adapté aux besoins de votre structure",
    "Méthode claire pour sécuriser vos pratiques avant et après un accident",
  ],
  demarche:
    "Ma démarche consiste à aider les entreprises à identifier les zones de risque, renforcer leurs pratiques de prévention et sécuriser leur gestion avant et après la survenance d'un accident du travail.",
  disclaimer: "Je n'interviens pas à la place des professions réglementées.",
};

export const FORMATION_DISCIPLINAIRE_DATA: FormationData = {
  id: "pouvoir-disciplinaire",
  label: "FORMATION",
  titre: "FORMATION – EXERCICE DU POUVOIR DISCIPLINAIRE DE L'EMPLOYEUR",
  carteTitre: "Exercer et sécuriser le pouvoir disciplinaire de l'employeur",
  intro: [
    "Je propose une formation dédiée à la gestion des procédures disciplinaires, centrée sur les situations concrètes rencontrées en entreprise.",
  ],
  sections: [
    {
      title: "Objectifs",
      paragraphs: [
        "Objectifs : permettre aux employeurs et aux managers de sécuriser leurs décisions et d'éviter les erreurs pouvant conduire à un contentieux.",
      ],
      items: [
        "apprécier la gravité des faits reprochés",
        "distinguer les différents niveaux de faute",
        "respecter les étapes de la procédure disciplinaire",
        "conduire un entretien disciplinaire",
        "sécuriser les décisions prises",
      ],
    },
    {
      title: "",
      paragraphs: [
        "En pratique, les procédures disciplinaires sont souvent sources de difficultés, notamment en matière de qualification des fautes ou de respect des étapes.",
        "Une erreur dans la gestion d'une procédure peut fragiliser la décision prise, même lorsque les faits sont établis.",
      ],
    },
    {
      title: "Public concerné",
      items: [
        "Employeurs",
        "Responsables RH",
        "Managers",
        "Toute personne amenée à exercer un pouvoir disciplinaire",
      ],
    },
    {
      title: "Prérequis",
      paragraphs: ["aucun"],
    },
    {
      title: "Modalités",
      items: [
        "formation en distanciel (visioconférence)",
        "adaptable en fonction des besoins",
        "possibilité d'intervention en entreprise (sur demande)",
      ],
    },
    {
      title: "Méthodes pédagogiques",
      items: [
        "apports pratiques et méthodologiques",
        "cas concrets issus de situations rencontrées",
        "échanges et retours d'expérience",
      ],
    },
    {
      title: "",
      paragraphs: [
        "La formation est construite pour permettre une application immédiate en entreprise.",
      ],
    },
    {
      title: "Ma démarche",
      paragraphs: [
        "J'apporte de la compréhension, de la méthode et de la structuration, afin de permettre à chacun d'agir avec plus de clarté et de sécurité dans ses pratiques.",
      ],
    },
  ],
  programme: {
    title: "Contenu de la formation",
    modules: [
      {
        title: "Comprendre le cadre du pouvoir disciplinaire",
        items: [
          "rôle et limites du pouvoir disciplinaire",
          "obligations de l'employeur",
          "enjeux en cas de contentieux",
        ],
      },
      {
        title: "Apprécier et qualifier les fautes",
        items: [
          "analyse des faits",
          "distinction entre faute simple, grave ou lourde",
          "erreurs fréquentes en pratique",
        ],
      },
      {
        title: "Savoir maîtriser la procédure disciplinaire",
        items: [
          "respect des étapes",
          "délais à respecter",
          "rédaction et formalisation",
        ],
      },
      {
        title: "Conduire un entretien disciplinaire",
        items: [
          "préparation de l'entretien",
          "posture à adopter",
          "gestion des échanges",
        ],
      },
      {
        title: "Sécuriser les décisions",
        items: [
          "cohérence de la sanction",
          "risques en cas d'erreur",
          "bonnes pratiques pour limiter les contestations",
        ],
      },
    ],
  },
  productMeta: {
    format: "Distanciel (visioconférence)",
    duree: "1/2 journée ou 1 journée (adaptable selon vos besoins)",
    public:
      "Employeurs, responsables RH, managers et toute personne amenée à exercer un pouvoir disciplinaire",
    tarifLabel: "Tarif par participant",
    tarif: "À partir de 290 € HT",
  },
  highlights: [
    "Formation basée sur des situations concrètes",
    "Contenu adapté aux besoins de votre structure",
    "Méthode claire et opérationnelle pour sécuriser vos décisions",
  ],
  disclaimer: "Je n'interviens pas à la place des professions réglementées.",
};

export const FORMATIONS_LIST = [FORMATION_ACCIDENTS_DATA, FORMATION_DISCIPLINAIRE_DATA];
