import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const base =
  "inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[13px] font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-text text-bg hover:bg-[#333] hover:-translate-y-px",
  outline: "bg-transparent text-text border border-border-strong hover:bg-surface2 hover:-translate-y-px",
};

/**
 * Equivalente ao Button de @portfolio/ui, mas como <button> real: aquele é um
 * <a> (usado como link em Hero/Contact do site público) e não serve para
 * submit de formulário.
 */
export function SubmitButton({
  variant = "primary",
  className = "",
  type = "button",
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
