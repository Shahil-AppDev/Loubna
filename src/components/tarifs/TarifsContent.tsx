"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

// IDs fixes correspondant aux services insérés en DB
const SERVICE_IDS = {
  atmp_entretien:             'a1000001-0000-0000-0000-000000000001',
  atmp_accompagnement:        'a1000001-0000-0000-0000-000000000002',
  harcelement_analyse:        'a1000001-0000-0000-0000-000000000003',
  disciplinaire_analyse:      'a1000001-0000-0000-0000-000000000004',
  employeur_analyse:          'a1000001-0000-0000-0000-000000000005',
  duerp_analyse:              'a1000001-0000-0000-0000-000000000006',
  harcelement_accompagnement: 'a1000001-0000-0000-0000-000000000007',
  disciplinaire_accompagnement:'a1000001-0000-0000-0000-000000000008',
  duerp_accompagnement:       'a1000001-0000-0000-0000-000000000009',
  employeur_accompagnement:   'a1000001-0000-0000-0000-000000000010',
} as const;

type ServiceKey = keyof typeof SERVICE_IDS;

type PriceItem = {
  title: string;
  description: string;
  price: string;
  priceNote?: string;
  featured?: boolean;
  serviceKey?: ServiceKey;
  contactLabel?: string;
  bullets?: string[];
};

type Section = {
  heading: string;
  icon: string;
  items: PriceItem[];
};

const SALARIES: Section[] = [
  {
    heading: "Accident du travail / Maladie professionnelle (AT/MP)",
    icon: "⚠️",
    items: [
      {
        title: "Entretien d'analyse AT/MP",
        description:
          "Analyse initiale de votre situation AT/MP : identification des difficultés liées au dossier, étude des premiers éléments médicaux et administratifs, compréhension de l'état d'avancement de la procédure et détermination des démarches adaptées.",
        price: "70 €",
        serviceKey: "atmp_entretien",
      },
      {
        title: "Analyse et accompagnement démarches AT/MP",
        description:
          "Accompagnement dans la préparation et la structuration du dossier : analyse des documents, étude des réserves employeur, aide à la préparation du questionnaire CPAM, analyse des éléments d'exposition (MP), clarification et structuration du dossier.",
        price: "120 €",
        featured: true,
        serviceKey: "atmp_accompagnement",
      },
    ],
  },
  {
    heading: "Harcèlement moral / sexuel & Risques psychosociaux",
    icon: "🔴",
    items: [
      {
        title: "Analyse de situation",
        description:
          "Échange permettant d'analyser votre situation professionnelle, d'identifier les difficultés rencontrées et de déterminer les actions ou orientations adaptées.",
        price: "59 €",
        serviceKey: "harcelement_analyse",
      },
      {
        title: "Analyse approfondie & accompagnement",
        description:
          "Accompagnement dans la structuration des éléments, l'analyse des échanges et la préparation des démarches liées à la situation rencontrée.",
        price: "À partir de 129 €",
        serviceKey: "harcelement_accompagnement",
        contactLabel: "Demander un devis",
      },
    ],
  },
  {
    heading: "Procédures disciplinaires",
    icon: "⚡",
    items: [
      {
        title: "Analyse de situation disciplinaire",
        description:
          "Analyse de la situation et compréhension de la procédure engagée par l'employeur : avertissement, mise à pied, convocation à entretien préalable.",
        price: "59 €",
        serviceKey: "disciplinaire_analyse",
      },
      {
        title: "Analyse et accompagnement procédure disciplinaire",
        description:
          "Accompagnement dans la préparation des éléments, des écrits et des démarches liés à la procédure disciplinaire.",
        price: "À partir de 130 €",
        bullets: [
          "Étude des documents transmis",
          "Analyse des éléments administratifs et procéduraux",
          "Identification des points de vigilance",
          "Retour synthétique et orientations adaptées à la situation",
        ],
        serviceKey: "disciplinaire_accompagnement",
        contactLabel: "Demander un devis",
      },
    ],
  },
];

const EMPLOYEURS: Section[] = [
  {
    heading: "Accompagnement des employeurs",
    icon: "🏢",
    items: [
      {
        title: "Analyse de situation",
        description:
          "Analyse des problématiques rencontrées en matière d'AT/MP, de procédure disciplinaire, de DUERP, de prévention des risques ou de gestion de situation sensible. Étude des documents, identification des points de vigilance, retour synthétique et orientations adaptées.",
        price: "199 €",
        featured: true,
        serviceKey: "employeur_analyse",
      },
      {
        title: "Accompagnement et interventions",
        description:
          "Toute intervention nécessitant un accompagnement approfondi, plusieurs échanges, une analyse complémentaire ou un suivi spécifique fera l'objet d'un devis personnalisé selon la complexité de la situation et le volume documentaire.",
        price: "Sur devis",
        bullets: [
          "Analyse de la situation",
          "Étude des documents transmis",
          "Identification des points de vigilance",
          "Réponse écrite synthétique et orientations adaptées à la situation",
        ],
        serviceKey: "employeur_accompagnement",
        contactLabel: "Demander un devis",
      },
    ],
  },
];

