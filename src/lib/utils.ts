import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Affichage public des tarifs (wording uniforme sur le site). */
export function formatFromPrice(label: string): string {
  const trimmed = label.trim();
  if (/^à partir de/i.test(trimmed)) return trimmed;
  return `À partir de ${trimmed}`;
}
