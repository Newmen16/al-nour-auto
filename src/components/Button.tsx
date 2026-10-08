import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const base =
  "inline-flex h-11 select-none items-center justify-center gap-2 rounded-[6px] px-5 text-sm font-semibold leading-none transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400";

const variants = {
  primary:
    "bg-gold-400 text-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] hover:bg-gold-300",
  ghost:
    "border border-zinc-700 bg-zinc-950/40 text-zinc-100 hover:border-zinc-500 hover:bg-zinc-900",
  quiet:
    "border border-zinc-700 bg-transparent text-zinc-300 hover:border-gold-600 hover:text-gold-300",
} as const;

type Variant = keyof typeof variants;

interface SharedProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}: SharedProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  children,
  className = "",
  ...rest
}: SharedProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
