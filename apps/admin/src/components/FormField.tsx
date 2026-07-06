import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const fieldClasses =
  "rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm text-text outline-none focus-visible:border-accent";

type TextFieldProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ label, className = "", ...props }: TextFieldProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm text-text-muted">
      {label}
      <input className={`${fieldClasses} ${className}`} {...props} />
    </label>
  );
}

type TextAreaFieldProps = { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaField({ label, className = "", ...props }: TextAreaFieldProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm text-text-muted">
      {label}
      <textarea rows={3} className={`${fieldClasses} ${className}`} {...props} />
    </label>
  );
}

type SelectFieldProps = { label: string; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({ label, className = "", children, ...props }: SelectFieldProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm text-text-muted">
      {label}
      <select className={`${fieldClasses} ${className}`} {...props}>
        {children}
      </select>
    </label>
  );
}
