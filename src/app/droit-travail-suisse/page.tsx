import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Droit du travail suisse | Accompagnement rédactionnel — Loubna Abouz Manta",
  description:
    "Accompagnement dans la rédaction, reformulation et mise en forme de courriers professionnels liés au travail en Suisse, sans conseil juridique suisse.",
  openGraph: {
    title: "Droit du travail suisse — Accompagnement rédactionnel",
    description:
      "Accompagnement rédactionnel pour vos courriers liés au travail en Suisse.",
  },
};

const COURRIERS_EXEMPLES = [
  "demande d'explications à l'employeur",
  "réponse à un avertissement",
  "courrier RH",
  "demande de paiement de salaire",
  "demande de documents",
  "courrier lié à un arrêt maladie",
  "mise en demeure simple",
  "réponse écrite après une consultation juridique",
  "préparation d'un dossier avant rendez-vous avec un avocat ou un syndicat",
];

const ACCOMPAGNEMENT_ITEMS = [
  "rédiger vos courriers professionnels",
  "reformuler vos écrits de manière claire et structurée",
  "retranscrire par écrit des éléments déjà validés par un professionnel du droit suisse",
  "préparer des réponses à un employeur ou aux ressources humaines",
  "organiser vos idées et vos documents",
  "améliorer la présentation et la compréhension de vos écrits",
  "mettre en forme des demandes, réponses ou explications liées à votre situation professionnelle",
];

const POURQUOI_ITEMS = [
  "de trouver les bons mots",
  "de structurer ses idées",
  "de rédiger un courrier clair et professionnel",
  "ou de retranscrire correctement ce qui a été expliqué lors d'une consultation",
];

const TARIFS = [
  {
    title: "Reformulation ou courrier simple",
    price: "À partir de 99 €",
    features: [
      "la reformulation d'un texte existant",
      "la rédaction d'un courrier simple",
      "l'amélioration de la clarté et de la structure",
      "la mise en forme professionnelle de vos écrits",
    ],
  },
  {
    title: "Accompagnement rédactionnel approfondi",
    price: "À partir de 170 €",
    features: [
      "plusieurs échanges",
      "l'étude de plusieurs documents",
      "une chronologie des faits",
      "un travail rédactionnel plus développé",
      "ou un litige installé dans la durée",
    ],
  },
  {
    title: "Dossiers volumineux ou situations particulières",
    price: "Tarif sur demande",
    features: [
      "le volume du dossier",
      "le nombre de documents",
      "le temps de traitement nécessaire",
      "et la complexité de la situation exposée",
    ],
  },
];

