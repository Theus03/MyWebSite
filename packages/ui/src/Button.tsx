import type { AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
}

const base =
  "inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[13px] font-medium no-underline transition-all duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-text text-bg hover:bg-[#333] hover:-translate-y-px",
  outline:
    "bg-transparent text-text border border-border-strong hover:bg-surface2 hover:-translate-y-px",
};

/** Botão/link reutilizado por Hero e Contact — mantém exatamente o visual do .btn original. */
export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
