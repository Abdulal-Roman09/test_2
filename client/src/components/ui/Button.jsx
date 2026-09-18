import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5",
  };

  const variantStyles = {
    primary: "bg-gold-500 hover:bg-gold-400 text-espresso-950 font-semibold shadow-md hover:shadow-glow-gold transition-all",
    secondary: "bg-espresso-850 hover:bg-espresso-800 text-cream-100 border border-espresso-700 hover:border-gold-500/40 shadow-sm",
    outline: "border border-gold-500/80 text-espresso-900 dark:text-cream-100 hover:bg-gold-500/10 active:bg-gold-500/20",
    ghost: "text-espresso-800 hover:text-gold-600 hover:bg-gold-500/10",
    dark: "bg-espresso-950 text-cream-100 border border-espresso-800 hover:bg-espresso-900 hover:border-gold-500/50"
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : Icon ? (
        <Icon className="w-4 h-4 text-current" />
      ) : null}
      <span>{children}</span>
    </button>
  );
}
