/**
 * Carte service réutilisable
 */

import Link from "next/link";

interface ServiceCardProps {
  service: {
    icon: string;
    title: string;
    description: string;
    slug: string;
    tags?: string[];
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.slug}`} className="service-card group block">
      <span className="text-2xl md:text-3xl mb-4 md:mb-5 block">{service.icon}</span>
      <h3 className="font-serif text-[1.1rem] md:text-[1.25rem] text-encre-800 mb-2 md:mb-3">
        {service.title}
      </h3>
      <p className="text-[0.85rem] md:text-[0.88rem] text-encre-700 leading-[1.6] md:leading-[1.7] mb-4 md:mb-5 whitespace-pre-line">
        {service.description}
      </p>
      {service.tags && service.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {service.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[0.65rem] font-bold tracking-[0.08em] uppercase px-2.5 py-1 bg-encre-50 text-encre-700 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <span className="text-[0.7rem] md:text-[0.75rem] font-bold tracking-[0.08em] uppercase text-rouge-800 group-hover:tracking-[0.12em] transition-all">
        En savoir plus →
      </span>
    </Link>
  );
}
