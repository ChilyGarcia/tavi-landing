import { cn } from "@/lib/utils";

/**
 * TAVI brand mark: a pedestal bistro table topped with a plate that reads as a
 * "T" — a nod to "table" (mesa) and to order management around the table.
 */
export function TaviMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      {/* Tabletop */}
      <path
        d="M3.5 7.1c0-1.06 3.81-1.92 8.5-1.92s8.5.86 8.5 1.92-3.81 1.92-8.5 1.92S3.5 8.16 3.5 7.1Z"
        fill="currentColor"
      />
      {/* Plate ring */}
      <ellipse cx="12" cy="6.8" rx="4.1" ry="0.95" stroke="var(--primary)" strokeWidth="1" />
      {/* Pedestal stem */}
      <path
        d="M10.55 9.3h2.9c-.28 2.62-.28 4.83.16 7.02h-3.22c.44-2.19.44-4.4.16-7.02Z"
        fill="currentColor"
      />
      {/* Base */}
      <ellipse cx="12" cy="17.6" rx="3.6" ry="1.05" fill="currentColor" />
    </svg>
  );
}

type TaviLogoProps = {
  withWordmark?: boolean;
  className?: string;
  badgeClassName?: string;
  markClassName?: string;
  wordmarkClassName?: string;
};

export function TaviLogo({
  withWordmark = true,
  className,
  badgeClassName,
  markClassName,
  wordmarkClassName,
}: TaviLogoProps) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid h-10 w-10 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-warm)]",
          badgeClassName,
        )}
        style={{ background: "var(--gradient-hero)" }}
      >
        <TaviMark className={cn("h-6 w-6", markClassName)} />
      </span>
      {withWordmark && (
        <span
          className={cn(
            "font-sans text-[1.6rem] font-bold uppercase leading-none tracking-[0.18em]",
            wordmarkClassName,
          )}
        >
          TAV<span className="text-primary">I</span>
        </span>
      )}
    </span>
  );
}
