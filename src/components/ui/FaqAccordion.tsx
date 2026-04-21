"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((item, index) => (
        <div
          key={index}
          className={cn(
            "border rounded-sm transition-all duration-300",
            openIndex === index
              ? "border-rouge-800/30 bg-white shadow-rouge-sm"
              : "border-encre-100 bg-white hover:border-encre-200"
          )}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-start justify-between gap-4 p-6 text-left"
            aria-expanded={openIndex === index}
          >
            <span
              className={cn(
                "font-serif text-base font-medium leading-snug transition-colors duration-200",
                openIndex === index ? "text-rouge-800" : "text-encre-900"
              )}
            >
              {item.question}
            </span>
            <span
              className={cn(
                "flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300",
                openIndex === index
                  ? "bg-rouge-800 border-rouge-800 rotate-45"
                  : "border-encre-300"
              )}
            >
              <svg
                className={cn(
                  "w-3 h-3 transition-colors",
                  openIndex === index ? "text-white" : "text-encre-500"
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v14M5 12h14"
                />
              </svg>
            </span>
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-350 ease-in-out",
              openIndex === index ? "max-h-96" : "max-h-0"
            )}
          >
            <div className="px-6 pb-6">
              <div className="w-8 h-px bg-or-400 mb-4" />
              <p className="text-encre-600 text-sm leading-relaxed">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
