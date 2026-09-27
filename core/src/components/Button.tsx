import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { injectCoreStyles } from '../styles/injectStyles';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className, ...rest }: ButtonProps) {
  injectCoreStyles();
  const classes = ['core-button', `core-button--${variant}`, className].filter(Boolean).join(' ');
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
