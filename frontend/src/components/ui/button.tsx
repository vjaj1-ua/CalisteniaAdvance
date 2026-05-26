import Link from "next/link";
import type { LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const baseButtonClass =
  "inline-flex min-h-12 items-center justify-center rounded-md px-5 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2";

const variants = {
  primary: "bg-primary text-white hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500",
  secondary:
    "border border-slate-300 bg-white text-ink hover:border-slate-400 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
};

type ButtonVariant = keyof typeof variants;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

type ButtonLinkProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
    variant?: ButtonVariant;
  };

export function Button({
  className = "",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseButtonClass} ${variants[variant]} ${className}`}
      type={type}
      {...props}
    />
  );
}

export function ButtonLink({
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${baseButtonClass} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
