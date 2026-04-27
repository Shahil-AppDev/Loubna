import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const SERVICES_DATA = {
  "redaction-contrat-travail": {
    title: "Rédaction & Vérification de Contrat de Travail (CDI/CDD) | Juriste",
    description: "Employeur ou salarié, sécurisez vos contrats de travail (CDI, CDD). Rédaction sur-mesure, vérification des clauses (non-concurrence) et prévention des litiges.",
    h1: "Rédaction, Révision et Sécurisation de vos Contrats de Travail",
    content: {
      intro: "Le contrat de travail est le fondement de la relation professionnelle. Qu'il s'agisse d'un CDI, d'un CDD ou d'un temps partiel, les termes qui y sont inscrits engageront les deux parties pendant des années. Une rédaction imprécise ou l'utilisation d'un modèle type inadapté est la première cause de contentieux prud'homal.",
      sections: [
        {
          h2: "Les enjeux d'un contrat de travail bien rédigé",
          content: `**Pour l'employeur** : Un contrat sur-mesure protège votre entreprise. Il permet d'imposer une période d'essai valide, de définir une clause de mobilité géographique, ou de protéger votre savoir-faire via une clause de non-concurrence rémunérée.

**Pour le salarié** : Avant de signer, il est crucial de comprendre la portée de vos engagements. La rémunération variable est-elle objective ? Vos horaires sont-ils garantis ? La clause d'exclusivité est-elle justifiée ?`
        },
        {
          h2: "Mon accompagnement juridique",
          content: `En tant que juriste, je vous accompagne à chaque étape de la vie du contrat :

- **Rédaction** : Création de contrats personnalisés, conformes à votre convention collective et aux dernières réformes du droit du travail.
- **Vérification et Relecture** : Décryptage des clauses complexes avant signature, pour les cadres et salariés.
- **Modification du contrat** : Accompagnement dans la rédaction d'avenants (changement de rémunération, de lieu ou de temps de travail).`
        }
      ],
      faq: [
        {
          q: "Un CDI verbal est-il légal ?",
          a: "Oui, pour un temps plein. Mais il est fortement déconseillé car il vous prive de la possibilité d'imposer une période d'essai ou une clause de non-concurrence."
        },
        {
          q: "Puis-je refuser une modification de mon contrat ?",
          a: "Oui, si la modification porte sur un élément essentiel (salaire, qualification). L'employeur ne peut pas vous l'imposer unilatéralement."
        }
      ],
      ctaSalarie: "Faire relire mon contrat avant signature",
      ctaEmployeur: "Sécuriser l'embauche de mon futur collaborateur",
      relatedLinks: [
        { href: "/services/sensibilisation-rse-prevention", label: "Sensibilisation RSE" },
        { href: "/blog/rediger-contrat-travail-cdi-clauses-obligatoires", label: "Guide : Rédiger un CDI" }
      ]
    }
  },
  "sanctions-disciplinaires": {
    title: "Contestation & Gestion des Sanctions Disciplinaires | Juriste",
    description: "Avertissement, mise à pied, blâme : faites-vous accompagner pour contester une sanction injustifiée ou sécuriser une procédure disciplinaire.",
    h1: "Accompagnement face aux Procédures et Sanctions Disciplinaires",
    content: {
      intro: "La procédure disciplinaire est un moment de forte tension dans l'entreprise. Qu'il s'agisse d'un simple avertissement, d'une mise à pied ou d'une rétrogradation, la sanction doit répondre à des critères stricts de proportionnalité et de procédure. L'erreur n'est permise ni pour l'employeur qui sanctionne, ni pour le salarié qui se défend.",
      sections: [
        {
          h2: "Les risques liés à une procédure mal maîtrisée",
          content: `Une sanction disproportionnée ou notifiée hors délai peut être annulée par le juge. Pour un salarié, ne pas contester un avertissement infondé, c'est laisser une trace dans son dossier qui pourra justifier un licenciement ultérieur. Pour un employeur, un vice de procédure lors d'une mise à pied peut coûter cher en rappels de salaire et dommages et intérêts.`
        },
        {
          h2: "Comment je vous accompagne ?",
          content: `**Pour les salariés** : Compréhension des griefs reprochés, vérification des délais légaux, et rédaction du courrier de contestation de la sanction. Préparation à l'entretien préalable.

**Pour les employeurs** : Qualification de la faute (simple, grave, lourde), choix de la sanction adaptée à l'échelle prévue par votre règlement intérieur, et rédaction des courriers de convocation et de notification dans le strict respect des délais légaux.`
        }
      ],
      faq: [
        {
          q: "Quel est le délai pour sanctionner une faute ?",
          a: "L'employeur a 2 mois maximum à compter du jour où il en a eu connaissance."
        },
        {
          q: "Une même faute peut-elle être sanctionnée deux fois ?",
          a: "Non, le principe \"non bis in idem\" l'interdit formellement."
        }
      ],
      ctaSalarie: "Contester une sanction injustifiée",
      ctaEmployeur: "Sécuriser une procédure disciplinaire",
      relatedLinks: [
        { href: "/blog/comment-contester-sanction-disciplinaire-avertissement", label: "Guide : Contester une sanction" },
        { href: "/services/conseil-licenciement", label: "Accompagnement licenciement" }
      ]
    }
  },
  "recrutement-salaries-etrangers": {
    title: "Aide au Recrutement de Salariés Étrangers (Hors UE) | Juriste",
    description: "Employeurs, externalisez vos démarches d'autorisation de travail. Sécurisez l'embauche de vos talents étrangers en France en toute conformité.",
    h1: "Accompagnement et Démarches pour le Recrutement de Salariés Étrangers",
    content: {
      intro: "Face à la pénurie de talents dans de nombreux secteurs (informatique, ingénierie, restauration), recruter un ressortissant étranger (hors UE) est souvent une nécessité stratégique. Cependant, la complexité des démarches administratives et les délais d'obtention des autorisations de travail freinent de nombreuses entreprises.",
      sections: [
        {
          h2: "Les risques du travail dissimulé",
          content: `L'emploi d'un étranger sans titre l'autorisant à travailler est une infraction grave. L'employeur s'expose à des amendes pénales (jusqu'à 15 000 € par salarié), des peines de prison, la fermeture administrative de l'établissement et l'exclusion des marchés publics.`
        },
        {
          h2: "Un accompagnement de A à Z pour les employeurs",
          content: `Déléguez la gestion administrative de vos recrutements internationaux pour vous concentrer sur l'intégration de vos futurs talents :

- **Audit de la situation du candidat** : Vérification de l'authenticité des titres de séjour existants auprès de la Préfecture.
- **Demande d'autorisation de travail** : Montage du dossier, vérification de l'opposabilité de la situation de l'emploi (métiers en tension) et soumission sur la plateforme du Ministère de l'Intérieur.
- **Suivi et conformité** : Accompagnement sur les obligations annexes (taxe OFII, visites médicales, changement de statut).`
        }
      ],
      faq: [
        {
          q: "Dois-je vérifier le titre d'un candidat européen ?",
          a: "Non, les citoyens de l'UE et de l'EEE bénéficient de la libre circulation des travailleurs."
        },
        {
          q: "Qu'est-ce qu'un métier en tension ?",
          a: "C'est une liste de métiers connaissant des difficultés de recrutement, pour lesquels l'administration ne vous demande pas de prouver que vous avez cherché un candidat en France au préalable."
        }
      ],
      ctaEmployeur: "Externaliser mes demandes d'autorisation de travail",
      relatedLinks: [
        { href: "/blog/recrutement-salarie-etranger-demarches-employeur", label: "Guide : Embaucher un salarié étranger" },
        { href: "/services/redaction-contrat-travail", label: "Rédaction de contrats" }
      ]
    }
  },
  "conseil-licenciement": {
    title: "Accompagnement dans les Procédures de Licenciement | Juriste",
    description: "Licenciement économique, pour faute ou inaptitude : bénéficiez d'un accompagnement en droit du travail pour sécuriser la procédure ou comprendre vos droits.",
    h1: "Accompagnement dans les Procédures de Licenciement",
    content: {
      intro: "Le licenciement est l'acte le plus lourd de conséquences dans la relation de travail. Qu'il soit fondé sur un motif personnel (faute, insuffisance professionnelle) ou économique, il obéit à un formalisme extrêmement rigoureux. La moindre erreur procédurale ou un motif mal caractérisé ouvre la voie au contentieux.",
      sections: [
        {
          h2: "Sécuriser ou contester : deux approches stratégiques",
          content: `**Risques employeur** : Un licenciement jugé "sans cause réelle et sérieuse" entraîne la condamnation au versement d'indemnités (barème Macron) et le remboursement des allocations chômage à France Travail.

**Enjeux salarié** : Un licenciement brutal ou injustifié cause un préjudice moral et financier majeur. Faire valoir l'irrégularité de la procédure ou l'absence de motif légitime permet d'obtenir une juste réparation.`
        },
        {
          h2: "Mon accompagnement à votre service",
          content: `**Pour les employeurs** : Choix du motif de licenciement le plus approprié, rédaction des courriers (convocation, notification), calcul précis des indemnités de départ (légales, conventionnelles, préavis, congés payés) et respect du calendrier procédural.

**Pour les salariés** : Vérification approfondie de la lettre de licenciement, contrôle du respect de vos droits (priorité de réembauche, CSP), et évaluation de l'opportunité d'une contestation ou d'une transaction amiable.`
        }
      ],
      faq: [
        {
          q: "Qu'est-ce qu'une faute grave ?",
          a: "C'est une faute d'une telle gravité qu'elle rend impossible le maintien du salarié dans l'entreprise, même pendant le préavis. Elle prive le salarié de l'indemnité de licenciement et de l'indemnité de préavis."
        },
        {
          q: "Puis-je être assisté lors de l'entretien préalable ?",
          a: "Oui, par une personne de l'entreprise ou, s'il n'y a pas de représentants du personnel, par un conseiller extérieur."
        }
      ],
      ctaSalarie: "Faire vérifier ma lettre de licenciement",
      ctaEmployeur: "Sécuriser ma procédure de licenciement",
      relatedLinks: [
        { href: "/services/negociation-accord-transactionnel", label: "Négociation amiable" },
        { href: "/services/rupture-conventionnelle", label: "Rupture conventionnelle" }
      ]
    }
  },
  "negociation-accord-transactionnel": {
    title: "Négociation de Départ et Protocole Transactionnel | Juriste",
    description: "Évitez les prud'hommes. Accompagnement juridique pour négocier un départ amiable, une transaction ou des indemnités équitables.",
    h1: "Négociation Stratégique et Protocole Transactionnel",
    content: {
      intro: "La justice prud'homale est souvent longue (parfois plusieurs années), coûteuse et incertaine. Face à un litige naissant ou une volonté commune de séparation, la négociation amiable est très souvent la solution la plus efficace, la plus rapide et la plus protectrice des intérêts des deux parties.",
      sections: [
        {
          h2: "Pourquoi privilégier la négociation amiable ?",
          content: `Un accord transactionnel permet de mettre un terme définitif à tout litige présent ou à venir concernant l'exécution et la rupture du contrat de travail. En échange de concessions réciproques (généralement le versement d'une indemnité transactionnelle par l'employeur), le salarié renonce à toute poursuite judiciaire. C'est la garantie de la confidentialité et de la maîtrise du budget.`
        },
        {
          h2: "L'art de la négociation juridique",
          content: `La négociation ne s'improvise pas, elle se prépare juridiquement :

- **Évaluation du risque** : Chiffrage précis des indemnités potentiellement dues en cas de condamnation judiciaire (barème Macron, préjudices distincts).
- **Stratégie d'approche** : Définition des arguments de force, des concessions possibles et du calendrier de négociation.
- **Rédaction du protocole** : Un protocole transactionnel mal rédigé est nul. Je rédige des actes juridiquement inattaquables, intégrant les clauses de confidentialité et les concessions réciproques obligatoires.`
        }
      ],
      faq: [
        {
          q: "Quand peut-on signer un protocole transactionnel ?",
          a: "Obligatoirement après que la rupture du contrat (licenciement, démission) soit devenue définitive. On ne transige pas sur une rupture future."
        },
        {
          q: "L'indemnité transactionnelle est-elle imposable ?",
          a: "Elle bénéficie d'un régime fiscal et social de faveur, exonéré d'impôts et de cotisations sociales dans certaines limites légales complexes."
        }
      ],
      cta: "Évaluer le montant d'une transaction amiable",
      relatedLinks: [
        { href: "/services/conseil-licenciement", label: "Accompagnement licenciement" },
        { href: "/services/rupture-conventionnelle", label: "Rupture conventionnelle" }
      ]
    }
  },
  "rupture-conventionnelle": {
    title: "Information et Accompagnement en Rupture Conventionnelle | Juriste",
    description: "Sécurisez votre rupture conventionnelle en 2024. Accompagnement pour le calcul des indemnités, la négociation et le respect des délais.",
    h1: "Accompagnement Complet en Rupture Conventionnelle",
    content: {
      intro: "La rupture conventionnelle est le seul mode de rupture amiable du CDI. Elle permet aux deux parties de se séparer d'un commun accord, en garantissant au salarié le bénéfice des allocations chômage. Toutefois, un formalisme strict et des délais incompressibles doivent être respectés sous peine de nullité.",
      sections: [
        {
          h2: "Les écueils de la procédure",
          content: `Bien qu'elle paraisse simple, la rupture conventionnelle recèle des pièges : non-respect du délai de rétractation de 15 jours, erreur dans le calcul du salaire de référence entraînant une indemnité inférieure au minimum légal, ou encore consentement vicié par un contexte de harcèlement. Dans ces cas, l'administration refusera l'homologation, ou le juge pourra la requalifier en licenciement abusif.`
        },
        {
          h2: "Un accompagnement pour sécuriser votre séparation",
          content: `**Pour les employeurs** : Audit de la faisabilité, calcul exact de l'indemnité légale ou conventionnelle, rédaction du Cerfa, gestion du calendrier de rétractation et télétransmission à la DREETS.

**Pour les salariés** : Vérification du calcul de vos indemnités, stratégie pour négocier une indemnité supra-légale, information sur l'application de la clause de non-concurrence et du sort de vos congés payés.`
        }
      ],
      faq: [
        {
          q: "Peut-on faire une rupture conventionnelle en arrêt maladie ?",
          a: "Oui, la jurisprudence l'autorise (sauf fraude), y compris pendant un accident du travail ou un congé maternité, sous réserve du libre consentement."
        },
        {
          q: "Quel est le montant minimum de l'indemnité ?",
          a: "Elle ne peut être inférieure à l'indemnité légale de licenciement (ou l'indemnité prévue par votre convention collective si elle est plus favorable)."
        }
      ],
      ctaSalarie: "Calculer mon indemnité et négocier mon départ",
      ctaEmployeur: "Sécuriser la procédure d'homologation",
      relatedLinks: [
        { href: "/blog/rupture-conventionnelle-procedure-indemnites-2024", label: "Guide : Rupture conventionnelle 2024" },
        { href: "/services/negociation-accord-transactionnel", label: "Négociation amiable" }
      ]
    }
  },
  "sensibilisation-rse-prevention": {
    title: "Prévention des risques, RPS et RSE en entreprise | Juriste",
    description: "Accompagnement des dirigeants et DRH : Document Unique (DUERP), prévention des risques psychosociaux (RPS), harcèlement et conformité RSE.",
    h1: "Prévention des Risques, Obligations RSE et Santé au Travail",
    content: {
      intro: "La santé physique et mentale de vos collaborateurs est de votre responsabilité. En droit du travail, l'employeur est tenu à une obligation de sécurité et de prévention. Attendre qu'un accident ou un burn-out se produise pour agir vous expose à des sanctions pénales et à la reconnaissance de votre \"faute inexcusable\".",
      sections: [
        {
          h2: "La RSE comme levier de performance et de sécurité légale",
          content: `La prévention (harcèlement, risques psychosociaux - RPS, égalité professionnelle) n'est pas qu'une contrainte administrative. C'est le socle de votre marque employeur. Une entreprise en conformité réduit son taux d'absentéisme, fidélise ses talents et se prémunit contre les contentieux prud'homaux longs et coûteux.`
        },
        {
          h2: "Mon offre d'état des lieux et de mise en conformité",
          content: `Je vous accompagne dans la structuration juridique de votre politique de prévention :

- **Le Document Unique (DUERP)** : Audit, rédaction et mise à jour annuelle de votre Document Unique d'Évaluation des Risques Professionnels (obligatoire dès 1 salarié).
- **Chartes et Accords** : Rédaction de chartes de télétravail, d'accords sur le droit à la déconnexion et de politiques de prévention du harcèlement moral et sexuel.
- **Sensibilisation et formation** : Animation d'ateliers de sensibilisation pour vos managers et vos équipes sur les risques juridiques (RPS, discrimination, obligations de l'employeur).`
        }
      ],
      faq: [
        {
          q: "Qu'est-ce que la faute inexcusable de l'employeur ?",
          a: "C'est lorsque l'employeur avait conscience (ou aurait dû avoir conscience) du danger menaçant le salarié et qu'il n'a pas pris les mesures pour l'en préserver."
        },
        {
          q: "L'affichage des textes de loi est-il suffisant ?",
          a: "Non, l'affichage est obligatoire, mais les juges exigent que l'employeur prouve qu'il a mené des actions concrètes de formation et de prévention (obligation de moyens renforcée)."
        }
      ],
      ctaEmployeur: "Mettre mon entreprise en conformité juridique",
      relatedLinks: [
        { href: "/blog/obligations-employeur-rse-prevention-risques-duerp", label: "Guide : Obligations RSE de l'employeur" },
        { href: "/services/redaction-contrat-travail", label: "Rédaction de contrats" }
      ]
    }
  },
  "prevention-risques": {
    title: "Prévention des Risques Professionnels | Accompagnement en Droit du Travail",
    description: "Accompagnement des entreprises dans l'identification et la prévention des risques professionnels : conditions de travail, organisation, relations internes.",
    h1: "Prévention des Risques Professionnels",
    content: {
      intro: "J'accompagne les entreprises dans l'identification et la prévention des risques professionnels, qu'ils soient liés aux conditions de travail, à l'organisation ou aux relations internes.",
      sections: [
        {
          h2: "Anticiper les risques pour sécuriser votre organisation",
          content: `À partir d'une compréhension de votre activité, j'identifie les situations à risque : accidents du travail, maladies professionnelles, stress, tensions ou surcharge.

Je propose ensuite des actions concrètes et adaptées à votre structure, afin de limiter les risques et améliorer les conditions de travail.

**Objectif :** prévenir les difficultés, sécuriser vos pratiques et agir en amont.`
        }
      ],
      faq: [],
      ctaEmployeur: "Évaluer les risques de mon entreprise",
      relatedLinks: [
        { href: "/services/duerp", label: "DUERP – Document Unique" },
        { href: "/services/sante-securite", label: "Santé, sécurité et conditions de travail" }
      ]
    }
  },
  "duerp": {
    title: "DUERP – Document Unique d'Évaluation des Risques Professionnels | Juriste",
    description: "Accompagnement dans la rédaction ou la mise à jour du DUERP : identification des risques, rédaction du document, recommandations concrètes et applicables.",
    h1: "DUERP – Document Unique d'Évaluation des Risques Professionnels",
    content: {
      intro: "Je vous accompagne dans la rédaction ou la mise à jour de votre Document Unique d'Évaluation des Risques Professionnels (DUERP), à partir d'une compréhension concrète de vos situations de travail. L'objectif est d'identifier les risques réels auxquels vos équipes sont exposées : accidents du travail, maladies professionnelles, mais aussi risques liés à l'organisation ou aux relations de travail. Le DUERP devient ainsi un outil clair, structuré et utile au quotidien.",
      sections: [
        {
          h2: "Une approche concrète et sur mesure",
          content: `Chaque intervention est adaptée à votre activité et à votre organisation. Elle comprend :

- La compréhension des situations de travail
- L'identification des risques (physiques et psychosociaux)
- La rédaction ou la mise à jour du DUERP
- Des recommandations concrètes et applicables

Les échanges avec les équipes permettent d'intégrer la réalité du terrain et d'assurer la pertinence des actions proposées.`
        },
        {
          h2: "Au-delà de l'obligation réglementaire",
          content: `Mon accompagnement ne se limite pas à la rédaction d'un document. Il s'inscrit dans une démarche globale de prévention visant à :

- Anticiper les situations à risque
- Limiter les tensions et les difficultés internes
- Sécuriser les pratiques de l'employeur

**Objectif :** disposer d'un outil de travail fiable, pour prévenir les problèmes plutôt que les subir.`
        }
      ],
      faq: [],
      ctaEmployeur: "Faire réaliser ou mettre à jour mon DUERP",
      relatedLinks: [
        { href: "/services/prevention-risques", label: "Prévention des risques professionnels" },
        { href: "/services/sante-securite", label: "Santé, sécurité et conditions de travail" }
      ]
    }
  },
  "sante-securite": {
    title: "Santé, Sécurité et Conditions de Travail | Accompagnement en Droit du Travail",
    description: "Accompagnement des entreprises dans la mise en place d'une démarche de prévention en matière de santé, sécurité et conditions de travail.",
    h1: "Santé, Sécurité et Conditions de Travail",
    content: {
      intro: "J'accompagne les entreprises dans la mise en place et le suivi de leur démarche en matière de santé, sécurité et conditions de travail. Au-delà des obligations réglementaires, il s'agit d'intégrer la prévention dans le fonctionnement quotidien de l'entreprise, en tenant compte des réalités du terrain.",
      sections: [
        {
          h2: "Un accompagnement concret",
          content: `Mon intervention permet de :

- Structurer une démarche de prévention cohérente
- Clarifier les rôles et responsabilités de chacun
- Améliorer les conditions de travail
- Accompagner les managers dans leur rôle au quotidien

J'interviens également en appui des acteurs internes (direction, managers, CSE / CSSCT) afin de faciliter la mise en œuvre des actions.`
        },
        {
          h2: "Une approche adaptée à vos besoins",
          content: `Chaque accompagnement est construit en fonction de votre organisation et de vos enjeux. Il peut inclure :

- La compréhension de vos pratiques existantes
- L'identification des axes d'amélioration
- La mise en place d'actions concrètes
- Un suivi dans le temps

**Objectif :** installer une démarche de prévention durable, utile et adaptée à votre entreprise.`
        }
      ],
      faq: [],
      ctaEmployeur: "Structurer ma démarche de prévention",
      relatedLinks: [
        { href: "/services/prevention-risques", label: "Prévention des risques professionnels" },
        { href: "/services/duerp", label: "DUERP – Document Unique" }
      ]
    }
  }
};

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = SERVICES_DATA[params.slug as keyof typeof SERVICES_DATA];

  if (!service) {
    return {
      title: "Service non trouvé",
    };
  }

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({
    slug,
  }));
}

