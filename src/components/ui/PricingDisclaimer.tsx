import { cn } from "@/lib/utils";

interface PricingDisclaimerProps {
  variant?: "light" | "dark";
  className?: string;
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-5 w-5 shrink-0", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  );
}

export default function PricingDisclaimer({
  variant = "light",
  className,
}: PricingDisclaimerProps) {
  const isDark = variant === "dark";

  return (
    <aside
      role="note"
      className={cn(
        "rounded-sm border p-6 md:p-7",
        isDark
          ? "border-rouge-800/35 bg-encre-900"
          : "border-rouge-800/25 bg-[#F8F6F2]",
        className
      )}
    >
      <div className="flex gap-4">
        <div
          className={cn(
            "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
            isDark ? "bg-rouge-800/20 text-or-400" : "bg-rouge-800/10 text-rouge-800"
          )}
        >
          <AlertIcon />
        </div>
        <div className="min-w-0 space-y-3">
          <h4
            className={cn(
              "font-serif text-[1.05rem] font-semibold leading-snug",
              isDark ? "text-encre-100" : "text-encre-900"
            )}
          >
            Important
          </h4>
          <div
            className={cn(
              "space-y-2.5 text-[0.9rem] leading-[1.8]",
              isDark ? "text-encre-200" : "text-encre-800"
            )}
          >
            <p>
              Le tarif peut varier selon la complexité du dossier, le volume des documents
              transmis et le temps d&apos;analyse nécessaire.
            </p>
            <p>
              Après réception de vos éléments, un complément pourra être proposé pour les
              dossiers nécessitant une étude approfondie.
            </p>
            <p>
              Celui-ci sera toujours validé avec vous avant toute analyse complémentaire.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
