"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="divide-y divide-encre-100">
      {items.map((item, i) => (
        <div key={i} className="faq-item">
          <button
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
            className={cn(
              "w-full text-left py-6 flex items-center justify-between gap-6",
              "font-serif text-[1.08rem] font-semibold transition-colors duration-200",
              openIndex === i ? "text-rouge-800" : "text-encre-950 hover:text-rouge-800"
            )}
          >
            <span>{item.question}</span>
            <span
              className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full border border-rouge-800/25 flex items-center justify-center",
                "text-rouge-800 text-xl transition-all duration-250",
                openIndex === i
                  ? "bg-rouge-800 text-white border-rouge-800 rotate-45"
                  : "bg-transparent"
              )}
            >
              +
            </span>
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]",
              openIndex === i ? "max-h-[400px] pb-6" : "max-h-0"
            )}
          >
            <p className="text-[0.93rem] text-encre-600 leading-[1.85]">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
