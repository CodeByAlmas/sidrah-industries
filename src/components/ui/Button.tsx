import Link from "next/link";
import { cn } from "@/lib/utils";

const Arrow = () => (
  <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

/** The label is stacked twice so it can roll over on hover while the fill sweeps up. */
function Inner({ label }: { label: string }) {
  return (
    <span className="pad">
      <span className="roll">
        <span>{label}</span>
        <span aria-hidden>{label}</span>
      </span>
      <Arrow />
    </span>
  );
}

type Variant = "line" | "ind";

export function ButtonLink({
  href,
  label,
  variant = "line",
  external,
  cursor = "Open",
  className,
}: {
  href: string;
  label: string;
  variant?: Variant;
  external?: boolean;
  /** One word shown inside the custom cursor while this button is hovered. */
  cursor?: string;
  className?: string;
}) {
  const cls = cn("btn", variant === "ind" ? "btn-ind" : "btn-line", className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} data-cursor={cursor}>
        <Inner label={label} />
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-cursor={cursor}>
      <Inner label={label} />
    </Link>
  );
}

/** Wraps a group of buttons so they go full width on very narrow screens. */
export function Actions({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("actions", className)}>{children}</div>;
}