export default function ServicePage({ params }: Props) {
  const service = SERVICES_DATA[params.slug as keyof typeof SERVICES_DATA];

  if (!service) {
    notFound();
  }

  const { content } = service;

  return (
    <>
      <section className="page-hero">
        <div className="hero-grid-bg" />
        <div className="container-main relative z-10 pt-20 pb-12">
          <nav className="text-[0.72rem] tracking-[0.14em] uppercase text-white/30 mb-5 flex gap-2">
            <Link href="/" className="hover:text-white/60 transition-colors">
              Accueil
            </Link>
            <span>›</span>
            <Link href="/services" className="hover:text-white/60 transition-colors">
              Services
            </Link>
            <span>›</span>
            <span className="text-or-500">{service.h1}</span>
          </nav>
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] text-white leading-tight">
            {service.h1}
          </h1>
        </div>
      </section>

      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="max-w-[820px] mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-[1.1rem] text-encre-600 leading-relaxed mb-8">
                {content.intro}
              </p>

              {content.sections.map((section, idx) => (
                <div key={idx} className="mb-10">
                  <h2 className="font-serif text-[1.75rem] text-encre-800 mb-4 mt-12">
                    {section.h2}
                  </h2>
                  <div className="text-encre-600 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}

              {content.faq && content.faq.length > 0 && (
                <div className="mt-16 bg-white p-8 rounded-sm border border-or-500/10">
                  <h2 className="font-serif text-[1.75rem] text-encre-800 mb-6">
                    Foire Aux Questions (FAQ)
                  </h2>
                  <div className="space-y-6">
                    {content.faq.map((item, idx) => (
                      <div key={idx}>
                        <h3 className="font-semibold text-encre-800 mb-2">
                          {item.q}
                        </h3>
                        <p className="text-encre-600">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 p-8 bg-rouge-50 border-l-4 border-rouge-800 rounded-sm">
                <h3 className="font-serif text-xl text-encre-800 mb-4">
                  Besoin d'un accompagnement personnalisé ?
                </h3>
                <p className="text-encre-600 mb-6">
                  Chaque situation est unique. Prenons le temps d&apos;étudier votre dossier et de définir ensemble la meilleure approche.
                </p>
                <div className="flex flex-wrap gap-4">
                  {'ctaSalarie' in content && content.ctaSalarie && (
                    <Link
                      href="/contact"
                      className="btn btn-primary"
                    >
                      {content.ctaSalarie}
                    </Link>
                  )}
                  {'ctaEmployeur' in content && content.ctaEmployeur && (
                    <Link
                      href="/contact"
                      className="btn btn-ghost"
                    >
                      {content.ctaEmployeur}
                    </Link>
                  )}
                  {'cta' in content && content.cta && !('ctaSalarie' in content) && !('ctaEmployeur' in content) && (
                    <Link
                      href="/contact"
                      className="btn btn-primary"
                    >
                      {content.cta}
                    </Link>
                  )}
                </div>
              </div>

              {content.relatedLinks && content.relatedLinks.length > 0 && (
                <div className="mt-12 pt-8 border-t border-or-500/20">
                  <h3 className="font-serif text-lg text-encre-800 mb-4">
                    Pour aller plus loin
                  </h3>
                  <ul className="space-y-2">
                    {content.relatedLinks.map((link, idx) => (
                      <li key={idx}>
                        <Link
                          href={link.href}
                          className="text-rouge-800 hover:text-rouge-900 underline"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": service.h1,
            "provider": {
              "@type": "ProfessionalService",
              "name": SITE_CONFIG.name,
              "telephone": SITE_CONFIG.phone,
              "email": SITE_CONFIG.email,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "45 rue des Mines",
                "addressLocality": "Audincourt",
                "postalCode": "25400",
                "addressCountry": "FR"
              }
            },
            "areaServed": "FR",
            "description": service.description
          })
        }}
      />
    </>
  );
}
