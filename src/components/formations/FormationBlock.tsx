import type { FormationData, FormationSection } from "@/content/client-formations-data";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  IconCalendar,
  IconClock,
  IconDocument,
  IconGraduation,
  IconLock,
  IconMonitor,
  IconSettings,
  IconShield,
  IconTag,
  IconTarget,
  IconUsers,
} from "./FormationIcons";

const HIGHLIGHT_ICONS = [IconTarget, IconSettings, IconShield] as const;

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 list-none pl-0">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[0.9375rem] leading-[1.75] text-encre-950">
          <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-or-500" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-or-500/10 text-or-600">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-or-600 mb-0.5">{label}</p>
        <p className="text-[0.9rem] leading-[1.65] text-encre-950">{value}</p>
      </div>
    </div>
  );
}

function SectionBlock({ section }: { section: FormationSection }) {
  const hasTitle = section.title.trim().length > 0;

  return (
    <div className="space-y-4">
      {hasTitle && (
        <h3 className="font-serif text-[1.15rem] md:text-[1.25rem] text-encre-950 leading-snug border-b border-encre-100 pb-3">
          {section.title}
        </h3>
      )}
      {section.paragraphs?.map((p, i) => (
        <p key={i} className="text-[0.9375rem] leading-[1.85] text-encre-950">
          {p}
        </p>
      ))}
      {section.items && section.items.length > 0 && <BulletList items={section.items} />}
    </div>
  );
}

export default function FormationBlock({ data, index }: { data: FormationData; index: number }) {
  const displayTitle = data.carteTitre ?? data.titre.replace(/^FORMATION –\s*/i, "");
  const contactHref = `/contact?formation=${encodeURIComponent(data.id)}`;
  const n = String(index).padStart(2, "0");

  return (
    <article
      id={data.id}
      className="scroll-mt-24 rounded-2xl border border-encre-200/80 bg-white shadow-[0_28px_56px_-24px_rgba(10,10,10,0.14)] overflow-hidden"
    >
      <div className="h-1 bg-gradient-to-r from-or-500 via-rouge-800 to-or-500" aria-hidden />

      {/* Carte produit — style maquette client */}
      <div className="border-b border-encre-100 bg-gradient-to-b from-encre-50/80 to-white px-6 py-10 md:px-10 md:py-12">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-or-500/15 text-or-600">
            <IconGraduation className="w-7 h-7" />
          </div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-or-600 mb-3">
            {data.label}
          </p>
          <h2 className="font-serif text-[1.35rem] md:text-[1.55rem] font-semibold text-encre-950 leading-snug mb-4">
            {displayTitle}
          </h2>
          {data.tagline && (
            <p className="text-[0.95rem] leading-[1.8] text-encre-950 mb-8">{data.tagline}</p>
          )}
          {!data.tagline && data.intro[0] && (
            <p className="text-[0.95rem] leading-[1.8] text-encre-950 mb-8">{data.intro[0]}</p>
          )}

          {data.productMeta && (
            <div className="w-full text-left space-y-5 mb-8">
              <MetaRow icon={IconMonitor} label="Format" value={data.productMeta.format} />
              <MetaRow icon={IconClock} label="Durée" value={data.productMeta.duree} />
              <MetaRow icon={IconUsers} label="Public concerné" value={data.productMeta.public} />
            </div>
          )}

          {data.productMeta?.tarif && (
            <div className="w-full rounded-xl border border-or-500/25 bg-or-500/[0.08] px-6 py-5 mb-8 flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-or-500/20 text-or-700">
                <IconTag />
              </div>
              <div className="text-left">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-or-700">
                  {data.productMeta.tarifLabel ?? "Tarif par participant"}
                </p>
                <p className="font-serif text-[1.35rem] font-semibold text-encre-950 mt-0.5">
                  {data.productMeta.tarif}
                </p>
              </div>
            </div>
          )}

          {data.highlights && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-10">
              {data.highlights.map((text, i) => {
                const Icon = HIGHLIGHT_ICONS[i] ?? IconTarget;
                return (
                  <div key={i} className="flex flex-col items-center gap-3 px-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-encre-950/5 text-or-600">
                      <Icon />
                    </div>
                    <p className="text-[0.8rem] leading-[1.55] text-encre-950 text-center">{text}</p>
                  </div>
                );
              })}
            </div>
          )}

          <div className="w-full pt-2 border-t border-encre-100">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-encre-950 mb-4 mt-6">
              Comment s&apos;inscrire ?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={contactHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-or-500 text-encre-950 text-xs font-bold uppercase tracking-widest rounded-sm border-2 border-or-500 hover:bg-or-400 hover:border-or-400 transition-colors"
              >
                <IconCalendar />
                S&apos;inscrire à la formation
              </Link>
              <Link
                href={`${contactHref}&devis=1`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-or-600 text-xs font-bold uppercase tracking-widest rounded-sm border-2 border-or-500 hover:bg-or-500/5 transition-colors"
              >
                <IconDocument />
                Demander un devis
              </Link>
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 text-[0.75rem] text-encre-950">
              <IconLock />
              Paiement sécurisé · Inscription en ligne
            </p>
          </div>
        </div>
      </div>

      {/* Contenu détaillé */}
      <div className="px-6 py-10 md:px-10 md:py-12 space-y-10">
        <div className="flex items-center gap-3 pb-6 border-b border-encre-100">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-encre-950 font-sans text-[0.65rem] font-bold tracking-widest text-or-400">
            {n}
          </span>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-encre-950 leading-snug">
            {data.titre}
          </p>
        </div>

        <div className="space-y-5">
          {(data.tagline ? data.intro : data.intro.slice(1)).map((p, i) => (
            <p key={i} className="text-[0.9375rem] leading-[1.85] text-encre-950">
              {p}
            </p>
          ))}
        </div>

        {data.sections.map((section, i) => (
          <SectionBlock key={i} section={section} />
        ))}

        {data.programme && (
          <div className="space-y-6">
            <h3 className="font-serif text-[1.15rem] md:text-[1.25rem] text-encre-950 leading-snug border-b border-encre-100 pb-3">
              {data.programme.title}
            </h3>
            <div className="space-y-5">
              {data.programme.modules.map((mod, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-encre-100 bg-encre-50/60 p-5 md:p-6"
                >
                  <h4 className="font-serif text-[1.02rem] font-semibold text-rouge-800 mb-4 flex gap-3">
                    <span className="text-or-500 font-sans text-[0.8rem] font-bold tracking-wider mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {mod.title.replace(/^\d+\.\s*/, "")}
                  </h4>
                  <BulletList items={mod.items} />
                </div>
              ))}
            </div>
          </div>
        )}

        {data.demarche && (
          <div className="rounded-xl border-l-[3px] border-l-or-500 bg-encre-50/80 px-5 py-5">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-or-600 mb-2">
              Ma démarche
            </p>
            <p className="text-[0.9375rem] leading-[1.85] text-encre-950">{data.demarche}</p>
          </div>
        )}

        <p className="text-[0.85rem] leading-[1.75] text-encre-950 border-t border-encre-100 pt-6 not-italic">
          {data.disclaimer}
        </p>
      </div>
    </article>
  );
}
