interface FormationCardProps {
  index: number;
  title: string;
  children: string;
}

export default function FormationCard({ index, title, children }: FormationCardProps) {
  const n = String(index).padStart(2, "0");

  return (
    <article className="relative scroll-mt-8 rounded-xl border border-encre-200/70 bg-white shadow-[0_24px_48px_-20px_rgba(10,10,10,0.12)] transition-shadow duration-300 hover:shadow-[0_28px_56px_-20px_rgba(10,10,10,0.16)] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-or-500 via-rouge-800 to-or-500 opacity-90"
        aria-hidden
      />
      <header className="relative border-b border-encre-100 bg-gradient-to-br from-encre-950 via-[#121212] to-encre-950 px-6 py-8 md:px-10 md:py-9">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-[0.12]"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.9) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
          <span
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-or-500/35 bg-or-500/[0.12] font-sans text-[0.7rem] font-bold tabular-nums tracking-[0.2em] text-or-400 sm:h-14 sm:w-14 sm:text-[0.72rem]"
            aria-hidden
          >
            {n}
          </span>
          <h2 className="font-serif text-[1.05rem] font-semibold leading-snug text-white sm:text-[1.15rem] md:text-[1.28rem] whitespace-pre-line">
            {title}
          </h2>
        </div>
      </header>
      <div className="relative px-6 py-9 md:px-10 md:py-11">
        <div className="font-sans text-[0.9375rem] leading-[1.88] text-encre-950 md:text-[0.95rem] whitespace-pre-line text-pretty">
          {children}
        </div>
      </div>
    </article>
  );
}
