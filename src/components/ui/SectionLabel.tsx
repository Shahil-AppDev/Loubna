import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export default function SectionLabel({ children, className, light }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase mb-4",
        light ? "text-or-300" : "text-or-500",
        className
      )}
    >
      <span className={cn("w-8 h-px", light ? "bg-or-300" : "bg-or-500")} />
      {children}
    </div>
  );
}