export default function DroitTravailSuissePage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────── */}
      <section className="page-hero">
        <div className="hero-grid-bg" />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(139,0,0,.22) 0%, transparent 70%)" }}
        />
        <div className="container-main relative z-10 pt-20 pb-12">
          <nav className="text-[0.72rem] tracking-[0.14em] uppercase text-white/50 mb-5 flex gap-2">
            <Link href="/" className="hover:text-white/80 transition-colors">Accueil</Link>
            <span>›</span>
            <span className="text-or-500">Suisse</span>
          </nav>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-white leading-[1.12] max-w-3xl">
            Droit du travail suisse
          </h1>
          <p className="text-or-500 text-[1.05rem] md:text-[1.15rem] max-w-[600px] mt-4 leading-[1.8]">
            Accompagnement rédactionnel pour vos courriers liés au travail en Suisse
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/contact" className="btn btn-primary">
              Me contacter
            </Link>
            <Link href="#tarifs" className="btn btn-ghost-white">
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* ─── INTRODUCTION ───────────────────────────────── */}
      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="max-w-[760px] mx-auto">
            <p className="text-[1.05rem] md:text-[1.08rem] text-encre-700 leading-[1.85] whitespace-pre-line mb-10">
              {`Je vous accompagne dans la rédaction et la reformulation de vos courriers liés au travail en Suisse.

Vous avez déjà consulté un avocat, un syndicat, une assurance protection juridique, une permanence juridique ou un professionnel du droit suisse, mais vous avez besoin d'aide pour rédiger vos écrits de manière claire, structurée et compréhensible ?

Je vous accompagne dans la préparation, la reformulation et la mise en forme de vos courriers professionnels, sur la base :
• de vos explications ;
• de vos documents ;
• ou d'éléments déjà validés lors d'une consultation juridique en Suisse.`}
            </p>
          </div>
        </div>
      </section>

      {/* ─── MON ACCOMPAGNEMENT ────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-main">
          <div className="max-w-[800px] mx-auto">
            <span className="section-label">Ce que je propose</span>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-encre-800 mb-8">
              Mon accompagnement
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {ACCOMPAGNEMENT_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-5 bg-encre-50 border border-encre-100 rounded-sm"
                >
                  <span className="text-rouge-800 font-bold mt-0.5 flex-shrink-0">—</span>
                  <span className="text-[0.97rem] text-encre-700 leading-[1.7]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── EXEMPLES DE COURRIERS ─────────────────────── */}
      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="max-w-[800px] mx-auto">
            <span className="section-label">Types de documents</span>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-encre-800 mb-8">
              Exemples de courriers
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {COURRIERS_EXEMPLES.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-white border border-encre-100 rounded-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-or-500 flex-shrink-0" />
                  <span className="text-[0.92rem] text-encre-700 leading-[1.6]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── IMPORTANT ─────────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-main">
          <div className="max-w-[760px] mx-auto">
            <div className="p-8 md:p-10 border border-rouge-800/20 rounded-sm bg-rouge-50/40">
              <h3 className="font-serif text-[1.3rem] text-encre-800 mb-5 flex items-center gap-2">
                <span className="text-rouge-800">ℹ️</span>
                Important
              </h3>
              <div className="text-[0.97rem] text-encre-700 leading-[1.85] space-y-4 whitespace-pre-line">
                <p>Je n'exerce pas comme avocate en Suisse et je ne fournis aucun conseil juridique suisse.</p>
                <p>Mon rôle consiste exclusivement à vous accompagner dans la rédaction et la reformulation de vos écrits, à partir des éléments que vous me transmettez ou d'informations déjà validées par un professionnel compétent en Suisse.</p>
                <p>Pour toute analyse juridique, stratégie de défense ou représentation devant une autorité ou un tribunal, il convient de consulter un avocat, un juriste suisse ou une organisation compétente.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── POURQUOI CET ACCOMPAGNEMENT ───────────────── */}
      <section className="section-pad bg-encre-50">
        <div className="container-main">
          <div className="max-w-[760px] mx-auto">
            <span className="section-label">Pourquoi ?</span>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-encre-800 mb-6">
              Pourquoi cet accompagnement ?
            </h2>
            <p className="text-[1rem] text-encre-700 leading-[1.85] mb-6">
              Parce qu'il n'est pas toujours facile :
            </p>
            <ul className="space-y-3 mb-8">
              {POURQUOI_ITEMS.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[0.97rem] text-encre-700 leading-[1.7]">
                  <span className="text-rouge-800 font-bold mt-0.5 flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[1rem] text-encre-700 leading-[1.85]">
              Je vous aide à mettre vos demandes par écrit avec clarté, sérieux, discrétion et rigueur rédactionnelle.
            </p>
          </div>
        </div>
      </section>

      {/* ─── TARIFS ────────────────────────────────────── */}
      <section id="tarifs" className="section-pad bg-white">
        <div className="container-main">
          <div className="max-w-[900px] mx-auto">
            <span className="section-label">Investissement</span>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-encre-800 mb-10">
              Tarifs
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {TARIFS.map((tarif, i) => (
                <div
                  key={i}
                  className={`p-6 md:p-8 border rounded-sm flex flex-col ${
                    i === 1
                      ? "border-rouge-800/30 bg-rouge-50/30"
                      : "border-encre-100 bg-encre-50/50"
                  }`}
                >
                  <h3 className="font-serif text-[1.15rem] text-encre-800 mb-2 leading-[1.3]">
                    {tarif.title}
                  </h3>
                  <p className={`text-[1.3rem] font-semibold mb-5 ${i === 1 ? "text-rouge-800" : "text-encre-800"}`}>
                    {tarif.price}
                  </p>
                  <p className="text-[0.82rem] text-encre-600 mb-4 leading-[1.7]">
                    {i === 0
                      ? "Cette formule comprend notamment :"
                      : i === 1
                      ? "Pour les situations nécessitant :"
                      : "Un tarif adapté pourra être proposé selon :"}
                  </p>
                  <ul className="space-y-2.5 flex-1">
                    {tarif.features.map((f, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-[0.9rem] text-encre-700 leading-[1.6]"
                      >
                        <span className="text-or-500 mt-0.5 flex-shrink-0">•</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Note tarifs */}
            <div className="mt-10 p-6 bg-encre-50 border border-encre-100 rounded-sm">
              <h4 className="font-serif text-[1.05rem] text-encre-800 mb-3">Important</h4>
              <p className="text-[0.92rem] text-encre-700 leading-[1.8]">
                Chaque situation étant différente, un premier échange permet d'évaluer vos besoins et de vous orienter vers la formule la plus adaptée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────── */}
      <section className="section-pad bg-rouge-800">
        <div className="container-main text-center">
          <h2 className="font-serif text-[clamp(2rem,4vw,2.8rem)] text-white mb-4">
            Besoin d'aide pour rédiger vos courriers ?
          </h2>
          <p className="text-white/70 mb-9 max-w-md mx-auto leading-[1.75]">
            Décrivez-moi votre situation — je vous réponds personnellement sous 48 heures.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn btn-white">
              Me contacter
            </Link>
            <Link href="/faq" className="btn btn-ghost-white">
              Consulter la FAQ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