const DUERP: Section[] = [
  {
    heading: "DUERP & Prévention des risques professionnels",
    icon: "📋",
    items: [
      {
        title: "Analyse DUERP et mise à jour",
        description:
          "Analyse du Document Unique d'Évaluation des Risques Professionnels et identification des points nécessitant une mise à jour ou une clarification : analyse du document existant, identification des points de vigilance, vérification de la cohérence, analyse des risques mentionnés, recommandations.",
        price: "199 €",
        featured: true,
        serviceKey: "duerp_analyse",
      },
      {
        title: "Accompagnement DUERP et prévention des risques",
        description:
          "Toute intervention nécessitant une reprise complète du document, un accompagnement approfondi ou une analyse spécifique fera l'objet d'un devis personnalisé selon : l'activité, l'effectif, le nombre d'unités de travail et le niveau d'accompagnement nécessaire.",
        price: "Sur devis",
        serviceKey: "duerp_accompagnement",
        contactLabel: "Demander un devis",
      },
    ],
  },
];

const TABS = [
  { id: "salaries", label: "Salariés", sections: SALARIES },
  { id: "employeurs", label: "Employeurs", sections: EMPLOYEURS },
  { id: "duerp", label: "DUERP & Prévention", sections: DUERP },
] as const;

type TabId = (typeof TABS)[number]["id"];

