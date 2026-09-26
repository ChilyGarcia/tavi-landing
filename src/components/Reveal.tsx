import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Delay in ms before the reveal transition starts. */
  delay?: number;
  /** Direction the element travels in from. */
  from?: "up" | "down" | "left" | "right" | "scale";
  /** Re-run the animation every time it enters the viewport. */
  repeat?: boolean;
  /**
   * Above-the-fold content: animate with CSS only (no JS / IntersectionObserver),
   * so the element is painted before hydration and doesn't delay LCP.
   */
  cssOnly?: boolean;
};

const CSS_ENTER: Record<NonNullable<RevealProps["from"]>, string> = {
  up: "slide-in-from-bottom-8",
  down: "slide-in-from-top-8",
  left: "slide-in-from-right-8",
  right: "slide-in-from-left-8",
  scale: "zoom-in-95",
};

const HIDDEN: Record<NonNullable<RevealProps["from"]>, string> = {
  up: "opacity-0 translate-y-8",
  down: "opacity-0 -translate-y-8",
  left: "opacity-0 translate-x-8",
  right: "opacity-0 -translate-x-8",
  scale: "opacity-0 scale-95",
};

/**
 * Reveals its children with a smooth transition when scrolled into view.
 * Respects `prefers-reduced-motion` and is SSR-safe (renders in the hidden
 * state on the server, matching the client's first paint to avoid hydration
 * mismatches).
 */
export function Reveal({
  children,
  className,
  style,
  delay = 0,
  from = "up",
  repeat = false,
  cssOnly = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || cssOnly) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (!repeat) observer.disconnect();
        } else if (repeat) {
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [repeat, cssOnly]);

  if (cssOnly) {
    return (
      <div
        style={{ ...style, animationDelay: `${delay}ms` }}
        className={cn(
          "animate-in fade-in fill-mode-both duration-700 ease-out motion-reduce:animate-none",
          CSS_ENTER[from],
          className,
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none",
        visible ? "opacity-100 translate-x-0 translate-y-0 scale-100" : HIDDEN[from],
        className,
      )}
    >
      {children}
    </div>
  );
}