function PricingCard({ item }: { item: PriceItem }) {
  // Les items avec contactLabel sont toujours sur devis → /contact
  const bookUrl = item.serviceKey && !item.contactLabel
    ? `/rendez-vous?service=${SERVICE_IDS[item.serviceKey]}`
    : null;

  return (
    <div
      className={cn(
        "relative bg-white rounded-sm border flex flex-col",
        item.featured
          ? "border-rouge-800 shadow-rouge-lg ring-1 ring-rouge-800/20"
          : "border-encre-200"
      )}
    >
      {item.featured && (
        <div className="absolute -top-3 left-6">
          <span className="bg-rouge-800 text-white text-[0.65rem] font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-full">
            Recommandé
          </span>
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        <h4 className="font-serif text-[1.05rem] text-encre-800 font-semibold mb-2">
          {item.title}
        </h4>
        <p className="text-[0.84rem] text-encre-500 leading-[1.72] mb-3">
          {item.description}
        </p>
        {item.bullets && (
          <ul className="flex-1 mb-5 space-y-1.5">
            {item.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-[0.82rem] text-encre-600">
                <span className="text-or-500 mt-0.5 flex-shrink-0">✔</span>
                {b}
              </li>
            ))}
          </ul>
        )}
        {!item.bullets && <div className="flex-1 mb-5" />}

        <div className="mt-auto">
          <div className="mb-4">
            <span className="font-serif text-[1.8rem] font-bold text-encre-800 leading-none">
              {item.price}
            </span>
            {item.priceNote && (
              <span className="text-[0.75rem] text-encre-400 ml-2">
                / {item.priceNote}
              </span>
            )}
          </div>

          {bookUrl ? (
            <Link
              href={bookUrl}
              className="btn btn-primary w-full text-center block text-[0.82rem] py-2.5"
            >
              Réserver cette prestation →
            </Link>
          ) : (
            <Link
              href="/contact"
              className="btn btn-ghost w-full text-center block text-[0.82rem] py-2.5"
            >
              {item.contactLabel ?? "Demander un devis"} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TarifsContent() {
  const [activeTab, setActiveTab] = useState<TabId>("salaries");

  const activeSections =
    TABS.find((t) => t.id === activeTab)?.sections ?? [];

  return (
    <>
      {/* ─── PAGE HERO ────────────────────────────────── */}
      <section className="page-hero">
        <div className="hero-grid-bg" />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,0,0,.22) 0%, transparent 70%)" }}
        />
        <div className="container-main relative z-10 pt-20 pb-12">
          <nav className="text-[0.72rem] tracking-[0.14em] uppercase text-white/30 mb-5 flex gap-2">
            <Link href="/" className="hover:text-white/60 transition-colors">
              Accueil
            </Link>
            <span>›</span>
            <span className="text-or-500">Tarifs</span>
          </nav>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-white leading-[1.12] max-w-2xl">
            Modalités et Tarifs
          </h1>
          <p className="text-white/50 text-[1rem] max-w-[520px] mt-5 leading-[1.8]">
            Des tarifs transparents pour des prestations d&apos;accompagnement,
            d&apos;information et de prévention en droit du travail — sans surprise.
          </p>
        </div>
      </section>

      {/* ─── INTRO ÉDITORIALE ─────────────────────────── */}
      <section className="bg-encre-50 border-b border-encre-200">
        <div className="container-main py-14">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-serif text-[clamp(1.15rem,2.2vw,1.45rem)] text-encre-800 leading-[1.65] mb-5">
              Beaucoup de dossiers accident du travail ou maladie professionnelle
              rencontrent des difficultés dès le départ.
            </p>
            <p className="text-[1rem] font-semibold text-rouge-800 mb-4">Pourquoi ?</p>
            <p className="text-[0.95rem] text-encre-600 leading-[1.85] max-w-xl mx-auto">
              Pas parce que la situation n&apos;est pas réelle, mais parce que certains
              éléments essentiels du dossier n&apos;ont pas été correctement préparés,
              expliqués ou structurés.
            </p>
          </div>
        </div>
      </section>

      {/* ─── INTRO STRIP ──────────────────────────────── */}
      <section className="bg-encre-950 border-b border-or-500/15">
        <div className="container-main py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "💳", label: "Paiement sécurisé", desc: "Par carte bancaire via SumUp (paiement 100% sécurisé)" },
              { icon: "📧", label: "Confirmation immédiate", desc: "Reçu par e-mail dès la commande validée" },
              { icon: "🔒", label: "Confidentialité garantie", desc: "Vos informations sont traitées avec la plus stricte discrétion" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-white text-[0.85rem] font-semibold">{item.label}</p>
                  <p className="text-white/50 text-[0.78rem] leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TABS + PRICING ───────────────────────────── */}
      <section className="section-pad bg-encre-50">
        <div className="container-main">

          {/* Tab nav */}
          <div className="flex flex-wrap gap-2 mb-12 border-b border-encre-200 pb-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-5 py-3 text-[0.85rem] font-semibold tracking-wide transition-colors rounded-t-sm -mb-px border-b-2",
                  activeTab === tab.id
                    ? "text-rouge-800 border-rouge-800 bg-white"
                    : "text-encre-500 border-transparent hover:text-encre-800 hover:border-encre-300"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Pricing sections */}
          <div className="space-y-14">
            {activeSections.map((section) => (
              <div key={section.heading}>
                <div className="flex items-center gap-3 mb-7">
                  <span className="text-2xl">{section.icon}</span>
                  <h3 className="font-serif text-[1.3rem] text-encre-800 font-semibold">
                    {section.heading}
                  </h3>
                </div>
                <div
                  className={cn(
                    "grid gap-6",
                    section.items.length === 2
                      ? "grid-cols-1 md:grid-cols-2 max-w-2xl"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  )}
                >
                  {section.items.map((item, i) => (
                    <PricingCard key={i} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Modalités */}
          <div className="mt-16 bg-encre-950 rounded-sm p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif text-white text-[1.1rem] font-semibold mb-4">
                Modalités de paiement
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Paiement en ligne sécurisé par carte bancaire (SumUp)",
                  "Facturation envoyée par e-mail après chaque prestation",
                  "Devis personnalisé sous 48h pour les prestations sur mesure",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-[0.84rem] text-encre-300">
                    <span className="text-or-500 mt-0.5 flex-shrink-0">✓</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-white text-[1.1rem] font-semibold mb-4">
                Déroulement des prestations
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Toutes les prestations se déroulent à distance (téléphone, visio)",
                  "Prise de rendez-vous après validation de votre paiement",
                  "Disponibilité : lun–jeu 10h–18h, ven 10h–12h30",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-[0.84rem] text-encre-300">
                    <span className="text-or-500 mt-0.5 flex-shrink-0">✓</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────── */}
      <section className="section-pad bg-rouge-800">
        <div className="container-main text-center">
          <h2 className="font-serif text-[clamp(2rem,4vw,2.8rem)] text-white mb-4">
            Une question avant de réserver ?
          </h2>
          <p className="text-white/70 mb-9 max-w-md mx-auto">
            Contactez-moi pour un premier échange et je vous orienterai vers la
            prestation la plus adaptée à votre situation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn btn-white">
              Me contacter
            </Link>
            <Link href="/services" className="btn btn-ghost-white">
              Voir les interventions
            </Link>
          </div>
        </div>
      </section>

      {/* ─── DISCLAIMER LÉGAL ─────────────────────────── */}
      <section className="bg-encre-950 border-t border-encre-800">
        <div className="container-main py-8">
          <div className="border-l-[3px] border-or-500/50 pl-5 max-w-3xl">
            <p className="text-[0.75rem] text-encre-400 leading-relaxed">
              <strong className="text-encre-200 font-semibold">
                Prestations d&apos;accompagnement, d&apos;information et de prévention — hors consultation juridique réglementée.
              </strong>{" "}
              Les prestations proposées relèvent de l&apos;information, de l&apos;accompagnement
              et de la prévention en droit du travail. Elles ne constituent pas une consultation
              juridique au sens de la réglementation applicable à la profession d&apos;avocat.
              Lorsqu&apos;une situation nécessite une représentation en justice ou une procédure
              judiciaire, une orientation vers un avocat compétent est proposée.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
